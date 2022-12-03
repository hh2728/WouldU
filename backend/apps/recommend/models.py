from django.db import models
from apps.alcohol.models import Alcohol
from apps.user.models import User

# Create your models here.


# 주류 추천 정보
# class Recommend_IBCF(models.Model):
#     alcohol_no = models.OneToOneField(Alcohol, on_delete = models.CASCADE, db_column = 'alcohol_no', primary_key=True)
#     similar = models.CharField(max_length=150) #유사한 술 id 10개의 배열을 문자열로 저장
#     class Meta :
#         db_table = 'recommend_ibcf'

class Recommend_MF(models.Model):
    user_no = models.OneToOneField(User, on_delete = models.CASCADE, db_column = 'user_no', primary_key=True)
    similar = models.CharField(max_length=150) #유사한 술 id 10개의 배열을 문자열로 저장
    class Meta :
        db_table = 'recommend_mf'