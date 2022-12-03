from django.urls import path
from .views import RankingAPI, RecentReviewAPI


    # url('post', PostViewSet.as_view({'get':'list', 'post':'create'})),
    # url('comment', CommentViewSet.as_view({'get':'list', 'post':'create'})),
urlpatterns=[
   
    # 메인
    path('like-ranking', RankingAPI),
    path('review-ranking', RecentReviewAPI),
]