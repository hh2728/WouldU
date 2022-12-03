import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log("BASE : " + BASE_URL);
export const apiClient = axios.create({
  baseURL: BASE_URL, // 환경변수로 지정한 BASE_URL을 사용
  // headers: {'user-no': 0}
});

apiClient.interceptors.request.use(
  function (config) {
    const user_no = sessionStorage.getItem("no");
    if (user_no) config.headers["user-no"] = user_no;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
