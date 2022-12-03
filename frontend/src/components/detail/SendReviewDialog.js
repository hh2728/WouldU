import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import StarComment from "components/rating/StarComment";
import SelectType from "components/search/SelectType";
import swal from "sweetalert";
import Slide from "@mui/material/Slide";
import {
  alcoholreview,
  reviewalcohol,
  alcoholDetail,
} from "../../api/recommendAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/**
 * @todo 제출하기 버튼으로 제출할 수 있게 해야함
 */
export default function SendReviewDialog(props) {
  const { openReview, setOpenReview } = props;

  //평가
  const [value, setValue] = useState(0);
  //한줄평
  const [comment, setComment] = useState("");
  //맛선택
  const [sweet, setSweet] = useState(3);
  const [sour, setSour] = useState(3);
  const [body, setBody] = useState(3);
  const [smell, setSmell] = useState(3);
  // SelectType Text  
  const [selectText, setSelectText] = useState({
    handle1Text : ["써요!", "달아요!"],
    handle2Text : ["안셔요!", "셔요!"],
    handle3Text : ["가벼워요!", "무거워요!"],
    handle4Text : ["약한 향!", "강한 향!"],
  });

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

  const handleClose = () => {
    setOpenReview(false);
  };

  const handleOk = () => {
    if (value === 0 || value === null) {
      swal("Error!", "평점을 입력해주세요!", "info");
      //console.log(comment.trimStart().trimEnd());
    } else {
      if (comment.trimStart().trimEnd() === "") {
        swal("Error!", "다른 유저들을 위해 한줄평을 입력해주세요!", "info");
      } else {
        const data = {
          user_no: sessionStorage.getItem("no"),
          alcohol_no: props.alcohol.alco_no,
          score: value,
          comment: comment.trimStart().trimEnd(),
          sweet: sweet,
          sour: sour,
          scent: smell,
          body: body,
        };
        alcoholreview(data).then(res => {
          if (res === "success") {
            swal({
              title: "Thank you!",
              text: "리뷰 작성이 완료되었습니다.",
              icon: "success",
              button: {
                text: "확인",
              },
            });
            setOpenReview(false);
            reviewalcohol(props.alcohol.alco_no).then(res => {
              props.setReview(res);
            });
            alcoholDetail(props.alcohol.alco_no).then(res => {
              props.setAlcohol(res);
            });
          } else {
            swal("Error!", "리뷰 작성 실패!!", "error");
          }
        });
      }
    }
  };

  const onChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeComment = event => {
    setComment(event.target.value);
  };

  return (
    <Dialog
      maxWidth="md"
      TransitionComponent={Transition}
      keepMounted
      open={openReview}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <CustomStyle>
        <DialogTitle id="review-title-text">
          &lt; 리뷰 작성하기 &gt;
        </DialogTitle>
      </CustomStyle>
      <DialogContent id="scrollBar">
        <DialogContentText
          sx={{ fontFamily: "GD", fontSize: "18px", textAlign: "center" }}
        >
          "{props.alcohol.alco_name}"을(를) 마셔본 우주 유저의 경험은
          소중합니다.
        </DialogContentText>

        <StyledWrapper>
          <div id="main">
            <div>
              <SelectType
                handleChange1={handleChange1}
                handleChange2={handleChange2}
                handleChange3={handleChange3}
                handleChange4={handleChange4}
                selectText={selectText}
              />
            </div>
            <div id="text-font">
              <StarComment
                value={value}
                onChangeValue={onChangeValue}
                comment={comment}
                onChangeComment={onChangeComment}
              />
            </div>
          </div>
        </StyledWrapper>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOk}
          sx={{ fontFamily: "GD", color: "black", fontSize: "20px" }}
        >
          제출하기
        </Button>
        <Button
          onClick={handleClose}
          sx={{ fontFamily: "GD", color: "black", fontSize: "20px" }}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const StyledWrapper = styled.div`
  #main {
    text-align: center;
  }
  #ratingForm {
    display: flex;
    margin: 10px 0px 20px;
    border: 2px solid #abd9ff;
    border-radius: 7px;
    background-color: #d2daff;
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
  #imgBox {
    width: 200px;
    height: 200px;
    border: 0.2px solid #abd9ff;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  #imgBox img {
    width: 190px;
    height: 190px;
    margin: auto;
    object-fit: contain;
  }
  #detailBox {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #d2daff;
    border-radius: 7px;
  }
  #text_title {
    text-align: left;
    margin: 10px 20px;
    font-size: 24px;
    font-family: "GD";
  }
  #text_sul {
    text-align: left;
    margin: 10px 20px;
    font-size: 20px;
    font-family: "GD";
  }
  #text-font {
    font-family: "GD";
  }
`;

const CustomStyle = styled.div`
  text-align: center;
  .MuiTypography-root {
    font-family: "GD";
    font-size: 28px;
  }
`;
