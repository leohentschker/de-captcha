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

    def is_valid_label(self, label):
        """
        Takes a label and determines whether
        or not we consider it to be valid
        """
        return (self.labels[label] / float(self.numResponses) > .2)
