from django.db import models
from apps.user.models import User, User_kind_code
from apps.alcohol.models import Alcohol
# Create your models here.

class Alcohol_like(models.Model):
    user_no = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_no')
    alcohol_no = models.ForeignKey(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    is_like = models.BooleanField(default=False)
    reg_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'alcohol_like'
        

class User_group_figure(models.Model):
    user_kind = models.OneToOneField(User_kind_code, primary_key=True, on_delete=models.CASCADE, db_column='user_kind_code')
    alcohol_type_figure = models.JSONField(default=dict)
    alcohol_taste_figure = models.JSONField(default=dict)

    class Meta:
        db_table = 'user_group_figure'
        

class User_alcohol(models.Model):
    user_no = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_no')
    alcohol_no = models.ForeignKey(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    score = models.SmallIntegerField( )

    class Meta:
        db_table = 'user_alcohol'