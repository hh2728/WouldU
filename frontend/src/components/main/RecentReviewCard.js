import React, { useState, useEffect } from "react";
import styled from "styled-components";
import newtag from "assets/img/newtag.png";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recentReview } from "../../api/mainpageAPI";

export default function RecentReviewCard() {
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();
  const onClick = alcohol_no => {
    navigate("/detail/" + alcohol_no);
  };

  function convList(list) {
    const convert = list.map((item, index) => {
      return (
        <Grid
          container
          direction="row"
          key={index}
          className="gridItem"
          onClick={() => {
            onClick(item.alcohol_no);
          }}
        >
          <Grid
            item
            xs
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "18px",
            }}
          >
            &nbsp;{item.ranking}.&nbsp;
            {item.alcohol_name}
          </Grid>
          <Grid item xs={2} textAlign="center" alignItems="center">
            {checkToday(item.reg_date)}
          </Grid>
        </Grid>
      );
    });

    return convert;
  }

  useEffect(() => {
    recentReview().then(res => {
      //console.log(res);

      let resList = res;
      let temp = [];

      resList = convList(resList);

      if (resList.length > 5) {
        temp = [
          resList.slice(0, 5), // 1~5
          resList.slice(5), // 6부터 끝까지
        ];
      } else {
        temp = [resList, []];
      }

      setReviewList(temp);
    });
  }, []);

  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();

  const checkToday = date => {
    if (
      todayYear === Number(date.slice(0, 4)) &&
      todayMonth === Number(date.slice(5, 7)) &&
      todayDate === Number(date.slice(8, 10))
    ) {
      return <img src={newtag} alt="신규" />;
    }
  };

  return (
    <StyledWrapper>
      <h2>📝 최근 리뷰가 작성된 전통주</h2>
      {reviewList[0]?.length > 0 ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          columnGap={2}
          flexWrap="nowrap"
        >
          <Grid xs={6} item>
            <Stack>
              {reviewList[0].map(item => {
                return item;
              })}
            </Stack>
          </Grid>
          {reviewList[1]?.length > 0 ? (
            <Grid xs={6} item>
              <Stack>
                {reviewList[1].map(item => {
                  return item;
                })}
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <p>최근 리뷰 데이터를 불러올 수 없어요😥</p>
      )}
    </StyledWrapper>
  );
}

// &nbsp;{reviewList[9].ranking}.&nbsp;
//               {reviewList[9].alcohol_name}
//               {checkToday(reviewList[9].reg_date)}

const StyledWrapper = styled.div`
  width: 42vw;
  min-width: 540px;
  height: 380px;
  margin: 10px;
  padding: 10px 1.5rem;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "GD";
  box-sizing: border-box;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .gridItem {
    cursor: pointer;
    border: 2px solid #ffffff;
    border-radius: 5px;
    padding: 5px 5px;
    margin: 5px 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    :hover {
      color: white;
      transform: scale(1.1);
      box-shadow: rgba(0, 0, 0, 0.65) 0px 3px 8px;
      background-color: #3d3d3d;
    }
  }

  .gridItem p {
    font-size: 18px;
    font-family: "GD";
  }

  img {
    width: 28px;
  }
`;
