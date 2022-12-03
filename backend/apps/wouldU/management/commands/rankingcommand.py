from django.core.management.base import BaseCommand
from apps.wouldU.serializers import RankSerializer
from apps.wouldU.models import Rank, Alcohol


class RankingCommand(BaseCommand):
    help = 'Batch Job : like ranking (00:00)' 

    def handle(self, *args, **options):
        r = Rank.objects.all()
        r.delete()
        
        alco = Alcohol.objects.all().order_by('-like_count')[:10]  # descending 
        serializer = RankSerializer(data = alco, partial=True)  # data 저렇게 넘겨도 되는지 확인 필

        if serializer.is_valid():
            # print(serializer)
            serializer.save()
            
        # r = Rank(alco.alcohol_no, rank)
        # r.save()

