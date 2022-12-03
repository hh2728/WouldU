from django.urls import path
from .views import searchAlcoholAPI


    # url('post', PostViewSet.as_view({'get':'list', 'post':'create'})),
    # url('comment', CommentViewSet.as_view({'get':'list', 'post':'create'})),
urlpatterns=[
   
    # 검색
    path('', searchAlcoholAPI),
    # path('review-ranking', RecentReviewAPI),
]