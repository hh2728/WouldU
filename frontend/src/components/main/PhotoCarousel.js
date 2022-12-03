import React from "react";
import carousel_element1 from "assets/img/carousel/text_carousel_element1.png";
import carousel_element2 from "assets/img/carousel/text_carousel_element2.png";
import carousel_element3 from "assets/img/carousel/text_carousel_element3.png";
import styled from "styled-components";

import Carousel from "react-bootstrap/Carousel";

export default function PhotoCarousel() {
  return (
    <StyledWrapper>
      <Carousel
        id="carousel"
        fade
        controls={false}
        indicators={false}
        pause={false}
        interval={4000}
      >
        {/* <Carousel.Item id="carousel-item">
          <img
            id="carousel-img"
            className="d-block w-100"
            src={carousel_element5}
            alt="First slide"
          />
        </Carousel.Item> */}
        <Carousel.Item>
          <img
            id="carousel-img"
            className="d-block w-100"
            src={carousel_element1}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            id="carousel-img"
            className="d-block w-100"
            src={carousel_element2}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            id="carousel-img"
            className="d-block w-100"
            src={carousel_element3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    margin: 0px 0px 20px;
  }
  .carousel-inner {
    height: 700px;
  }
  .carousel-item {
  }
  .carousel-inner img {
    height: 700px;
    object-fit: cover;
  }
  div.active {
  }
`;
