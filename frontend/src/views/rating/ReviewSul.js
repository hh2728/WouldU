import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "components/nav/Header";
//import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AlcholData from "components/rating/AlcholData";
import StarComment from "components/rating/StarComment";
import SelectType from "components/search/SelectType";

//import axios from "axios";

/**
 * 먹고나서 등록하는 페이지 (신맛,단맛,향,바디감,평점,한줄평)
 * 검색부분, post연결해야함
 * @returns
 */
export default function ReviewBefore() {
  //술선택
  const [sul, setSul] = useState({});
  //평가
  const [value, setValue] = useState(3);
  //한줄평
  const [comment, setComment] = useState("");
  //맛선택
  const [sweet, setSweet] = useState(3);
  const [sour, setSour] = useState(3);
  const [body, setBody] = useState(3);
  const [smell, setSmell] = useState(3);

  const handleChange = (event, newValue) => {
    setSweet(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setSour(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setBody(newValue);
  };
  const handleChange3 = (event, newValue) => {
    setSmell(newValue);
  };

  const onChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeComment = event => {
    setComment(event.target.value);
  };

  useEffect(() => {
    setSul({
      alco_name: "장수막걸리",
      alco_code: "탁주",
      brewery: "서울장수주식회사",
      detail:
        "국내산 백미를 사용해 장기저온숙성 방식으로 만들어져 영양이 풍부하고 자연발효에 의한 탄산과 어울려 감칠맛과 청량감이 일품입니다. 또한, 트림과 숙취도 거의 없어 오랜 시간 동안 사랑을 받고 있습니다.",
      alco_img: "",
    });
  }, []);

  const onClick = () => {
    // console.log(sweet);
    // console.log(sour);
    // console.log(body);
    // console.log(smell);
    // console.log(value);
    // console.log(comment);
  };

  const onClickD = () => {
    setSul({});
  };

  return (
    <StyledWrapper>
      <Header />
      <div id="main">
        <h2>술평가</h2>
        <div id="ratingForm">
          <div>
            <Button
              type="button"
              id="btn_delete"
              variant="contained"
              onClick={onClickD}
              color="error"
            >
              취소
            </Button>
            <AlcholData sul={sul} />
          </div>
          <div>
            <SelectType
              handleChange={handleChange}
              handleChange1={handleChange1}
              handleChange2={handleChange2}
              handleChange3={handleChange3}
            />
          </div>
          <div>
            <StarComment
              value={value}
              onChangeValue={onChangeValue}
              comment={comment}
              onChangeComment={onChangeComment}
            />
          </div>

          <div id="btBox">
            <Button
              type="button"
              id="btn_search"
              variant="contained"
              onClick={onClick}
              color="secondary"
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #main {
    text-align: center;
  }
  #ratingForm {
    display: inline-block;
    margin: auto;
    border: 1px solid;
    margin-bottom: 20px;
  }

  #btn_search {
    width: 150px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  #btn_delete {
    float: right;
    margin-bottom: -50px;
  }
`;
