import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "components/nav/Header";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import SelectType from "components/search/SelectType";
import ResultFiltering from "components/recommend/ResultFiltering";
import recommendbackground from "assets/img/recommendbackground.jpg";
import filteringpageicon from "assets/img/filteringpageicon.png";
import rocketicon from "assets/img/rocketicon.png";
import { Link } from "react-router-dom";
import mousepointer from "assets/img/mousepointer.png";
import Nav from "components/nav/Nav";

//import axios from "axios";

/**
 * 신맛,단맛,바디감,향, 도수로 검색하는 페이지
 * post 연결해야함
 * @returns
 */
export default function BasedonFilteringPage() {
  const [sweet, setSweet] = useState(3);
  const [sour, setSour] = useState(3);
  const [body, setBody] = useState(3);
  const [smell, setSmell] = useState(3);
  const [value, setValue] = useState([0, 50]);
  const [goToResult, setGoToResult] = useState(false);
  // SelectType Text  
  const [selectText, setSelectText] = useState({
    handle1Text : ["쓴맛이 좋아요!", "단맛이 좋아요!"],
    handle2Text : ["신맛은 싫어요!", "셔야 맛이죠!"],
    handle3Text : ["아주 가볍게!", "아주 무겁게!"],
    handle4Text : ["약한 향!", "강한 향!"],
  });

  const onClick = () => {
    setGoToResult(true);
  };

  const alcohol = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 41,
      label: "40도 이상",
    },
  ];

  const handleChange1 = (event, newValue) => {
    setSweet(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setSour(newValue);
  };
  const handleChange3 = (event, newValue) => {
    setBody(newValue);
  };
  const handleChange4 = (event, newValue) => {
    setSmell(newValue);
  };

  //도수
  const handleChange5 = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <StyledWrapper>
      {!goToResult ? (
        <div id="backgroundimage">
          <div id="main">
            <div id="introduce-frame">
              <div id="introduce-text">
                "원하시는 전통주의
                <br />
                느낌을 말해주세요!"
              </div>
              <div id="introduce-empty" />
            </div>
            <div id="searchForm">
              <SelectType
                handleChange1={handleChange1}
                handleChange2={handleChange2}
                handleChange3={handleChange3}
                handleChange4={handleChange4}
                selectText={selectText}
              />
              <div>
                <h5 id="textSub">&lt;도수&gt;</h5>
                <Box sx={{ width: 400 }} id="slider">
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    getAriaValueText={valuetext}
                    onChange={handleChange5}
                    valueLabelDisplay="auto"
                    marks={alcohol}
                    min={0}
                    max={41}
                    color="secondary"
                  />
                </Box>
              </div>
              <div id="btBox">
                <Button
                  type="button"
                  id="btn_search"
                  variant="contained"
                  onClick={onClick}
                  color="secondary"
                >
                  검색
                </Button>
              </div>
            </div>
          </div>
          <div id="rocketframe">
            <Link to="/recommend">
              <img src={rocketicon} alt="로켓" />
              <div id="back">돌아가기</div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Nav />
          <ResultFiltering
            setGoToResult={setGoToResult}
            sweet={sweet}
            sour={sour}
            body={body}
            smell={smell}
            value={value}
          />
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: "GD";
  #backgroundimage {
    cursor: url(${mousepointer}) 50 50, auto;
    background-image: url(${recommendbackground});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
  }
  #main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #introduce-frame {
    background-image: url(${filteringpageicon});
    background-repeat: no-repeat;
    background-size: cover;
    width: 650px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
  }
  #introduce-text {
    font-family: "Jua";
    font-size: 36px;
    text-align: center;
  }
  #introduce-empty {
    width: 280px;
  }
  #searchForm {
    cursor: auto;
    margin: auto;
    margin-bottom: 30px;
    width: 600px;
    height: auto;
    border: 5px dashed #ffae6d;
    background-color: #f3e0b5;
    border-radius: 10px;
  }
  #textSub {
    text-align: left;
    width: 100px;
    margin-left: 50px;
    margin-top: 25px;
    margin-bottom: 5px;
    font-family: "Jua";
    font-size: 24px;
  }
  #slider {
    margin: auto;
  }
  #btn_search {
    margin-top: 60px;
  }
  #btBox {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 10px;
  }
  #btBox button {
    margin-top: 20px;
  }

  .MuiSlider-markLabel {
    font-family: "GD";
    font-size: 16px;
  }
  .MuiSlider-rail {
    color: #319da0;
  }
  .MuiSlider-track {
    color: #256d85;
  }
  .MuiSlider-thumb {
    color: #1f4690;
  }
  .MuiButtonBase-root {
    background-color: #ffa500;
    font-family: "Jua";
    font-size: 24px;
    margin-top: 20px;
  }

  #rocketframe {
    cursor: url(${mousepointer}) 50 50, auto;
    position: fixed;
    top: 74vh;
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
  #back {
    cursor: url(${mousepointer}) 50 50, auto;
    font-family: "GD";
    font-size: 18px;
    color: white;
    background-color: #9db7d2;
    margin-top: 10px;
    border-radius: 10px;
    display: inline-block;
    width: 90px;
    text-align: center;
  }
`;
