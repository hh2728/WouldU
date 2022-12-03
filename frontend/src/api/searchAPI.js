import { json } from "react-router-dom";
import { apiClient } from ".";

// 검색
export const search = async params => {
  try {
    // console.log(`/search?name=${params.name}&alcol_type=${params.name}&row_index=${params.row_index}&sort=${params.sort}`)
    // const res = await apiClient.get(`/search?name=${params.name}&alcol_type=${params.alcol_type}&row_index=${params.row_index}&sort=${params.sort}`);
    const res = await apiClient.get(`/search/`, { params: params });
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
