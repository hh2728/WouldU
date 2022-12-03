// eslint-disable-next-line
import { json } from "react-router-dom";
import { apiClient } from ".";

// 유형별 랭킹
export const userRank = async () => {
  let user_no = sessionStorage.getItem("no");
  if (user_no === null) {
    user_no = "0";
  }

  try {
    const res = await apiClient.get(`/alcohol/rank-type/${user_no}`);
    return res.data;
  } catch (err) {
    //console.log(err);
  }
};

// 최근 리뷰작성된 목록 불러오기
export const recentReview = async () => {
  try {
    const res = await apiClient.get(`/review-ranking`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 최근 리뷰작성된 목록 불러오기
export const likeRanking = async () => {
  try {
    const res = await apiClient.get(`/like-ranking`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
