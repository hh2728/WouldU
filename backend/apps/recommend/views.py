import decimal

import numpy as np
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
import pandas as pd
import ast
import json
import time

from .functions.sgd_recomm_func import MF
from .functions.item_cf_recomm_func import ItemCF

from django.db import connection


# Create your views here.
# Batch에서 사용할 함수 / 전체 추천 데이터 새로고침 - MF + SGD 사용
def mf_renew():
    cursor = connection.cursor()
    cursor.execute('''SELECT user_no, alcohol_no, score
                           FROM user_alcohol''')
    result = cursor.fetchall()
    cursor.close()

    # # DB에 데이터를 안 넣은 상태라 csv 사용
    # ratings = pd.read_csv('./recommend/functions/data/review.csv')
    # ratings = ratings[['user_no', 'alcohol_no', 'rating']]
    # result = ratings.pivot_table('rating', index='user_no', columns='alcohol_no')

    mf = MF()
    # MF 수행 및 추천 결과 배열 반환
    mf.run(result)

    print("MF DONE")


# 유저 1명에 대해서 추천 결과 가져오기
@api_view(['GET'])
@permission_classes([AllowAny])
def get_recom_user(request, user_no):
    # IBCF, MF의 결과를 각각 불러와서 id를 겹치지 않게 반환하는 것이 목표
    recommend_res = []

    # 0 과거 주류데이터 가져오기
    cursor = connection.cursor()
    cursor.execute('''SELECT user_no, alcohol_no, score
                           FROM user_alcohol''')
    review_data = cursor.fetchall()
    # DB에 데이터를 안 넣은 상태라 csv 사용
    # ratings = pd.read_csv('./recommend/functions/data/review.csv')
    # ratings = ratings[['user_no', 'alcohol_no', 'rating']]
    # review_data = ratings.pivot_table('rating', index='alcohol_no', columns='user_no')
    # review_data.fillna(0, inplace=True)

    # 1 과거 주류에서 user_no에 해당하는 유저가 이미 마신 술을 다 가져옴 - pandas로 과거 주류데이터 가져온거 걸러서 써도 될 듯
    cursor = connection.cursor()
    cursor.execute(f'''SELECT alcohol_no
                           FROM user_alcohol
                           WHERE user_no = {user_no}
                           ''')
    already_drink = cursor.fetchall()

    # 마신 술이 없으면 강제로 리턴
    if len(already_drink) == 0:
        result = {"recommend": recommend_res}
        print("NO REVIEW")
        return JsonResponse(result, safe=False)

    # 복잡한 상태의 배열을 단순한 값만 걸러서 다시 저장
    already_drink = [wrraped_data[0] for wrraped_data in already_drink]

    # 2 MF로 먼저 2개를 추천 받기
    cursor.execute(f'''SELECT similar
                               FROM recommend_mf
                               WHERE user_no = {user_no}
                               ''')
    q_res = cursor.fetchone()  # 값이 있다면 배열 형태의 문자열 그대로 반환될 것 "[1,2,3,4,5]"

    # MF 결과값이 있는 경우
    if q_res is not None:
        mf_sool_list_str = q_res[0]
        # 문자열을 배열 기본형으로 변환
        mf_sool_list = ast.literal_eval(mf_sool_list_str)

        # 먹지 않은 술만 걸러내기 (MF를 일정 시간 마다 수행하기 때문에 그 사이에 유저가 생성한 새로운 과거 주류가 반영되지 않을 수 있음)
        mf_not_drink = [sool for sool in mf_sool_list if sool not in already_drink]

        # MF의 추천결과를 상위 2개만 가져옴
        if len(mf_not_drink) <= 2:
            recommend_res.extend(mf_not_drink)  # 2개보다 적다면 그 만큼만
        else:
            recommend_res.extend(mf_not_drink[:2])
    else:
        print("ONLY IBCF")

    # 3 나머지 모자란 수 만큼 IBCF의 결과에서 가져오기
    # 이미 추천 받은 것도 중복되지 않게 마신 것으로 판단 (실제로 먹지 않더라도 이번 추천에서 안 겹치게)
    drink_filter = already_drink.copy()
    drink_filter.extend(recommend_res)

    icf = ItemCF()
    icf_result = icf.run(review_data, already_drink, drink_filter, user_no, len(recommend_res))
    # 추천 결과 데이터를 반환
    recommend_res.extend(icf_result)
    
    alcohol_recomm_list = "(" + ', '.join(map(str,recommend_res)) + ")"
    cursor.execute(f"""SELECT a.alcohol_no
                            , a.alcohol_name
                            , a.brewery
                            , a.abv
                            , replace(a.size, "|", ", ") as size
                            , CONCAT('https://a402o1a4.s3.ap-northeast-2.amazonaws.com/', a.alcohol_no, '.png') as alcohol_image 
                         FROM alcohol a 
                        WHERE 1=1
                          AND a.alcohol_no in {alcohol_recomm_list}
                    """)

    results= [dict((cursor.description[i][0], value) for i,value in enumerate(row)) \
            for row in cursor.fetchall()]

    cursor.close()
    connection.close()

    # print(recommend_res)
    # print(results)
    return Response(results)


