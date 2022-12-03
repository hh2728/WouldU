import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { join } from "../../api/userAPI";
import Nav from "components/nav/Nav";

export default function JoinQ() {
  const navigate = useNavigate();
  // 전체 응답 저장용
  const [reply, setReply] = useState([]);
  //문항마다 저장
  const [Q1, setQ1] = useState(false);
  const [Q2, setQ2] = useState(false);
  const [Q3, setQ3] = useState(false);
  const [Q4, setQ4] = useState(false);
  const [Q5, setQ5] = useState(false);
  const [Q6, setQ6] = useState(false);
  const [Q7, setQ7] = useState(false);
  const [Q8, setQ8] = useState(false);
  const [Q9, setQ9] = useState(false);
  const [Q10, setQ10] = useState(false);

  //step1에서 데이터 전해주기 위한 것
  const location = useLocation();

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (
      Q1 !== false &&
      Q2 !== false &&
      Q3 !== false &&
      Q4 !== false &&
      Q5 !== false &&
      Q6 !== false &&
      Q7 !== false &&
      Q8 !== false &&
      Q9 !== false &&
      Q10 !== false
    ) {
      setDisable(true);
    }
  }, [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10]);

  //데이터 조작
  const handleQ1 = e => {
    setQ1(e.target.value);
  };
  const handleQ2 = e => {
    setQ2(e.target.value);
  };
  const handleQ3 = e => {
    setQ3(e.target.value);
  };
  const handleQ4 = e => {
    setQ4(e.target.value);
  };
  const handleQ5 = e => {
    setQ5(e.target.value);
  };
  const handleQ6 = e => {
    setQ6(e.target.value);
  };
  const handleQ7 = e => {
    setQ7(e.target.value);
  };
  const handleQ8 = e => {
    setQ8(e.target.value);
  };
  const handleQ9 = e => {
    setQ9(e.target.value);
  };
  const handleQ10 = e => {
    setQ10(e.target.value);
  };
  const handelReply = () => {
    setReply(reply.push(Q1));
    setReply(reply.push(Q2));
    setReply(reply.push(Q3));
    setReply(reply.push(Q4));
    setReply(reply.push(Q5));
    setReply(reply.push(Q6));
    setReply(reply.push(Q7));
    setReply(reply.push(Q8));
    setReply(reply.push(Q9));
    setReply(reply.push(Q10));
  };

  const onClickJoin = event => {
    handelReply();
    let data = {
      user_id: location.state.user_id,
      password: location.state.password,
      nickname: location.state.nickname,
      gender: location.state.gender,
      birth: location.state.birth,
      reply_list: reply,
    };

    // 회원가입 axios 부분
    let swal_text = "";

    join(data)
      .then(res => {
        if (res.result === "success") {
          if (res.user_kind[0] === "K1") {
            swal_text =
              "혼자서 맛있는 술을 공략하시는 군요? 😎\n맛있는 술은 유저들과 공유하면 더 맛있어진대요!";
          } else if (res.user_kind[0] === "K2") {
            swal_text =
              "소수로 많은 술을 접하신 여러분의 경험이 필요합니다! 😎\n경험을 나누면 술 맛이 두배!";
          } else if (res.user_kind[0] === "K3") {
            swal_text =
              "많은 사람에게 맛있는 술을 전도하는 당신! 😎\n유저들과 경험을 공유해보는건 어떨까요?";
          } else {
            swal_text =
              "사람과 모든 술을 좋아하는 당신! 😎\n더 맛있는 술을 찾아 함께 떠나볼까요?";
          }
          swal({
            confirmButtonColor: "#fe8f34",
            title: res.user_kind[1] + " 유형",
            text: swal_text,
            icon: "success",
            buttons: {
              confirm: {
                text: "로그인",
                className: "confirmBtn",
              },
            },
          }).then(() => {
            navigate("/login", { state: { fromjoin: true } });
          });
        } else {
          swal("Fail!", "회원가입에 실패하였습니다", "error");
        }
      })
      .catch(err => {
        // console.log(err);
      });
  };

  return (
    <StyledWrapper>
      <Nav />
      <div id="bigdiv">
        <div id="main">
          <h2>&lt;음주유형검사&gt;</h2>
          <div id="surveyForm">
            <div id="surveyBox">
              {/*---1번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q1. 나는 조용하게 먹는것이 좋다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q1}
                    onChange={handleQ1}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---2번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q2. 나는 나만의 향수가 3개 이상 있다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q2}
                    onChange={handleQ2}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---3번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q3. 나는 낯을 많이 가린다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q3}
                    onChange={handleQ3}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---4번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q4. 나는 디퓨저를 사용중이다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q4}
                    onChange={handleQ4}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---5번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q5. 나는 친구들과 약속후에 다음날은 쉰다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q5}
                    onChange={handleQ5}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---6번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q6. 나는 맛집을 5군데 이상 알고있다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q6}
                    onChange={handleQ6}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---7번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q7. 나는 사람들과 대화하는 게 어렵다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q7}
                    onChange={handleQ7}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---8번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q8. 누군가를 처음 만났을 때, 향기가 났으면 좋겠다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q8}
                    onChange={handleQ8}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---9번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q9. 나는 대화를 먼저 시작하는 편이 아니다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q9}
                    onChange={handleQ9}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/*---10번 질문---*/}
              <div>
                <FormControl id="surveyItem">
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    color="warning"
                  >
                    <h5>Q10. 나는 새로운 음식을 즐기는 편이다.</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    id="radioGroup"
                    value={Q10}
                    onChange={handleQ10}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="warning" />}
                      label="예"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="warning" />}
                      label="아니요"
                      id="radioNo"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {disable ? (
                <div onClick={onClickJoin}>
                  <div id="btBox">
                    <Button variant="contained" id="btn_join">
                      회원가입
                    </Button>
                  </div>
                </div>
              ) : (
                <div id="btBox">
                  <Button variant="contained" id="btn_join1" disabled>
                    회원가입
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  h2 {
    margin-top: 30px;
  }
  h5 {
    font-family: "GD";
  }
  a {
    text-decoration: none;
  }
  #bigdiv {
    display: flex;
    justify-content: center;
  }
  #main {
    text-align: center;
    min-width: 600px;
    width: 40vw;
    margin: 10px;
    padding: 10px;
    border-style: solid;
    border-width: 2px;
    font-family: "GD";
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;

    flex-direction: column;
    background-color: #fcf8e8;

    justify-content: center;
    align-items: center;
  }

  #radioGroup {
    margin: auto;
  }

  #surveyItem {
    margin-top: 30px;
  }

  #radioNo {
    margin-left: 30px;
    margin-right: 0px;
  }

  #inputBox {
    width: 300px;
  }

  #btn_join {
    width: 170px;
    border: solid #dbc8ac;
    border-radius: 10px;
    color: white;
    font-size: 24px;
    font-family: "GD";
    background-color: #fe8f34;
  }

  #btn_join1 {
    width: 170px;
    font-size: 24px;
    font-family: "GD";
    color: white;
    border: solid #dbc8ac;
    border-radius: 10px;
    background-color: #d8d8d8;
  }

  #btBox {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  #btBox a {
    text-decoration: none;
  }

  .MuiTypography-root {
    font-family: "GD";
  }

  #surveyBox div div label {
    word-break: keep-all;
  }

  .confirmBtn {
    background-color: #fe8f34;
  }
`;
