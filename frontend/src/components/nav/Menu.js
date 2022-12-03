import styled from "styled-components";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";

import loginImg from "assets/img/navbar/login_b.png";
import logoutImg from "assets/img/navbar/logout_b.png";
import mypageImg from "assets/img/navbar/mypage_b.png";
import recommendImg from "assets/img/navbar/recommend_b.png";
import searchImg from "assets/img/navbar/search_b.png";

/**
 * @todo sessionStorage에 logged로 로그인했는지 정보 저장할 것
 */
export default function Menu() {
  //const logged = window.sessionStorage.getItem("ID");
  const [logg, setlogg] = useState();

  useEffect(() => {
    setlogg(window.sessionStorage.getItem("ID"));
  }, []);
  const logout = () => {
    sessionStorage.clear();
    setlogg();
    window.location.replace("/");
    swal("logout!", "로그아웃 완료", "success");
  };
  
  return (
    <StyledWrapper>
      <div id="menubuttons">
        <Link to="/search" state={{ fromIndexQuery: "" }}>
          <img className="navBtn" src={searchImg} alt="searchImg" />
        </Link>
        <Link to="/recommend">
          <img className="navBtn" src={recommendImg} alt="recommendImg" />
        </Link>
        {logg ? (
          <>
            <Link to="/mypage">
              <img className="navBtn" src={mypageImg} alt="mypageImg" />
            </Link>
            <Link to="/">
              <img
                className="navBtn"
                src={logoutImg}
                alt="logoutImg"
                onClick={logout}
              />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <img className="navBtn" src={loginImg} alt="loginImg" />
          </Link>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: "GD";
  font-size: 24px;
  background-color: #f7ecde;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  #menubuttons {
    display: flex;
  }
  #menubuttons div {
    margin: 10px;
    border-radius: 10px;
  }
  #menubuttons div:hover {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.2) inset;
  }
  #menubuttons div a {
    padding: 5px 20px;
  }
`;
