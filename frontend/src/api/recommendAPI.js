import { json } from "react-router-dom";
import { apiClient } from ".";

// 유저 개인 추천

export const userRecom = async () => {
  let user_no = sessionStorage.getItem("no");
  if (user_no === null) {
    user_no = "0";
  }
  try {
    const res = await apiClient.get(`/recommend/user/${user_no}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 술 상세 받아오기
export const alcoholDetail = async al_no => {
  let user_no = sessionStorage.getItem("no");
  if (user_no === null) {
    user_no = "0";
  }

  try {
    const res = await apiClient.get(
      `/alcohol/detail?alco_no=${al_no}&user_no=${user_no}`,
    );
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 술 (신맛,단맛,향,바디감) 리뷰 보내주기
export const alcoholreview = async data => {
  try {
    const res = await apiClient.post(`/alcohol/review`, data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 좋아요~~
export const alcoholLike = async data => {
  try {
    const res = await apiClient.post(`/alcohol/like`, data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 유사주류
export const similaralcohol = async no => {
  try {
    const res = await apiClient.get(`/alcohol/similar-alcohol/${no}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

//상세페이지 유저 평가
export const reviewalcohol = async no => {
  try {
    const res = await apiClient.get(`alcohol/review/${no}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 일회용 추천
export const onceRecom = async data => {
  try {
    const res = await apiClient.post(`/recommend/once`, data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 술 평가 점수 받아오기
export const getRecord = async data => {
  let user_no = sessionStorage.getItem("no");
  if (user_no === null) {
    user_no = "0";
  }
  try {
    const res = await apiClient.get(`/recommend/record`, {
      params: { user_no: user_no, alcohol_no: data },
    });
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 술 평가 기록하기
export const makeRecord = async data => {
  let user_no = sessionStorage.getItem("no");
  if (user_no === null) {
    user_no = "0";
  }
  try {
    const res = await apiClient.post(`/recommend/record/update`, {
      user_no: user_no,
      ...data,
    });
    return res;
  } catch (err) {
    // console.log(err);
    return err.response;
  }
};