# 일회성 추천
@api_view(['POST'])
@permission_classes([AllowAny])
def get_recom_once(request):
    # 유클리디안 거리 계산 함수
    def euclidean_distance(a, b):
        distance = 0
        for i in range(len(a)):
            distance += (a[i] - b[i]) ** 2
        return distance ** 0.5
    ts = time.time()
    cursor = connection.cursor()
    data = json.loads(request.body)

    sweet = data["sweet"]
    sour = data["sour"]
    scent = data["scent"]
    body = data["body"]
    # 도수레벨 배열로 받음
    t_abv_level = data["abv_level"]

    target = [sweet, sour, scent, body]

    cursor.execute(f'''SELECT alcohol_no, sweet, sour, body, scent, abv_level
                              FROM alcohol_recommend
                              ''')
    query_res = cursor.fetchall()

    alcohol_df = pd.DataFrame(data=query_res, columns=["alcohol_no", "sweet", "sour", "body", "scent", "abv_level"])

    # join으로 모든 술리스트와 합친 리뷰를 가져와서 사용
    # cursor.execute(f'''SELECT b.alcohol_no, CAST(a.sweet as float4), cast(a.sour as float4) , cast(a.body as float4), cast(a.scent as float4)
    #                     FROM alcohol as b
    #                     LEFT OUTER JOIN (SELECT alcohol_no, avg(sweet) as sweet, avg(sour) as sour, avg(body) as body, avg(scent) as scent
    #                                     FROM review
    #                                     GROUP BY alcohol_no) as a
    #                     ON a.alcohol_no = b.alcohol_no;
    #                               ''')
    # 리뷰만 계산한 데이터를 사용
    cursor.execute(f'''SELECT alcohol_no, cast(avg(sweet) as float4) as sweet, cast(avg(sour) as float4) as sour,
                                cast(avg(body) as float4) as body, cast(avg(scent) as float4) as scent
                        FROM review
                        GROUP BY alcohol_no;
                                      ''')

    review_query_res = cursor.fetchall()

    review_df = pd.DataFrame(data=review_query_res, columns=["alcohol_no", "sweet", "sour", "body", "scent"])
    # review_df.fillna(0)

    # 필요한 벡터를 분리
    alcohol_no_list = alcohol_df["alcohol_no"].values.tolist()
    vector_list = alcohol_df[["sweet", "sour", "body", "scent"]].values
    abv_level_list = alcohol_df["abv_level"].values.tolist()

    # 유클리디안 거리 계산
    euclide_res = []
    for i in range(len(alcohol_df)):
        # alcohol_no가 맞는 술을 찾아서 점수를 반영
        conv_vector = None
        try:
            # 리뷰 좌표
            review_cord_arr = review_df.loc[alcohol_no_list[i], ["sweet", "sour", "body", "scent"]].values
            # 반영 점수로 환산
            conv_vector = [x + y for x, y in zip (np.multiply(vector_list[i], 0.4), np.multiply(review_cord_arr, 0.6))]
        except:
            conv_vector = vector_list[i]

        calc = euclidean_distance(target, conv_vector)
        euclide_res.append([alcohol_no_list[i], calc, abv_level_list[i]])

    # dataframe으로 변환
    euclide_df = pd.DataFrame(data=euclide_res, columns=["alcohol_no", "similarity", "abv_level"])
    # 유클리디안 거리를 기준으로 가장 유사한 술 10개를 선정
    top10_alcohols = euclide_df.sort_values(by="similarity", ascending=True)[:10]

    in_res = top10_alcohols.loc[top10_alcohols["abv_level"].isin(t_abv_level)]
    out_res = top10_alcohols.loc[~top10_alcohols["abv_level"].isin(t_abv_level)]

    # 가장 유사한 술 추천
    result = {"in_alcohol_list": [], "out_alcohol_list": []}
    # 해당 도수 범위에 술이 있는 경우
    if len(in_res) > 0:
        temp_list = in_res["alcohol_no"].values.tolist()
        length = len(temp_list)
        if length > 5:
            result["in_alcohol_list"] = temp_list[:5]
        else:
            # 도수에 맞는 술 넣고
            result["in_alcohol_list"] = temp_list
            # 모자란 수만큼 도수에 맞지 않는 술도 가져오기
            result["out_alcohol_list"] = out_res["alcohol_no"].values.tolist()[:5 - length]
    # 해당 도수 범위에 술이 없는 경우
    else:
        result["out_alcohol_list"] = out_res["alcohol_no"].values.tolist()[:5]

    # 범위에 있는 술 정보 가져오기
    for key, value in result.items():
        if len(value) > 0:
            cursor.execute(f"""SELECT   alcohol_no
                                        , alcohol_name
                                        , CONCAT('https://a402o1a4.s3.ap-northeast-2.amazonaws.com/', alcohol_no, '.png') as alcohol_image
                                        , brewery
                                        , replace(size, "|", ", ") as size
                                        , abv
                                        , replace(material, "|", ", ") as material
                                        , detail
                                     FROM alcohol
                                    WHERE 1=1
                                    AND alcohol_no IN ({",".join(str(s) for s in value)})
                                    """)

            result[key] = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) \
                   for row in cursor.fetchall()]
    es = time.time()
    print(f"ONCE CHECK TIME : {es - ts:.5f} sec")
    return JsonResponse(result)


