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