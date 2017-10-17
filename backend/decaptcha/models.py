from django.contrib.postgres.fields import JSONField
from django.db import models


class Image(models.Model):
    """
    Server side store for all the images uploaded
    with the service
    """
    multihash = models.CharField(max_length=1000, primary_key=True)
    labels = JSONField(default=dict)
    labeled = models.BooleanField(default=False)
    numResponses = models.IntegerField(default=0)