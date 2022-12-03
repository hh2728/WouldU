import React from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

/**
 * 술 목록 받아서 보여주는 컴포
 * 술 이미지 교체 필요
 * @param {*} prop 좋아요 리스트 받아야함
 * @returns
 */
export default function LikeList(prop) {
  const navigate = useNavigate();
  const onClickItem = item => {
    // console.log(item);
    navigate("/detail/" + item.alcohol_no);
  };

  const like = () => {
    const result = [];
    for (let i = 0; i < prop.likeList.length; i++) {
      result.push(
        <SwiperSlide key={i}>
          <div id="item" onClick={() => onClickItem(prop.likeList[i])}>
            {/** 술 이미지 교체 해야함. */}

            <Card
              sx={{
                width: 170,
                height: 310,
              }}
              id="soolcard"
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={prop.likeList[i].alcohol_image}
                  alt={prop.likeList[i].alcohol_name}
                  id="imgSool"
                />
                <CardContent>
                  <Typography
                    component="div"
                    id="soolname"
                    sx={{ fontSize: 20, fontFamily: "GD" }}
                  >
                    {prop.likeList[i].alcohol_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </SwiperSlide>,
      );
    }
    return result;
  };

  return (
    <StyledWrapper>
      <div id="main">
        <h3 id="title">좋아요 목록</h3>
        {prop.likeList.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={5}
            navigation
          >
            {like()}
          </Swiper>
        ) : (
          <div id="reviewnull">좋아요 누른 술이 없습니다.😥</div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #main {
    margin-top: 20px;
    width: 1300px;
    height: 450px;
    border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-family: "GD";
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;

    background-color: #fcf8e8;
  }

  #soolcard {
    border: 2px solid #e8c9a0;
    border-radius: 5px;
    margin: 5px 0;

    :hover {
      box-shadow: rgba(0, 0, 0, 0.9) 0px 3px 8px;
      transform: scale(1.1);
      background-color: #f2e0c9;
    }
  }
  #title {
    text-align: left;
    padding-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  #item {
    display: inline-block;
    margin-top: 10px;
  }

  img.MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img {
    width: unset;
    margin: auto;
  }

  #imgSool {
    width: 100%;
    height: 230px;
    object-fit: scale-down;
  }

  .swiper-wrapper {
    height: 400px;
  }

  #reviewnull {
    margin-top: 10%;
    font-size: 30px;
  }
`;
