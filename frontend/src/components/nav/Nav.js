import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";

import logo2 from "assets/img/logo2.png";

export default function Nav(props) {
  //const logged = window.sessionStorage.getItem("ID");
  const [logg, setlogg] = useState();

  useEffect(() => {
    setlogg(window.sessionStorage.getItem("ID"));
    // position 동적으로 변경
    if (props?.type === "main") {
      document.getElementById("container").style.position = "absolute";
      document.getElementById("container").style.justifyContent = "flex-end";
    } else {
      document.getElementById("container").style.position = "relative";
      document.getElementById("container").style.justifyContent =
        "space-between";
    }
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setlogg();
    window.location.replace("/");
    swal("logout!", "로그아웃 완료", "success");
  };

  // 버튼 세팅
  function mapping(param) {
    const res = {
      login: require(`assets/img/navbar/login_${param}.png`),
      logout: require(`assets/img/navbar/logout_${param}.png`),
      search: require(`assets/img/navbar/search_${param}.png`),
      recommend: require(`assets/img/navbar/recommend_${param}.png`),
      mypage: require(`assets/img/navbar/mypage_${param}.png`),
    };
    return res;
  }

  let btns = {};
  if (props?.type === "main") {
    btns = mapping("w");
  } else {
    btns = mapping("b");
  }

  return (
    <StyledWrapper>
      <div id="container">
        {props?.type === "main" ? null : (
          <Link to="/">
            <div id="logo">
              <img id="logo-image" src={logo2} alt="logo" />
            </div>
          </Link>
        )}
        <div id="menubuttons">
          <Link to="/search" state={{ fromIndexQuery: "" }}>
            <img className="navBtn" src={btns.search} alt="searchImg" />
          </Link>
          <Link to="/recommend">
            <img className="navBtn" src={btns.recommend} alt="recommendImg" />
          </Link>
          {logg ? (
            <>
              <Link to="/mypage">
                <img className="navBtn" src={btns.mypage} alt="mypageImg" />
              </Link>
              <Link to="/">
                <img
                  className="navBtn"
                  src={btns.logout}
                  alt="logoutImg"
                  onClick={logout}
                />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <img className="navBtn" src={btns.login} alt="loginImg" />
            </Link>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "GD";
  font-size: 24px;
  align-items: center;
  text-align: center;
  justify-content: center;

  #container {
    top: 0px;
    z-index: 3;
    min-width: 1200px;
    width: 80%;
    height: 100px;
    position: absolute;
    display: flex;
    align-items: center;
    margin: 5px 0px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  #logo {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  #logo-image {
    width: 150px;
    height: 100px;
  }

  .navBtn {
    padding: 5px 15px;
    border-radius: 10px;
  }
  .navBtn:hover {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.3) inset;
  }
`;
