import time
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from sqlalchemy import create_engine
import pymysql


class MF:
    def __init__(self):
        self.R, self.P, self.Q, self.pred_matrix, self.pred_matrix_df = None, None, None, None, None

    def load_data(self, review_data):
        # 리뷰 데이터 로딩
        ratings = pd.DataFrame(data=review_data, columns=['user_no', 'alcohol_no', 'score'])
        ratings_matrix = ratings.pivot_table('score', index='user_no', columns='alcohol_no')

        self.R = ratings_matrix
        # self.R = review_data

    def get_rmse(self, R_mf, non_zeros):
        error = 0
        # 두개의 분해된 행렬 P와 Q.T의 내적 곱으로 예측 R 행렬 생성
        self.pred_matrix = np.dot(self.P, self.Q.T)

        # 실제 R 행렬에서 널이 아닌 값의 위치 인덱스 추출하여 실제 R 행렬과 예측 행렬의 RMSE 추출
        x_non_zero_ind = [non_zero[0] for non_zero in non_zeros]
        y_non_zero_ind = [non_zero[1] for non_zero in non_zeros]
        R_non_zeros = R_mf[x_non_zero_ind, y_non_zero_ind]

        full_pred_matrix_non_zeros = self.pred_matrix[x_non_zero_ind, y_non_zero_ind]

        mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
        rmse = np.sqrt(mse)

        return rmse

    def matrix_factorization(self, K, steps=200, learning_rate=0.01, r_lambda=0.01):
        R_mf = self.R.values

        num_users, num_items = self.R.shape
        # P 매트릭스의 크기를 지정하고 정규분포를 가진 랜덤한 값으로 입력
        np.random.seed(1)
        self.P = np.random.normal(scale=1. / K, size=(num_users, K))
        self.Q = np.random.normal(scale=1. / K, size=(num_items, K))

        # # bias 초기값 설정
        # Bu = np.zeros(num_users)
        # Bd = np.zeros(num_items)
        # B = np.mean(R[R > 0])

        # R > 0 인 행 위치, 열 위치, 값을 non_zeros 리스트 객체에 저장.
        non_zeros = [(i, j, R_mf[i, j]) for i in range(num_users) for j in range(num_items) if R_mf[i, j] > 0]

        # SGD기법으로 P,Q 매트릭스를 계속 업데이트
        for step in range(steps):
            for i, j, r in non_zeros:
                # 실제 값과 예측 값의 차이인 오류 값 구함

                # # 사용자의 bias를 고려하여 예측값 계산
                # prediction = B + Bu[i] + Bd[j] + np.dot(P[i, :], Q[j, :].T)
                # eij = r - prediction

                eij = r - np.dot(self.P[i, :], self.Q[j, :].T)

                # Regularization, Biases 반영한 SGD 업데이트 공식 적용
                # Bu[i] = Bu[i] + learning_rate * (eij - r_lambda * Bu[i])
                # Bd[j] = Bd[j] + learning_rate * (eij - r_lambda * Bd[j])

                self.P[i, :] = self.P[i, :] + learning_rate * (eij * self.Q[j, :] - r_lambda * self.P[i, :])
                self.Q[j, :] = self.Q[j, :] + learning_rate * (eij * self.P[i, :] - r_lambda * self.Q[j, :])

            # 이 과정에서 예측 결과 행렬을 계속 업데이트
            rmse = self.get_rmse(R_mf, non_zeros)
            if (step % 50) == 0:
                print("### iteration step : ", step, " rmse : ", rmse)

        return self.pred_matrix

    def convert_pred_matrix(self, pred_matrix):
        pred_matrix_df = pd.DataFrame(data=pred_matrix, index=self.R.index, columns=self.R.columns)
        self.pred_matrix_df = pred_matrix_df

    def recomm_sool_by_userno(self, user_no, top_n=10):
        # user_no로 입력받은 사용자의 모든 전통주 정보를 추출하여 Series로 반환함
        sool_rating = self.R.loc[user_no, :]
        # user_rating이 0보다 크면 기존에 마셔본 전통주. 대상 index를 추출하여 list 객체로 만듬
        already_drink = sool_rating[sool_rating > 0].index.tolist()
        # 모든 전통주 번호를 list 객체로 만듬.
        sools_list = sool_rating.index.tolist()
        # list comprehension으로 already_drink에 해당하는 sool은 sool_list에서 제외함.
        not_drink_list = [sool for sool in sools_list if sool not in already_drink]

        # 가장 예측 평점이 높은 순으로 정렬하고 top_n개 반환
        recomm_sools = self.pred_matrix_df.loc[user_no, not_drink_list].sort_values(ascending=False)[:top_n]
        return recomm_sools

    @staticmethod
    def save_database(pred_list):
        df = pd.DataFrame(data=pred_list, columns=["user_no", "similar"])

        pymysql.install_as_MySQLdb()
        engine = create_engine("mysql+mysqldb://o1a4:" + "a402o1a4!!" + "@j7a402.p.ssafy.io:3306/o1a4", encoding='utf-8')

        try:
            df.to_sql(name="recommend_mf", con=engine, if_exists="replace", index=False)
        except Exception as e:
            print("DB 저장에 실패했습니다.", e)

    def run(self, data):
        # 데이터 세팅
        self.load_data(data)
        # MF 수행 [K:잠재요인 수, steps:학습반복 수, learning_rate:학습률(1회 학습 당 변화율), r_lambda:정규화계수)
        start_mf = time.time()
        pred_matrix = self.matrix_factorization(K=75, steps=500, learning_rate=0.01, r_lambda=0.01)
        end_mf = time.time()

        print(f"MF TIME : {end_mf - start_mf:.5f} sec")

        # 예측 행렬 변환
        self.convert_pred_matrix(pred_matrix)
        # 평가가 있는 모든 유저에 대해 먹지 않은 술 추천 수행
        res_list = []
        user_list = self.R.index.tolist()

        start_check = time.time()

        for user_no in user_list:
            rec_result = self.recomm_sool_by_userno(user_no, 10)
            # rec_result는 술 번호, 예측점수로 이루어진 dataframe
            res_list.append([user_no, str(rec_result.index.tolist())])  # [user_no, "[추천 술 id]"]를 하나의 요소로 배열에 추가

        end_check = time.time()

        print(f"MF USER CHECK TIME : {end_check - start_check:.5f} sec")

        # 전체 유저에 대한 추천 결과 DB에 저장
        self.save_database(res_list)
