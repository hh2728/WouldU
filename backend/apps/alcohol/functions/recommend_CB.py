import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from django.db import connection


# Content Based Recommend 데이터를 뽑아오는 부분
def alcohol_recommendations(matrix, items, k=10):
    cursor = connection.cursor()
    cursor.execute(''' DELETE FROM similar_alcohol  ''')

    for row in matrix:
        recom_idx = list(matrix.loc[:, row].values.reshape(1, -1).argsort()[:, ::-1].flatten()[1:k+1])
        # recom_no = list(items.iloc[recom_idx, :].alcohol_no.values)
        print(recom_idx)
        
        result = ','.join(map(str, recom_idx))
        print(row)
        print(type(int(row)))
        print(type(result))
        cursor.execute(f'''INSERT INTO similar_alcohol (alcohol_no, similar)
                        VALUES ({int(row)}, '{result}')
                        ''')

    connection.commit()
    return "success"

# if __name__ == "__main__":

    # title(술 이름)을 index로 바꿔서 DataFrame만들어줌
    # data = pd.read_csv('./ttest.csv')
    # feature_mat = data[['alcohol', 'sweet', 'sour', 'scent', 'body']]
    # matrix = pd.DataFrame(feature_mat.to_numpy(), columns=feature_mat.columns, index=data.name)
    # print(matrix)

def alcohol_rec():
    cursor = connection.cursor()
    cursor.execute('''SELECT a.alcohol_no
                           , b.abv
                           , a.sweet
                           , a.sour
                           , a.body
                           , a.scent
                        FROM alcohol_recommend a
                           , alcohol b
                       WHERE 1=1
                         AND a.alcohol_no = b.alcohol_no
                       ORDER BY a.alcohol_no 
                   ''')

    # data = [list(row) for row in cursor.fetchall()]
    # data = np.array(data)
    # feature_mat = data[:, 1:-1]
    # feature_mat = [i[1:5] for i in data]
    feature_mat = np.array(cursor.fetchall())
    index = feature_mat[:, 0:1].flatten()
    matrix = pd.DataFrame(data=feature_mat[:, 1:6], columns=["abv", "sweet", "sour", "body", "scent"], index=index)
    # print(feature_mat)

    # # 코사인 유사도를 구해서 저장하는 부분
    print("cosine")
    cosine_sim = cosine_similarity(matrix)
    #cosine_ = cosine_similarity(matrix, matrix).argsort()[:, ::-1]
    cosine_sim_df = pd.DataFrame(cosine_sim, index = index, columns = index)
    # print(cosine_sim_df)

    # # 피어슨 유사도를 구해서 저장하는 부분
    # # print("pearson")
    # # pearson_sim = feature_mat.corr(method="pearson")
    # # pearson_sim_df = pd.DataFrame(pearson_sim, index = data.name, columns = data.name)
    # # print(pearson_sim_df.shape)
    # # print(pearson_sim_df.head(5))
    
    print(alcohol_recommendations(cosine_sim_df, feature_mat, 10))

    