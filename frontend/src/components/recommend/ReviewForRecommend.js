import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import StarComment from "components/rating/StarComment";
import { useEffect } from "react";
import { getRecord, makeRecord } from "api/recommendAPI";
import swal from "sweetalert";
import closeicon from "assets/img/closeicon.png";
import { Box, Grid } from "@mui/material";

export default function ReviewForRecommend(props) {
  const { setHandleClick, reviewTarget } = props;
  //평가
  const [value, setValue] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getRecord(reviewTarget.alcohol_no).then(res => {
      if (res.score !== 0) {
        setUpdate(true);
        setValue(res.score);
      }
    });
  }, []);

  const onClick = () => {
    const data = {
      alcohol_no: reviewTarget.alcohol_no,
      score: value,
      update: update,
    };

    makeRecord(data).then(res => {
      if (res.status === 201) {
        swal("완료!", "성공적으로 평점을 기록했어요👏", "success").then(() =>
          setHandleClick(false),
        );
      } else {
        swal("실패!", "평점 기록에 실패했어요😥", "error");
      }
    });
  };

  const goBack = () => {
    setHandleClick(false);
  };

  const onChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledWrapper>
      <div id="main">
        <img id="closeicon" src={closeicon} alt="창 닫기" onClick={goBack} />
        <Box sx={{ display: "flex" }}>
          <img src={reviewTarget.alcohol_image} alt="술" id="img_sul" />
          <Box>
            <Grid>
              <div id="detailBox">
                <Grid>
                  <div id="main-title-text">&lt; 전통주 평가 &gt;</div>
                  <h5 id="text_title">이름 : {reviewTarget.alcohol_name}</h5>
                  {/* <h5 id="text_sul">주종 : {reviewTarget.type}</h5> */}
                  <h5 id="text_sul">양조장 : {reviewTarget.brewery}</h5>
                </Grid>
                <Grid>
                  <StarComment
                    value={value}
                    onChangeValue={onChangeValue}
                    type="recommend"
                  />
                  <div id="btBox">
                    <Button
                      type="button"
                      id="btn_search"
                      variant="contained"
                      onClick={onClick}
                      color="secondary"
                    >
                      평가 보내기
                    </Button>
                  </div>
                </Grid>
              </div>
            </Grid>
          </Box>
        </Box>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  text-align: end;
  #main {
    position: absolute;
    z-index: 3;
    // margin: 10vh 0 15vh;
    padding: 30px 30px 30px 0;
    background-color: white;
    border: 2px solid #d8d8d8;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-family: "GD";
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: visible;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  #main-title-text {
    font-size: 36px;
    margin-bottom: 20px;
    margin-right: 20px;
  }
  #closeicon {
    cursor: pointer;
    width: 50px;
    height: 50px;
    position: absolute;
    right: 5px;
    top: 2px;
    z-index: 2;
  }
  #btn_search {
    width: 150px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  #img_sul {
    width: auto;
    height: auto;
    min-width: 150px;
    max-width: 300px;
    max-height: 300px;
    object-fit: contain;
    border-radius: 10px;
    border: 2px solid #020715;
    background-color: white;
    transform: translate(-40%, 0);
  }
  #detailBox {
    // width: 400px;
    // height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 7px;
  }
  #text_title {
    margin: 10px 20px;
    font-size: 24px;
  }
  #text_sul {
    margin: 10px 20px;
    font-size: 20px;
  }

  .MuiButtonBase-root {
    background-color: #fa7070;
    font-family: "GD";
    font-size: 24px;
    color: #fbf2cf;
  }

  #starBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  #btBox {
    display: flex;
    justify-content: center;
  }

  #rating-title {
    margin-right: 0.8rem;
  }
`;
