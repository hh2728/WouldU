from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.db import connection

from apps.wouldU.models import Review


##### SEARCH
##### search API

# search part
# searchAlcoholAPI
# input : name (검색어), sort (정렬방식), page(이동하려는 페이지 처음엔 1), alcol-type(술종류 , 배열)
@api_view(['GET'])
@permission_classes([AllowAny])
def searchAlcoholAPI(request):
    #request header
    user_no = request.META.get('HTTP_USER_NO') 
    # user_no = 1

    # request param
    name = request.GET.get('name', '') 
    sort = int(request.GET.get('sort', 1)) 
    page = int(request.GET.get('page', 0))
    # row_index = int(request.GET.get('row_index', 0))
    alcol_type = request.GET.get('alcol_type', '')

    # sort 
    # 1 : alcohol no
    # 2 : alcohol name
    # 3 : like
    sorting = ['', 'a.alcohol_no', 'a.alcohol_name', 'a.like_count DESC']

    # page당 15개의 item
    start_index = (page-1) * 15
    
    # 깔끔하게 처리하고 싶은데.... 나중에 찾아보겠음
    alcohol_type = ''
    if len(alcol_type) != 0:
      alcohol_type += 'AND a.alcohol_code in ('
      list = alcol_type.split(',')
      for idx, val in enumerate(list):
        alcohol_type += "'" + val + "'" + ('' if idx == len(list) -1 else ', ')
      alcohol_type += ')'
    
    print(alcohol_type)
    cursor = connection.cursor()
    # total row count
    cursor.execute(f"""SELECT count(*)
                         FROM alcohol a
                        WHERE 1=1
                          {alcohol_type}
                          AND a.alcohol_name like '%%{name}%%'
                          """)
    row_num = cursor.fetchone()
    print(row_num[0])

    cursor.execute(f"""SELECT row_number() OVER (ORDER BY {sorting[sort]}) as row_index
                            , a.alcohol_no
                            , a.alcohol_name
                            , CONCAT('https://a402o1a4.s3.ap-northeast-2.amazonaws.com/', a.alcohol_no, '.png') as alcohol_image
                            , a.brewery
                            , replace(a.size, "|", ", ") size
                            , a.abv
                            , {row_num[0]} as total_count
                         FROM alcohol a
                        WHERE 1=1
                          {alcohol_type}
                          AND a.alcohol_name like '%%{name}%%'
                        ORDER BY {sorting[sort]} 
                        LIMIT {start_index}, 15""")
                        # LIMIT {page}, 16""")
                  # , (alcohol_type, name, sorting[sort], page))  
    # print(name, alcol_type, sorting[sort], start_index)
    
    results = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) \
                for row in cursor.fetchall()]

    # print(results)
    return Response(results)