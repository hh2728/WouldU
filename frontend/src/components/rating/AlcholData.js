import React from "react";
import styled from "@emotion/styled";
import ex from "assets/img/장수.jpg";

/**
 * 술 데이터 보여주는 컴포
 * @param {*} prop 술데이터 받아와야함
 * @returns
 */
export default function AlcholData(prop) {
  return (
    <StyledWrapper>
      <div>
        <div id="imgBox">
          <img src={ex} alt="술" id="img_sul" />
        </div>
        <div id="detailBox">
          <h5 id="text_sul">이름 : {prop.sul.alco_name}</h5>
          <h5 id="text_sul">주종 : {prop.sul.alco_code}</h5>
          <h5 id="text_sul">양조장 : {prop.sul.brewery}</h5>
          <h5 id="text_sul">특징 : {prop.sul.detail}</h5>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #imgBox {
    width: 400px;
    height: 400px;
    background: yellow;
    float: left;
  }
  #img_sul {
    margin: auto;
  }
  #detailBox {
    width: 400px;
    height: 400px;
    display: inline-block;
    background: pink;
  }
  #text_sul {
    text-align: left;
    margin: 20px;
  }
`;
