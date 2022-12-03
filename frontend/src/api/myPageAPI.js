// eslint-disable-next-line
import { json } from "react-router-dom";
import { apiClient } from ".";

// 먹은 술 주종 카테고리 차트
export const category = async () => {
  try {
    const res = await apiClient.get(`/mypage/my-fav-alcohol`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 먹은 술 평균값 차트
export const average = async () => {
  try {
    const res = await apiClient.get(`/mypage/my-alcohol`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 먹은 술 지역 차트
export const space = async () => {
  try {
    const res = await apiClient.get(`/mypage/region`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 좋아요 리스트
export const mylike = async () => {
  try {
    const res = await apiClient.get(`/mypage/my-fav-list`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 리뷰 리스트
export const myreview = async () => {
  try {
    const res = await apiClient.get(`/mypage/my-review-list`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 리뷰 삭제
export const mydelete = async no => {
  try {
    const res = await apiClient.delete(`/mypage/review/${no}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
