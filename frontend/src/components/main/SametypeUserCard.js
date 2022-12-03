import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { userRank } from "../../api/mainpageAPI";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

/**
 * 술 이미지 교체 필요, 리뷰 보여주는 컴포, 리뷰 삭제 post보내야함
 * @param {*} prop 리뷰리스트 받아야함
 * @returns
 */
export default function SameType() {
  const [sametype, setSametype] = useState();
  const navigate = useNavigate();
  const onClickItem = item => {
    //console.log(item);
    navigate("/detail/" + item.alcohol_no);
  };

  useEffect(() => {
    if (sessionStorage.getItem("no") !== null) {
      userRank().then(res => {
        setSametype(res);
      });
    }
  }, []);

  if (sametype && sametype.length > 0) {
    return (
      <StyledWrapper>
        <div id="main">
          <h3 id="title">나와 비슷한 유저들이 선택한 전통주</h3>
          <Swiper
            id="swiper"
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
          >
            {sametype &&
              sametype.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card
                    sx={{
                      maxWidth: 300,
                    }}
                    onClick={() => onClickItem(item)}
                    id="soolcard"
                  >
                    <CardActionArea>
                      <div id="image-arrange">
                        <div id="image-frame">
                          <CardMedia
                            component="img"
                            width="220"
                            height="220"
                            alt="술"
                            id="imgSool"
                            image={item.alcohol_image}
                          />
                        </div>
                      </div>
                      <CardContent>
                        <Typography
                          component="div"
                          sx={{ fontSize: 20, fontFamily: "GD" }}
                        >
                          <h4>{item.alcohol_name}</h4>
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ fontSize: 20, fontFamily: "GD", mt: 2 }}
                          id="ratestars"
                        >
                          <h4>평점 :&nbsp;</h4>
                          <Rating
                            name="read-only"
                            value={item.avg_score}
                            readOnly
                            id="stars"
                            size="large"
                          />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </StyledWrapper>
    );
  } else {
  }
}

const StyledWrapper = styled.div`
  #main {
    width: 90vw;
    min-width: 1200px;
    height: 520px;
    border-style: solid;
    border-width: 2px;
    font-family: "GD";
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    margin-bottom: 70px;
  }
  #title {
    text-align: center;
    padding-top: 30px;
  }
  .swiper {
    height: 100%;
  }
  .swiper-wrapper {
    margin-left: 50px;
    margin-top: 30px;
  }

  #image-arrange {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #image-frame {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
  }

  #imgSool {
    width: 240px;
    height: 240px;
    margin: auto;
    object-fit: contain;
    border-radius: 10px;
  }

  #soolcard {
    padding: 5px 5px;
    margin: 5px 0;
    width: 100%;
    display: flex;
    align-items: center;
    :hover {
      transform: scale(1.1);
      // border: 2px solid D8D8D8;
      border-radius: 5px;
      background-color: #d8d8d8;
    }
  }
  #ratestars {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #stars {
    margin-top: -3px;
  }

  .swiper-button-prev {
    top: 42%;
  }
  .swiper-button-next {
    top: 42%;
  }
`;
