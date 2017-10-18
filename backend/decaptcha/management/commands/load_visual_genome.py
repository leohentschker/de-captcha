from django.core.management.base import BaseCommand
from io import BytesIO
import pandas
import requests
import json
import os

from decaptcha.models import Image

class Command(BaseCommand):

    OBJECT_JSON = '/Users/leohentschker/de-captcha/backend/data/objects_test.json'
    METADATA_JSON = '/Users/leohentschker/de-captcha/backend/data/metadata_test.json'

    NUM_TO_LOAD = 1
    DEFAULT_LABEL_WEIGHT = 5

    def load_image(self, object_data, metadata):
        # extract the labels associated with
        # the object
        labels = []
        for obj in object_data['objects']:
            labels += obj['names']
        
        # download the image file associated with it
        req = requests.get(metadata['url'])
        img_file = BytesIO(req.content)
        img = Image.from_image_file(img_file)

        # assign a default weight each of the labels from visual
        # genome
        img.labels = {label: self.DEFAULT_LABEL_WEIGHT for label in labels}
        img.save()

    def handle(self, *args, **options):
        """
        Watch the log files and
        """
        objects_list = json.load(open(self.OBJECT_JSON))
        medatada_list = json.load(open(self.METADATA_JSON))

        for i in range(self.NUM_TO_LOAD):
            self.load_image(objects_list[i], medatada_list[i])