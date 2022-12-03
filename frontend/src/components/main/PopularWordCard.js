import React, { useState, useEffect } from "react";
import styled from "styled-components";
import one from "assets/img/number/one.png";
import two from "assets/img/number/two.png";
import three from "assets/img/number/three.png";
import four from "assets/img/number/four.png";
import five from "assets/img/number/five.png";
import six from "assets/img/number/six.png";
import seven from "assets/img/number/seven.png";
import eight from "assets/img/number/eight.png";
import nine from "assets/img/number/nine.png";
import ten from "assets/img/number/ten.png";
import { useNavigate } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { likeRanking } from "../../api/mainpageAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function PopularWordCard() {
  const [popularList, setPopularList] = useState([]);
  const navigate = useNavigate();
  const onClick = alcohol_no => {
    navigate("/detail/" + alcohol_no);
  };

  const imgList = [one, two, three, four, five, six, seven, eight, nine, ten];

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
            <img src={imgList[index]} alt={index + 1} />
            {item.alcohol_name}
          </Grid>
        </Grid>
      );
    });

    return convert;
  }

  useEffect(() => {
    likeRanking().then(res => {
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

      setPopularList(temp);
    });
  }, []);

  return (
    <StyledWrapper>
      <h2>🏆 실시간 좋아요 순위 </h2>
      {popularList[0]?.length > 0 ? (
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
              {popularList[0].map(item => {
                return item;
              })}
            </Stack>
          </Grid>
          {popularList[1]?.length > 0 ? (
            <Grid xs={6} item>
              <Stack>
                {popularList[1].map(item => {
                  return item;
                })}
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <p>실시간 좋아요 순위를 불러올 수 없어요😥</p>
      )}
    </StyledWrapper>
  );
}

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
  background-color: #fcf8e8;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .gridItem {
    cursor: pointer;
    border: 2px solid #ecdfc8;
    border-radius: 5px;
    padding: 5px 5px;
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #ecdfc8;

    :hover {
      transform: scale(1.1);
      box-shadow: rgba(0, 0, 0, 0.9) 0px 3px 8px;
      background-color: #ecdfc8;
    }
  }

  .gridItem p {
    font-size: 18px;
    font-family: "GD";
  }

  img {
    width: 24px;
    margin-right: 7px;
  }
`;
