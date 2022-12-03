import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "components/nav/Header";
//import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AlcholData from "components/rating/AlcholData";
import StarComment from "components/rating/StarComment";

//import axios from "axios";

/**
 * 전에 먹은 술 등록하는 페이지 (평점,한줄평)
 *  검색 추가해야함 , 입력 완료후 post보내야함
 * @returns
 */

export default function ReviewBefore() {
  const [sul, setSul] = useState({});
  //평가
  const [value, setValue] = useState(3);
  //한줄평
  const [comment, setComment] = useState("");

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
    // console.log(comment);
  };

  const onClickD = () => {
    setSul({});
  };

  const onChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeComment = event => {
    setComment(event.target.value);
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
