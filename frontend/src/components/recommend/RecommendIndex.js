import styled from "styled-components";
import planet4 from "assets/img/planet4.png";
import planet3 from "assets/img/planet3.png";
import planet2 from "assets/img/planet2.png";
import mousepointer from "assets/img/mousepointer.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Grid } from "@mui/material";

/**
 * 리뷰를 한번도 하지 않은 유저에게는 '평가'만 활성화하여 보여지고, 안내 문구도 같이 출력해야 함
 */
export default function RecommendIndex() {
  const navigate = useNavigate();
  const [user_no, setno] = useState();
  useEffect(() => {
    setno(window.sessionStorage.getItem("no"));
  }, []);

  const sfr = () => {
    if (user_no === null) {
      swal("앗!", "로그인이 필요한 서비스입니다.", "info");
    } else {
      navigate("/recommend/search-for-recommend");
    }
  };
  const boe = () => {
    if (user_no === null) {
      swal("앗!", "로그인이 필요한 서비스입니다.", "info");
    } else {
      navigate("/recommend/based-on-evaluation");
    }
  };
  return (
    <StyledWrapper>
      <Grid container columnGap={15}>
        <Grid item xs>
          <div id="mars" onClick={boe}>
            <img src={planet2} alt="화성" />
            <div id="text">추천 받으러 가는 행성</div>
          </div>
        </Grid>
        <Grid item xs>
          <div id="jupiter" onClick={sfr}>
            <img src={planet4} alt="목성" />
            <div id="text">전통주 평가하는 행성</div>
          </div>
        </Grid>
        <Grid item xs>
          <div id="saturn">
            <Link to="/recommend/based-on-filtering">
              <img src={planet3} alt="토성" />
              <div id="text">간단히 추천해주는 행성</div>
            </Link>
          </div>
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  img {
    width: 200px;
    height: 200px;
  }
  img:hover {
    width: 250px;
    height: 250px;
  }
  #mars {
    height: 350px;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #mars:hover {
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
  }
  #jupiter {
    height: 350px;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #jupiter:hover {
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
  }
  #saturn {
    height: 350px;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #saturn:hover {
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
  }
  a {
    cursor: url(${mousepointer}) 50 50, auto;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #text {
    font-family: "GD";
    font-size: 28px;
    color: #293462;
    background-color: #ffdfaf;
    margin-top: 15px;
    border-radius: 10px;
    border: 3px solid #f2bb7b;
    display: inline-block;
    width: 300px;
    text-align: center;
  }
`;
