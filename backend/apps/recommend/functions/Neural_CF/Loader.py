import os
import pandas as pd
import numpy as np


class Loader():

    def __init__(self):
        pass

    def load_dataset(self):
        """
        데이터 로드 함수

        uids: train user
        iids: train item
        users: 전체 user
        items: 전체 item
        df_train
        df_test
        """
        # 데이터 로드
        sools = pd.read_csv('../data/sool.csv')
        ratings = pd.read_csv('../data/review.csv')
        ratings = ratings[['user_id', 'alco_id', 'rating']]
        ratings_matrix = ratings.pivot_table('rating', index='user_id', columns='alco_id')

        """
        # 데이터 로드 단계
        원래는 모든 유저 데이터, 모든 평점 데이터를 가져오고, 그 중에서 평점이 있는 유저만 학습 데이터로 활용
        지금 리뷰데이터는 존재하는 값만 갖고 있기 때문에 별도의 과정이 필요 없음
        
        # 유저 샘플링 단계
        unique한 약 36만 명의 유저에서 10만 명을 샘플링해서 사용
        
        # 1명 이상의 artist 데이터가 있는 user 만 사용
        df_count = df.groupby(['user']).count()
        df['count'] = df.groupby('user')['user'].transform('count')
        df = df[df['count'] > 1]
        
        # user, item 아이디 부여 - id가 숫자가 아니라 문자열 코드여서 그런듯
        
        # lookup 테이블 생성
        item_lookup = df[['item_id', 'item']].drop_duplicates()
        item_lookup['item_id'] = item_lookup.item_id.astype(str)
        
        # train, test 데이터 생성
        df = df[['user_id', 'item_id', 'plays']]
        df_train, df_test = self.train_test_split(df)
        
        # 전체 user, item 리스트 생성
        users = list(np.sort(df.user_id.unique()))
        items = list(np.sort(df.item_id.unique()))
        
        """

        # lookup 테이블 생성
        sool_lookup = sools[["alco_id", "name"]]

        # train, test 데이터 생성
        df_train, df_test = self.train_test_split(ratings_matrix)

        # 전체 user, item 리스트 생성
        users = list(np.sort(ratings_matrix.user_id.unique()))
        sools = list(np.sort(ratings_matrix.alco_id.unique()))

        # train user, item 리스트 생성
        rows = df_train['user_id'].astype(int)
        cols = df_train['alco_id'].astype(int)
        values = list(df_train.rating)

        uids = np.array(rows.tolist())
        iids = np.array(cols.tolist())

        # 각 user 마다 negative item 생성
        df_neg = self.get_negatives(uids, iids, sools, df_test)

        return uids, iids, df_train, df_test, df_neg, users, sools, sool_lookup

    def get_negatives(self, uids, iids, items, df_test):
        """
        negative item 리스트 생성함수
        """
        negativeList = []
        test_u = df_test['user_id'].values.tolist()
        test_i = df_test['alco_id'].values.tolist()

        test_ratings = list(zip(test_u, test_i))  # test (user, item)세트
        zipped = set(zip(uids, iids))  # train (user, item)세트

        for (u, i) in test_ratings:

            negatives = []
            negatives.append((u, i))
            for t in range(100):
                j = np.random.randint(len(items))  # neg_item j 1개 샘플링
                while (u, j) in zipped:  # j가 train에 있으면 다시뽑고, 없으면 선택
                    j = np.random.randint(len(items))
                negatives.append(j)
            negativeList.append(negatives)  # [(0,pos), neg, neg, ...]

        df_neg = pd.DataFrame(negativeList)

        return df_neg

    def mask_first(self, x):

        result = np.ones_like(x)
        result[0] = 0  # [0,1,1,....]

        return result

    def train_test_split(self, df):
        """
        train, test 나누는 함수
        """
        df_test = df.copy(deep=True)
        df_train = df.copy(deep=True)

        #TODO 여기서부터 마저 만들기
        # df_test
        # user_id와 holdout_item_id(user가 플레이한 아이템 중 1개)뽑기
        print("시작\n", df_test)
        df_test = df_test.groupby(['user_id']).first()
        print("first\n", df_test)
        df_test['user_id'] = df_test.index
        print("index\n", df_test)
        df_test = df_test[['user_id', 'alco_id', 'rating']]
        print("[[]]\n", df_test)
        df_test = df_test.reset_index(drop=True)
        print("reset\n", df_test)

        # df_train
        # user_id 리스트에 make_first()적용
        mask = df.groupby(['user_id'])['user_id'].transform(self.mask_first).astype(bool)
        df_train = df.loc[mask]

        return df_train, df_test

    def get_train_instances(self, uids, iids, num_neg, num_items):
        """
        모델에 사용할 train 데이터 생성 함수
        """
        user_input, item_input, labels = [], [], []
        zipped = set(zip(uids, iids))  # train (user, item) 세트

        for (u, i) in zip(uids, iids):

            # pos item 추가
            user_input.append(u)  # [u]
            item_input.append(i)  # [pos_i]
            labels.append(1)  # [1]

            # neg item 추가
            for t in range(num_neg):

                j = np.random.randint(num_items)  # neg_item j num_neg 개 샘플링
                while (u, j) in zipped:  # u가 j를 이미 선택했다면
                    j = np.random.randint(num_items)  # 다시 샘플링

                user_input.append(u)  # [u1, u1,  u1,  ...]
                item_input.append(j)  # [pos_i, neg_j1, neg_j2, ...]
                labels.append(0)  # [1, 0,  0,  ...]

        return user_input, item_input, labels
