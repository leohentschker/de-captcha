from decaptcha.serializers import ImageSerializer
from rest_framework.response import Response
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import enchant

from decaptcha.models import Image

ENGLISH_DICT = enchant.Dict("en_US")

class ImageRetrievalView(generics.RetrieveAPIView):
    """
    Expose image retreival
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.order_by('?')

    def get_object(self):
        numCorrect = self.request.query_params.get("numCorrect")

        # only start showing new images after
        # the user has proven they are answering
        # correctly
        if int(numCorrect) <= 3:
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
        image_object = request.data.pop('image')[0]

        image = Image.from_image_file(image_object)

        serializer = self.serializer_class(image)
        return Response(serializer.data)


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

        # store the new label we are marking
        previous_similar = image.labels.get(cleaned_label, 0)
        image.labels[cleaned_label] = previous_similar + 1
        image.save()

        return JsonResponse({"valid": image.is_valid_label(cleaned_label)})