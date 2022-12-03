from django.urls import path
from .views import get_recom_user, get_recom_once, write_record, get_record

urlpatterns = [
    path('user/<int:user_no>', get_recom_user),
    path('once', get_recom_once),
    path('record', get_record),
    path('record/update', write_record)
]