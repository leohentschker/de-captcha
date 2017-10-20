from decaptcha.serializers import ImageSerializer
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from rest_framework.views import APIView
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, Http404, HttpResponseBadRequest
import enchant

from decaptcha.models import Image, ValidationKey

ENGLISH_DICT = enchant.Dict("en_US")


class VerifyKeys(APIView):

    def post(self, request, format=None):
        """
        Ensure that a collection of keys are valid
        """
        try:
            decaptcha_keys = request.data.get('credentials').split(':')
            assert(ValidationKey.validate_decaptcha(decaptcha_keys))
        except:
            return HttpResponseBadRequest("Invalid CAPTCHA")


class ImageRetrievalView(generics.RetrieveAPIView):
    """
    Expose image retreival
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.filter(flagged=False).order_by('?')

    def get_object(self):
        num_correct_str = self.request.query_params.get("numCorrect")

        try:
            num_correct = int(num_correct_str)
        except:
            raise Http404

        # only start showing new images after
        # the user has proven they are answering
        # correctly
        if int(num_correct) <= 3:
            return self.get_queryset().filter(num_responses__gt=20).first()

        return self.get_queryset().first()


class ImageCreateView(generics.CreateAPIView):
    """
    Upload a file to create an image
    """
    serializer_class = ImageSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Extracts the file object from a request,
        adds the file to IPFS and creates the
        database object
        """
        credentials = request.data.get('credentials')

        # check that the captcha keys we submit are
        # valid
        try:
            decaptcha_keys = credentials.split(':')
            assert(ValidationKey.validate_decaptcha(decaptcha_keys))
        except:
            return HttpResponseBadRequest("Invalid CAPTCHA")

        # upload the image
        image_object = request.data.pop('image')[0]

        image = Image.from_image_file(image_object)

        serializer = self.serializer_class(image)
        return Response(serializer.data)


class FlagImageView(generics.UpdateAPIView):
    """
    Expose label updating on the individual
    images
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def update(self, request, *args, **kwargs):
        """
        Create a mechanism through which users can
        flag particular images as inappropriate
        """
        # retrieve the object
        image = self.get_object()

        # mark the image as flagged
        image.flagged = True
        image.save()

        return JsonResponse({"flagged": True})

class ImageLabelView(generics.UpdateAPIView):
    """
    Expose label updating on the individual
    images
    """
    serializer_class = ImageSerializer

    def get_object(self):
        multihash = self.request.data.get('multihash')

        return get_object_or_404(Image, pk=multihash)

    def update(self, request, *args, **kwargs):
        label = request.data.get('label')
        cleaned_label = label.lower().strip()
        # make sure the user submitted an actual word
        if not cleaned_label or not ENGLISH_DICT.check(cleaned_label):
            return JsonResponse({"valid": False})

        # retrieve the object
        image = self.get_object()
        print (image.labels, "THE PREV LA")
        # store the new label we are marking
        previous_similar = image.labels.get(cleaned_label, 0)
        image.labels[cleaned_label] = previous_similar + 1
        image.save()

        # create a validation key for the correct labeling
        key, _ = ValidationKey.objects.get_or_create(identifier=get_random_string(length=100))

        return JsonResponse({
            "valid": image.is_valid_label(cleaned_label),
            "key": key.identifier,
        })
