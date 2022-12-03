from django.urls import path
from .views import signup, signin, checkid

urlpatterns=[
    path('signup', signup),
    path('signin', signin),
    path('checkid/<id>', checkid)
]