from decaptcha.serializers import ImageSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from decaptcha.models import Image

class ImageRetrievalView(generics.RetrieveAPIView):
    """
    Expose image retreival
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.order_by('?')

    def get_object(self):
        return self.get_queryset().first()


class ImageLabelView(generics.UpdateAPIView):
	"""
	Expose label updating on the individual
	images
	"""
	serializer_class = ImageSerializer

	def get_object(self):
		multihash = self.request.data.get('multihash')
		return get_object_or_404(Image, pk=multihash)

	def is_valid_label(self, image, label):
		"""
		Takes a label and determines whether
		or not we consider it to be valid
		"""
		return (image.labels[label] / float(image.numResponses) > .2)

	def update(self, request, *args, **kwargs):
		label = request.data.get('label')
		cleaned_label = label.lower().strip()

		# retrieve the object
		image = self.get_object()

		# store the new label we are marking
		previous_similar = image.labels.get(cleaned_label, 0)
		image.labels[cleaned_label] = previous_similar + 1
		image.numResponses += 1
		image.save()

		return JsonResponse({"valid": self.is_valid_label(image, cleaned_label)})