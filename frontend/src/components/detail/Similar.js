import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards, Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

export default function Similar({ alcohol, similar }) {
  const navigate = useNavigate();

  const clickSlmilar = item => {
    navigate("/detail/" + item.alcohol_no);
  };

  return (
    <StyledWrapper>
      <div id="similarframe">
        <div id="similartitle">"{alcohol.alco_name}"와(과) 유사한 전통주</div>
        <div id="similarlist">
          <Swiper
            effect={"cards"}
            navigation={true}
            // grabCursor={true}
            modules={[EffectCards, Autoplay, Navigation]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {similar &&
              similar.slice(0, 6).map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    id="similar"
                    onClick={() => {
                      clickSlmilar(item);
                    }}
                  >
                    <img
                      id="img-sool"
                      src={item.alcohol_image}
                      alt={item.alcohol_name}
                    />
                    <div id="name-sool">{item.alcohol_name}</div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "GD";

  #similarframe {
    margin: 10px 0px;
  }

  #similartitle {
    font-size: 24px;
    margin: 10px;
    word-break: keep-all;
    text-align: center;
  }

  #similar {
    cursor: pointer;
    width: 100%;
    height: 100%;
    max-width: 230px;
    max-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: solid #8bbccc;
    border-radius: 10px;
  }
  #img-sool {
    width: 224px;
    height: 224px;
    margin: auto;
    object-fit: contain;
    border-radius: 10px;
  }
  #name-sool {
    text-align: center;
    margin: 10px;
    font-size: 18px;
    word-break: keep-all;
  }

  .swiper {
    width: 240px;
    height: 320px;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
  }

  .swiper-button-prev,
  .swiper-rtl .swiper-button-next {
    left: -70px;
  }

  .swiper-button-next,
  .swiper-rtl .swiper-button-prev {
    right: -70px;
  }
`;
