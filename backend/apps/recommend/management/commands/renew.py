from django.core.management.base import BaseCommand
from apps.recommend.views import mf_renew


class Command(BaseCommand):
    help = 'Renew Recommend Data by Matrix Factorization & SGD'

    def handle(self, *args, **options):
        print("START : Renew Recommend Data by Matrix Factorization & SGD")
        mf_renew()
        print("DONE")