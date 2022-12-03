import styled from "styled-components";
import * as React from "react";
import RecommendIndex from "components/recommend/RecommendIndex";
import recommendbackground from "assets/img/recommendbackground.jpg";
import { Link } from "react-router-dom";
import earth from "assets/img/earth.png";
import mousepointer from "assets/img/mousepointer.png";
import rocketicon from "assets/img/rocketicon.png";
export default function RecommendPage() {
  return (
    <StyledWrapper>
      <RecommendIndex />
      <div id="earth">
        <Link to="/">
          <img src={earth} alt="지구" />
          <div id="back">돌아가기</div>
        </Link>
      </div>
      {sessionStorage.getItem("no") ? null : (
        <div id="rocketframe">
          <Link to="/login">
            <img src={rocketicon} alt="로켓" />
            <div id="back">로그인</div>
          </Link>
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  cursor: url(${mousepointer}) 50 50, auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url(${recommendbackground});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;

  #earth {
    position: fixed;
    bottom: 5%;
    left: 0vw;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #earth:hover {
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
  }
  #earth img {
    width: 100px;
  }
  #earth img:hover {
    width: 150px;
    height: 150px;
  }
  #rocketframe {
    cursor: url(${mousepointer}) 50 50, auto;
    position: fixed;
    bottom: 5%;
    right: 0vw;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #rocketframe > a {
    cursor: url(${mousepointer}) 50 50, auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
  #rocketframe:hover {
    cursor: url(${mousepointer}) 50 50, auto;
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
  }
  #rocketframe img {
    cursor: url(${mousepointer}) 50 50, auto;
    width: 100px;
  }
  #rocketframe img:hover {
    cursor: url(${mousepointer}) 50 50, auto;
    width: 150px;
    height: 150px;
  }

  a {
    cursor: url(${mousepointer}) 50 50, auto;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #back {
    font-family: "GD";
    font-size: 18px;
    color: white;
    background-color: #9db7d2;
    border: 3px solid #9db7d2;
    margin-top: 10px;
    border-radius: 10px;
    display: inline-block;
    width: 90px;
    text-align: center;
  }
`;
