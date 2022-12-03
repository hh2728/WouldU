from email.policy import default
from django.db import models

from apps.user.models import User, User_kind_code
from apps.alcohol.models import Alcohol


class Ranking(models.Model):
    # alcohol_no = models.IntegerField(primary_key=True)
    alcohol_no = models.OneToOneField(Alcohol, on_delete=models.CASCADE, primary_key=True, db_column='alcohol_no')
    ranking = models.IntegerField(null=False)

    class Meta:
        db_table = 'ranking'


class Review(models.Model):
    review_no = models.AutoField(primary_key=True)
    user_no = models.IntegerField(null=False, default=0)
    # user_no = models.ForeignKey(User, on_delete=models.CASCADE)
    alcohol_no = models.IntegerField(null=False, default=0)
    # alcohol_no = models.ForeignKey(Alcohol, on_delete=models.CASCADE, db_column='alcohol_no')
    score = models.IntegerField(null=False, default=0)
    comment = models.CharField(max_length=150, null=False, default='')
    sweet = models.IntegerField(null=False, default=0)
    sour = models.IntegerField(null=False, default=0)
    scent = models.IntegerField(null=False, default=0)
    body = models.IntegerField(null=False, default=0)
    reg_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'review'



