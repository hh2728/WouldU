import pandas as pd
import numpy as np
import time
import random
from sklearn.metrics.pairwise import cosine_similarity


class ItemCF:
    def __init__(self):
        self.sool_user_rating, self.similarity_df = None, None

    def load_data(self, review_data):
        # 리뷰 데이터 로딩
        ratings = pd.DataFrame(data=review_data, columns=['user_no', 'alcohol_no', 'score'])
        ratings_matrix = ratings.pivot_table('score', index='alcohol_no', columns='user_no')
        ratings_matrix.fillna(0, inplace=True)

        self.sool_user_rating = ratings_matrix
        # self.sool_user_rating = review_data

    def check_similarity(self):
        similarity_rate = cosine_similarity(self.sool_user_rating, self.sool_user_rating)
        # index 술 / columns 술
        self.similarity_df = pd.DataFrame(data=similarity_rate, index=self.sool_user_rating.index,
                                          columns=self.sool_user_rating.index)

        return self.similarity_df

    def recomm_sool_by_item_no(self, alcohol_no, drink_filter, order=False, top_n=50):
        s_index = 1 if order == False else 0

        max = len(drink_filter)
        if max < 800:  # 초기 전체 전통주 수
            # user_no로 입력받은 사용자의 모든 전통주 정보를 추출하여 Series로 반환함
            # 내림차순이면, 해당 전통주 자신에 대한 유사도는 항상 1이기 때문에 첫번째는 패스
            # 오름차순이면, 상관없이 처음부터
            pred_sool_rating = self.similarity_df.loc[alcohol_no, :].sort_values(ascending=order)[
                               s_index:top_n + s_index]
        else:
            pred_sool_rating = self.similarity_df.loc[alcohol_no, :].sort_values(ascending=order)[s_index:]
        # 술 번호만 걸러내기
        pred_sool_no = pred_sool_rating.index.tolist()
        # 먹지 않은 술만 걸러내기 (MF를 일정 시간 마다 수행하기 때문에 그 사이에 유저가 생성한 새로운 리뷰가 반영되지 않을 수 있음)
        not_drink = [sool for sool in pred_sool_no if sool not in drink_filter]

        return not_drink

    def run(self, review_data, already_drink, drink_filter, user_no, mf_count):
        # 리뷰 데이터 로딩
        self.load_data(review_data)
        # Item Based CF 수행
        start = time.time()
        self.check_similarity()

        # 결국 5개를 추천할건데 mf나머지만큼 추천
        target_cnt = 5 - mf_count

        res = []

        if len(already_drink) == 1:
            # 해당 술의 평점 조회
            rating = self.sool_user_rating.loc[already_drink[0], user_no]
            flag = True if rating < 3 else False
            # False를 입력값으로 주면 해당 술과 반대되는 술을 추천
            res_list = self.recomm_sool_by_item_no(already_drink[0], drink_filter, flag)

            if len(res_list) < target_cnt:
                res = res_list[:]
            else:
                res = res_list[:target_cnt]

        elif len(already_drink) == 2:
            rec_res = []

            for i in range(2):
                # 해당 술들의 평점 조회
                temp_rating = self.sool_user_rating.loc[already_drink[i], user_no]

                flag = True if temp_rating < 3 else False
                # 결과리스트를 그대로 요소로 추가
                rec_res.append(self.recomm_sool_by_item_no(already_drink[i], drink_filter, flag))

            # 각 술에 대해 추천받은 결과중에 가장 유사한 술을 순서대로 중복없이 걸러서 결과를 만듦
            mySet = set()
            while len(mySet) < target_cnt:
                mySet.add(rec_res[0].pop(0))
                if (len(mySet)) == target_cnt:
                    break
                mySet.add(rec_res[1].pop(0))
                if (len(mySet)) == target_cnt:
                    break

            res = list(mySet)

        else:
            numSet = set()
            while len(numSet) < 3:
                numSet.add(random.randint(0, len(already_drink) - 1))

            rec_res = []

            for i in range(3):
                no = numSet.pop()
                # 해당 술들의 평점 조회
                temp_rating = self.sool_user_rating.loc[already_drink[no], user_no]

                flag = True if temp_rating < 3 else False
                # 결과리스트를 그대로 요소로 추가
                rec_res.append(self.recomm_sool_by_item_no(already_drink[no], drink_filter, flag))

            # 각 술에 대해 추천 받은 결과 중에 가장 유사한 술을 순서대로 중복없이 걸러서 결과를 만듦
            mySet = set()
            break_flag = False
            while len(mySet) < target_cnt:
                if len(rec_res[0]) > 0:
                    for i in range(3):
                        mySet.add(rec_res[i].pop(0))
                        if (len(mySet)) == target_cnt:
                            break_flag = True
                            break
                if break_flag:
                    break

            res = list(mySet)

        end = time.time()

        print(f"IBCF, {end - start:.5f} sec")

        return res
