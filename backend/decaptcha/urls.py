"""decaptcha URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from decaptcha import views
from rest_framework import routers

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'verify/$', views.VerifyKeys.as_view(), name='verify_keys'),
    url(r'upload/$', views.ImageCreateView.as_view(), name='upload_image'),
    url(r'image/$', views.ImageRetrievalView.as_view(), name='get_image'),
    url(r'label/$', views.ImageLabelView.as_view(), name='label_image'),
    url(r'flag/(?P<pk>[\w]+)/$', views.FlagImageView.as_view(), name='flag_image'),
]
