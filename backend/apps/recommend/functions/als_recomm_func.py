import time

import numpy as np
from matplotlib import pyplot as plt
from sklearn.metrics import mean_squared_error

def plot_losses(predict_errors, confidence_errors, regularization_list, total_losses):
    plt.subplots_adjust(wspace=100.0, hspace=20.0)
    fig = plt.figure()
    fig.set_figheight(10)
    fig.set_figwidth(10)

    predict_error_line = fig.add_subplot(2, 2, 1)
    confidence_error_line = fig.add_subplot(2, 2, 2)
    regularization_error_line = fig.add_subplot(2, 2, 3)
    total_loss_line = fig.add_subplot(2, 2, 4)

    predict_error_line.set_title("Predict Error (RMSE)")
    predict_error_line.plot(predict_errors)

    confidence_error_line.set_title("Confidence Error")
    confidence_error_line.plot(confidence_errors)

    regularization_error_line.set_title("Regularization")
    regularization_error_line.plot(regularization_list)

    total_loss_line.set_title("Total Loss")
    total_loss_line.plot(total_losses)
    plt.show()


def loss_function(C, P, xTy, X, Y, r_lambda):
    mse = mean_squared_error(P, xTy)
    rmse = np.sqrt(mse)

    predict_error = np.square(P - xTy)
    confidence_error = np.sum(C * predict_error)
    regularization = r_lambda * (np.sum(np.square(X)) + np.sum(np.square(Y)))
    total_loss = confidence_error + regularization

    # return np.sum(predict_error), confidence_error, regularization, total_loss
    return rmse, confidence_error, regularization, total_loss


def optimize_user(X, Y, C, P, nu, nf, r_lambda):
    yT = np.transpose(Y)
    for u in range(nu):
        Cu = np.diag(C[u])
        yT_Cu_y = np.matmul(np.matmul(yT, Cu), Y)
        lI = np.dot(r_lambda, np.identity(nf))
        yT_Cu_pu = np.matmul(np.matmul(yT, Cu), P[u])
        X[u] = np.linalg.solve(yT_Cu_y + lI, yT_Cu_pu)


def optimize_item(X, Y, C, P, ni, nf, r_lambda):
    xT = np.transpose(X)
    for i in range(ni):
        Ci = np.diag(C[:, i])
        xT_Ci_x = np.matmul(np.matmul(xT, Ci), X)
        lI = np.dot(r_lambda, np.identity(nf))
        xT_Ci_pi = np.matmul(np.matmul(xT, Ci), P[:, i])
        Y[i] = np.linalg.solve(xT_Ci_x + lI, xT_Ci_pi)


def train():
    predict_errors = []
    confidence_errors = []
    regularization_list = []
    total_losses = []

    for i in range(15):
        if i != 0:
            optimize_user(X, Y, C, P, nu, nf, r_lambda)
            optimize_item(X, Y, C, P, ni, nf, r_lambda)
        predict = np.matmul(X, np.transpose(Y))
        predict_error, confidence_error, regularization, total_loss = loss_function(C, P, predict, X, Y, r_lambda)

        predict_errors.append(predict_error)
        confidence_errors.append(confidence_error)
        regularization_list.append(regularization)
        total_losses.append(total_loss)

        # print('----------------step %d----------------' % i)
        # print("predict error: %f" % predict_error)
        # print("confidence error: %f" % confidence_error)
        # print("regularization: %f" % regularization)
        # print("total loss: %f" % total_loss)
        print("step %d - RMSE: %f" % (i, predict_error) )

    predict = np.matmul(X, np.transpose(Y))
    print('final predict')
    print(predict)

    # print("예측", predict[12])
    # print("기존", R[12])

    return  predict_errors,  confidence_errors, regularization_list, total_losses


def get_not_drink_sool(ratings_matrix, user_id):
    # user_id로 입력받은 사용자의 모든 전통주 정보를 추출하여 Series로 반환함
    # 반환된 user_rating 은 전통주명(name)을 index로 가지는 Series 객체
    user_rating = ratings_matrix.loc[user_id, :]

    # user_rating이 0보다 크면 기존에 마셔본 전통주. 대상 index를 추출하여 list 객체로 만듬
    already_drink = user_rating[user_rating > 0].index.tolist()

    # 모든 전통주 이름을 list 객체로 만듬.
    sools_list = ratings_matrix.columns.tolist()

    # list comprehension으로 already_drink에 해당하는 sool은 sool_list에서 제외함.
    not_drink_list = [sool for sool in sools_list if sool not in already_drink]

    return not_drink_list


def recomm_sool_by_userid(pred_df, user_id, not_drink_list, top_n=10):
    # 예측 평점 DataFrame에서 user_id index와 not_drink_list로 들어온 전통주 이름 컬럼을 추출하여
    # 가장 예측 평점이 높은 순으로 정렬함.
    recomm_sools = pred_df.loc[user_id, not_drink_list].sort_values(ascending=False)[:top_n]
    return recomm_sools


if __name__ == "__main__":
    import pandas as pd
    import numpy as np

    sools = pd.read_csv('data/sool.csv')
    ratings = pd.read_csv('data/review.csv')
    ratings = ratings[['user_id', 'alco_id', 'rating']]
    ratings_matrix = ratings.pivot_table('rating', index='user_id', columns='alco_id')

    # 미리 판단한 전통주의 맛 값을 불러옴
    tastes_list = sools[["alco_id","sweet","sour","scent","body"]]
    tastes_matrix = tastes_list.set_index("alco_id").to_numpy()

    # name 컬럼을 얻기 이해 sools 와 조인 수행
    rating_sools = pd.merge(ratings, sools, on='alco_id')

    """
    # columns='name' 로 title 컬럼으로 pivot 수행.
    ratings_matrix = rating_sools.pivot_table('rating', index='user_id', columns='name')
    # 9번 유저가 마시지 않은 전통주 추출
    not_drink_list = get_not_drink_sool(ratings_matrix, 9)
    # 가장 추천 예상 점수가 높은 상위 10개의 전통주를 추천
    recomm_sools = recomm_sool_by_userid(ratings_pred_matrix, 9, not_drink_list, top_n=10)
    # 평점 데이터를 DataFrame으로 생성.
    recomm_sools = pd.DataFrame(data=recomm_sools.values, index=recomm_sools.index, columns=['pred_score'])
    print(recomm_sools)
    """

    # 정규화 파라미터
    r_lambda = 40
    # latent factor 수
    nf = 4
    # confidence level
    alpha = 40
    # 학습 대상 평점 데이터 (빈 값은 0으로 채움)
    R = ratings_matrix.fillna(0).to_numpy()
    # nu : user 수 / ni : item 수
    nu = R.shape[0]
    ni = R.shape[1]

    # initialize X and Y with very small values / Y는 5점 만점인 맛 점수를 맞춰줌
    X = np.random.rand(nu, nf) * 0.01
    Y = np.random.rand(ni, nf) * 0.01
    # Y = np.divide(tastes_matrix, 5) * 0.01

    P = np.copy(R)
    P[P > 0] = 1
    C = 1 + alpha * R

    start = time.time()

    predict_errors, confidence_errors, regularization_list, total_losses = train()

    end = time.time()

    # 그래프 시각화
    # plot_losses(predict_errors,  confidence_errors, regularization_list, total_losses)

    print(f"{end - start:.5f} sec")
