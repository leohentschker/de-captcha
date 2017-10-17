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

	def is_valid_label(self, label):
		"""
		Takes a label and determines whether
		or not we consider it to be valid
		"""
		return (self.labels[label] / float(self.numResponses) > .2)

	def update(self, request, *args, **kwargs):
		label = request.data.get('label')

		# retrieve the object
		image = self.get_object()

		# store the new label we are marking
		previous_similar = image.labels.get(label, 0)
		image.labels[label] = previous_similar + 1
		image.numResponses += 1
		image.save()

		return JsonResponse({"valid": self.is_valid_label(label)})