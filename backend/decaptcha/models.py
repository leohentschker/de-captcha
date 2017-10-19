from django.contrib.postgres.fields import JSONField
from django.db import models
import tempfile
import ipfsapi
import shutil


class ValidationKey(models.Model):
    """
    Store server side keys
    """
    KEYS_REQUIRED = 3

    identifier = models.CharField(primary_key=True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def validate_decaptcha(cls, keys):
        """
        Validates that the keys submitted to the
        server are valid
        """
        # grab the associated keys
        keys = ValidationKey.objects.filter(identifier__in=keys)

        # fail if we have too few keys
        if keys.count() != KEYS_REQUIRED:
            return False

        # delete the keys and mark that they were valid
        keys.delete()
        return True

class Image(models.Model):
    """
    Server side store for all the images uploaded
    with the service
    """
    multihash = models.CharField(max_length=1000, primary_key=True)
    num_responses = models.IntegerField(default=0, db_index=True)
    flagged = models.BooleanField(default=False, db_index=True)
    labels = JSONField(default=dict)

    def save(self, *args, **kwargs):
        """
        Overwrite the default save method
        to auto-set the number of responses
        """
        if self.labels:
            self.num_responses = sum([weight for label, weight in self.labels.items()])

        return super(Image, self).save(*args, **kwargs)

    def is_valid_label(self, label):
        """
        Takes a label and determines whether
        or not we consider it to be valid
        """
        return self.labels[label] > 0

    @classmethod
    def from_image_file(cls, image_object):
        """
        Takes in an image file, stores it locally,
        adds it to IPFS and then returns a corresponding
        database object
        """

        # move the object to a temporary directory
        _, tempfile_path = tempfile.mkstemp()
        shutil.copyfileobj(image_object, open(tempfile_path, 'wb'))

        # upload the file to IPFS
        client = ipfsapi.connect('127.0.0.1', 5001)
        result = client.add(tempfile_path)

        # add the image to our database
        image, created = Image.objects.get_or_create(multihash=result['Hash'])
        return image