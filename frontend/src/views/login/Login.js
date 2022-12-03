import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "components/nav/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import logo2 from "assets/img/logo2.png";
import Card from "@mui/material/Card";
import { login } from "../../api/userAPI";
import Nav from "components/nav/Nav";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = e => {
    setInputId(e.target.value);
  };

  const handleInputPw = e => {
    setInputPw(e.target.value);
  };

  async function onClickLogin(event) {
    if (inputId !== "") {
      if (inputPw !== "") {
        const data = {
          user_id: inputId,
          password: inputPw,
        };
        login(data).then(res => {
          if (res.result === "success") {
            sessionStorage.setItem("ID", inputId);
            sessionStorage.setItem("no", res.user_no);
            sessionStorage.setItem("Nick", res.nickname);

            if (location.state !== null) {
              navigate("/");
            } else {
              navigate(-1);
            }
          } else {
            swal("Error!", "아이디 또는 비밀번호 오류입니다.", "error");
          }
        });
      } else {
        swal("Error!", "비밀번호를 입력해주세요!!", "error");
      }
    } else {
      swal("Error!", "아이디를 입력해주세요!!", "error");
    }
  }

  return (
    <StyledWrapper>
      <Nav />
      <div id="main">
        <Card variant="outlined" sx={{ width: 1300, mt: 10 }}>
          <img src={logo2} alt="logo"></img>
          <div id="loginForm">
            <div id="loginBox">
              <div id="inputH">
                <div>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={inputId}
                    onChange={handleInputId}
                    id="input_area"
                    placeholder="아이디"
                  />
                </div>
              </div>

              <div id="inputBox">
                <div>
                  <TextField
                    autoComplete="current-password"
                    type="password"
                    variant="outlined"
                    value={inputPw}
                    onChange={handleInputPw}
                    size="small"
                    id="input_area2"
                    placeholder="비밀번호"
                  />
                </div>
              </div>

              <div id="btBox">
                <Button
                  id="btn_login"
                  variant="contained"
                  onClick={onClickLogin}
                >
                  로그인
                </Button>
              </div>
              <div id="textJoin">
                <Link to="/join">
                  <div id="h_join">회원가입</div>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: #fcfcfc;
  height: 100vh;
  #main {
    height: 78vh;
    display: flex;
    text-align: center;
    flex-direction: column-reverse;
    justify-content: center;
  }

  #main .MuiCard-root {
    margin: 0 auto;
    width: 1200px;
    font-family: "GD";
    border-color: #363636;
    border-style: solid;
    border-width: 2px;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #FCF8E8;
  }

  #main img {
    width: 500px;
  }

  #main h2 {
    margin-top: 50px;
  }
  #loginForm {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 50px 50px;
  }

  #loginBox {
    width: 450px;
    display: inline-block;
    border: solid #EEE3CB;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F2F2F2;
  }

  #input_area {
    width: 250px;
    font-family: "GD";
  }

  #input_area2 {
    width: 250px;
    font-family: "GD";
  }

  #inputH {
    margin-top: 70px;
  }

  #inputBox {
    width: 300px;
    margin: 50px auto;
  }

  #btBox {
    margin: 10px 70px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #btBox button {
    margin-top: 0px;
    font-family: "GD";
    font-size: 16px;
  }

  #btn_login {
    margin-top: 20px;
    width: 280px;
    background-color: #5783B2;
  }

  #loginForm {
    display: inline-block;
    margin-top: 50px;
  }

  #textJoin {
    width: 280px;
    height: 36.5px;
    margin: 0px 70px 70px;
    background-color: #9DB7D2;
    color: white;
    display: inline-flex;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 16px;
    height: 40px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
  }
  #textJoin a{
    width: 100%;
  }

  #h_join {
    color: white;
  }
  a {
    text-decoration: none;
    color: white;
  }

  .MuiInputBase-input {
    font-family: "GD";
  }
`;

// p: 6px 16px 248*28
