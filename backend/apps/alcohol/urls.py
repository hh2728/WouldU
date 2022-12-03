from django.urls import path
from .views import alcoDetails, alcoIsLike , alcoPostReview, RankByUserKind, alcoReviewAPI, similarAlcoholAPI

urlpatterns = [
    path('detail', alcoDetails),
    path('like', alcoIsLike),
    path('review', alcoPostReview),
    
    path('review/<alcohol_no>', alcoReviewAPI),
    path('similar-alcohol/<int:alcohol_no>', similarAlcoholAPI),
    path('rank-type/<user_no>', RankByUserKind)
]