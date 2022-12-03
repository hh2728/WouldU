from doctest import master
from email.policy import default
from django.db import models

# Create your models here.

#주류 종류 (과실주 :A1) (증류주 :A2) (약주, 청주 :A3) (리큐르/기타주류 :A4) (탁주 :A5)
class Alcohol_code(models.Model):
    alcohol_code = models.CharField(max_length=3, primary_key=True)
    alcohol_type = models.CharField(max_length=30)
    class Meta :
        db_table = 'alcohol_code'

class Region_code(models.Model):
    region_code = models.CharField(max_length=5, primary_key=True)
    region_name = models.CharField(max_length=10)
    class Meta :
        db_table = 'region_code'


# 주류 기본 정보 
class Alcohol(models.Model):
    alcohol_no = models.AutoField(primary_key=True)
    alcohol_name=models.CharField(max_length=50)
    # alco_img= models.CharField(max_length=100, null=True)
    alcohol_code=models.ForeignKey(Alcohol_code, on_delete=models.CASCADE, db_column='alcohol_code', default='A1') #주종 (과실주, 증류주)
    abv =models.FloatField() #도수
    region_code=models.ForeignKey(Region_code, on_delete=models.CASCADE, db_column='region_code')
    material= models.CharField(max_length=100)
    detail = models.TextField()
    brewery = models.CharField(max_length=100, null=True)
    award= models.CharField(max_length=500, null=True)
    like_count = models.IntegerField(default=0)
    food = models.CharField(max_length=500, null= True)
    tag = models.CharField(max_length=50, null=True)
    size = models.CharField(max_length=20, null=True)
    class Meta :
        db_table = 'alcohol'


# 주류 추천 정보     
class Alcohol_recommend(models.Model):
    alcohol_no = models.OneToOneField(Alcohol, on_delete = models.CASCADE, db_column = 'alcohol_no', primary_key=True)
    sweet = models.IntegerField() #단맛
    sour = models.IntegerField() #신맛
    scent = models.IntegerField() #향
    body = models.IntegerField() #바디감
    abv_level= models.IntegerField() #도수 ( 1~7 )
    score = models.IntegerField(default=0)
    count = models.IntegerField(default=0) 
    class Meta :
        db_table = 'alcohol_recommend'

class Alcohol_score1(models.Model):
    alcohol_no = models.OneToOneField(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    total_score= models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    class Meta :
        db_table = 'alcohol_score1'

class Alcohol_score2(models.Model):
    alcohol_no = models.OneToOneField(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    total_score= models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    class Meta :
        db_table = 'alcohol_score2'

class Alcohol_score3(models.Model):
    alcohol_no = models.OneToOneField(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    total_score= models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    class Meta :
        db_table = 'alcohol_score3'

class Alcohol_score4(models.Model):
    alcohol_no = models.OneToOneField(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    total_score= models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    class Meta :
        db_table = 'alcohol_score4'
    