# 과거 주류 기록 보내주기
@api_view(['GET'])
@permission_classes([AllowAny])
def get_record(request):
    user_no = request.GET["user_no"]
    alcohol_no = request.GET["alcohol_no"]

    cursor = connection.cursor()
    cursor.execute(f'''SELECT score
                           FROM user_alcohol
                           WHERE user_no = {user_no}
                           AND alcohol_no = {alcohol_no}
                           ''')
    q_result = cursor.fetchone()
    cursor.close()
    connection.close()

    result = {"score": 0}

    if q_result is not None:
        result["score"] = q_result[0]

    return JsonResponse(result)


# 과거 주류 기록 쓰기
@api_view(['POST'])
@permission_classes([AllowAny])
def write_record(request):
    cursor = connection.cursor()
    data = json.loads(request.body)

    user_no = data["user_no"]
    alcohol_no = data["alcohol_no"]
    score = data["score"]
    update = data["update"]

    result = {"result": None}

    try:
        # 수정인 경우
        if update:
            cursor.execute(f'''UPDATE user_alcohol
                               SET score = {score}
                               WHERE user_no = {user_no}
                               AND alcohol_no = {alcohol_no}
                               ''')
        # 신규인 경우
        else:
            # 평점 데이터가 중복으로 들어가는 건 절대 안되기 때문에
            # 데이터를 한번 훑어서 있는지 확인하고 없을 때만 넣음
            cursor.execute(f'''SELECT score
                           FROM user_alcohol
                           WHERE user_no = {user_no}
                           AND alcohol_no = {alcohol_no}
                           ''')
            has_record = cursor.fetchone()

            if has_record is None:
                cursor.execute(f'''INSERT INTO user_alcohol (user_no, alcohol_no, score)
                               VALUES ({user_no}, {alcohol_no}, {score})
                                ''')

        connection.commit()

        # 평점이 써지면 MF 추천 대상에서 지워줘야 함
        cursor.execute(f'''SELECT similar
                                   FROM recommend_mf
                                   WHERE user_no = {user_no}
                                   ''')
        similar_data = cursor.fetchone()

        try:
            # 문자열에서 배열로 변환
            similar_data = ast.literal_eval(similar_data[0])
            similar_data.remove(alcohol_no)

            # 새 값으로 업데이트 해주기 (배열을 문자열 그대로 전환)
            similar_data = str(similar_data)

            cursor.execute(f'''UPDATE recommend_mf
                                       SET similar = '{similar_data}'
                                       WHERE user_no = {user_no}
                                       ''')

            connection.commit()
        except:
            # ValueError가 발생하면 이미 없다는 뜻
            pass

        cursor.close()
        connection.close()
        print("평점 값 입력 성공")
        result["result"] = "success"

        return JsonResponse(result, status=201)
    except Exception as e:
        connection.rollback()
        print(e)
        print("평점 값 입력에 실패하였음")
        result["result"] = "fail"

        return JsonResponse(result, status=500)
