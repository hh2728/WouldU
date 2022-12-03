import { useState } from "react";
import { json } from "react-router-dom";
import { apiClient } from ".";

// 아이디 중복체크
export const idCheck = async inputId => {
  try {
    const res = await apiClient.get(`/user/checkid/${inputId}`);
    return res;
  } catch (err) {
    // console.log(err);
  }
};

// 회원가입
export const join = async data => {
  try {
    const res = await apiClient.post(`/user/signup`, data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

// 회원가입
export const login = async data => {
  try {
    const res = await apiClient.post(`/user/signin`, data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
