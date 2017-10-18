from decaptcha.models import Image
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        print (validated_data, "THE VAL DATA BIH")

    class Meta:
        model = Image
        fields = ('multihash',)
