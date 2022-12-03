import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import earth from "assets/img/earth.png";
import planet1 from "assets/img/planet1.png";
import planet2 from "assets/img/planet2.png";
import planet3 from "assets/img/planet3.png";
import planet4 from "assets/img/planet4.png";
import planet5 from "assets/img/planet5.png";
import planet6 from "assets/img/planet6.png";
import planet7 from "assets/img/planet7.png";
import planet8 from "assets/img/planet8.png";
import space from "assets/img/space_example.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

export default function MyCollection(prop) {
  const [rank, setRank] = useState();
  const [max, setMax] = useState(0);

  useEffect(() => {
    if (prop.spaceData && prop.spaceData.length > 0) {
      prop.spaceData.sort(function (a, b) {
        return b.space - a.space;
      });
      setRank(prop.spaceData);

      for (var i = 0; i < prop.spaceData.length; i++) {
        if (max < prop.spaceData[i].count) {
          setMax(prop.spaceData[i].count);
        }
      }
    }
  }, [prop, rank]);

  if (prop.spaceData && prop.spaceData.length > 0) {
    if (rank && rank.length > 0) {
      return (
        <StyledWrapper>
          <h3 id="title">{prop.userName}님이 마신 술은 여기에서 왔어요! </h3>
          <div id="main2">
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={4}
              navigation
              height={500}
            >
              <div id="space">
                <SwiperSlide>
                  <Earth count={parseInt(rank[0].count / (max / 4))}>
                    <div id="textCount">{rank[0].count} 개</div>
                    <img src={earth} alt="지구" id="P_earth" />
                    <h5>{rank[0].space}</h5>
                  </Earth>
                </SwiperSlide>
                {rank[1] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[1].count / (max / 4))}>
                      <div id="textCount">{rank[1].count} 개</div>
                      <img src={planet1} alt="행성" id="P_planet" />
                      <h5>{rank[1].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[2] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[2].count / (max / 4))}>
                      <div id="textCount">{rank[2].count} 개</div>
                      <img src={planet2} alt="행성" id="P_planet" />
                      <h5>{rank[2].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[3] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[3].count / (max / 4))}>
                      <div id="textCount">{rank[3].count} 개</div>
                      <img src={planet3} alt="행성" id="P_planet" />
                      <h5>{rank[3].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[4] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[4].count / (max / 4))}>
                      <div id="textCount">{rank[4].count} 개</div>
                      <img src={planet4} alt="행성" id="P_planet" />
                      <h5>{rank[4].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[5] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[5].count / (max / 4))}>
                      <div id="textCount">{rank[5].count} 개</div>
                      <img src={planet5} alt="행성" id="P_planet" />
                      <h5>{rank[5].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[6] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[6].count / (max / 4))}>
                      <div id="textCount">{rank[6].count} 개</div>
                      <img src={planet6} alt="행성" id="P_planet" />
                      <h5>{rank[6].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[7] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[7].count / (max / 4))}>
                      <div id="textCount">{rank[7].count} 개</div>
                      <img src={planet7} alt="행성" id="P_planet" />
                      <h5>{rank[7].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
                {rank[8] ? (
                  <SwiperSlide>
                    <Planet count={parseInt(rank[8].count / (max / 4))}>
                      <div id="textCount">{rank[8].count} 개</div>
                      <img src={planet8} alt="행성" id="P_planet" />
                      <h5>{rank[8].space}</h5>
                    </Planet>
                  </SwiperSlide>
                ) : null}
              </div>
            </Swiper>
          </div>
        </StyledWrapper>
      );
    }
  } else {
    return (
      <StyledWrapper>
        <h3 id="title">{prop.userName}님이 먹은 술은 여기에서 왔어요! </h3>
        <div id="main2">
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={2}
            navigation
            height={500}
          >
            <div id="space">
              <div id="reviewnull">등록된 술이 없습니다.😥</div>
            </div>
          </Swiper>
        </div>
      </StyledWrapper>
    );
  }
}

const Earth = styled.div`
  #P_earth {
    width: ${props =>
      props.count !== 0
        ? props.count !== 1
          ? props.count !== 2
            ? props.count !== 3
              ? "260px"
              : "210px"
            : "160px"
          : "130px"
        : "100px"};
  }

  display: inline-block;
  color: white;
  margin-left: 10px;
  margin-right: 10px;

  h5 {
    text-align: center;
    margin-top: 10px;
  }

  :hover {
    transform: scale(1.2);
  }
`;

const Planet = styled.div`
  #P_planet {
    width: ${props =>
      props.count !== 0
        ? props.count !== 1
          ? props.count !== 2
            ? props.count !== 3
              ? "260px"
              : "210px"
            : "160px"
          : "130px"
        : "100px"};
  }

  display: inline-block;
  color: white;
  h5 {
    text-align: center;
    margin-top: 10px;
  }
  :hover {
    transform: scale(1.2);
  }
`;

const StyledWrapper = styled.div`
  #main2 {
    margin-top: 60px;
    margin-bottom: 40px;
    width: 1300px;
    height: 530px;
    background-image: url("${space}");
    background-size: 100% 100%;

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

    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #title {
    text-align: left;
    margin-left: 30px;
    margin-top: 110px;
    margin-bottom: -130px;
    color: white;
  }

  #space {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 400px;
  }

  .swiper-wrapper {
    align-items: center;
    width: 1300px;
  }
  .swiper-wrapper {
    margin-top: 60px;
    margin-bottom: 30px;
  }

  #reviewnull {
    color: white;
    font-size: 40px;
    margin-top: -50px;
  }
`;
