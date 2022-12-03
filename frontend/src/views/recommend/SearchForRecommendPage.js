import styled from "styled-components";
import SearchBar from "components/search/SearchBar";
import SearchResult from "components/recommend/SearchResult";
import ReviewForRecommend from "components/recommend/ReviewForRecommend";
import rocketicon from "assets/img/rocketicon.png";
import mousepointer from "assets/img/mousepointer.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { search } from "../../api/searchAPI";
import Nav from "components/nav/Nav";

export default function SearchForRecommendPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [handleClick, setHandleClick] = useState(false);
  const [reviewTarget, setReviewTarget] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [params, setParams] = useState({
    name: "",
    sort: 1,
    page: 1,
    alcol_type: "",
  });

  useEffect(() => {
    // console.log(params);
    search(params).then(res => {
      setSearchData(res);

      // console.log(res);
    });
  }, [params]);

  return (
    <>
      <Nav />
      <StyledWrapper>
        <div id="background">
          <div id="searchforrecommendpageframe">
            {!handleClick ? (
              <>
                <div id="introducetotal">
                  <div id="introduceheader">
                    드셔보신 전통주를 찾아, 평가해주세요!
                  </div>
                  <div id="introducetext">
                    평가를 기반으로 추천받을 수도 있으며, "우주"유저들에게도
                    도움이 됩니다.
                  </div>
                </div>
                <SearchBar
                  params={params}
                  setParams={setParams}
                  setSearchData={setSearchData}
                />
                <SearchResult
                  searchData={searchData}
                  params={params}
                  setParams={setParams}
                  setHandleClick={setHandleClick}
                  setReviewTarget={setReviewTarget}
                />
              </>
            ) : (
              <ReviewForRecommend
                setHandleClick={setHandleClick}
                reviewTarget={reviewTarget}
              />
            )}
          </div>
          <div id="rocketframe">
            <Link to="/recommend">
              <img src={rocketicon} alt="로켓" />
              <div id="back">우주로 돌아가기</div>
            </Link>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  height: 105vh;
  font-family: "GD";

  #background {
    height: 100%;
  }
  #searchforrecommendpageframe {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #introducetotal {
    margin-top: 30px;
    text-align: center;
  }
  #introduceheader {
    font-size: 28px;
  }
  #introducetext {
    font-size: 20px;
  }
  #rocketframe {
    position: fixed;
    cursor: url(${mousepointer}) 50 50, auto;
    left: 0vw;
    bottom: 5%;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #rocketframe > a {
    cursor: url(${mousepointer}) 50 50, auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
  #rocketframe:hover {
    cursor: url(${mousepointer}) 50 50, auto;
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
  }
  #rocketframe img {
    cursor: url(${mousepointer}) 50 50, auto;
    width: 100px;
  }
  #rocketframe img:hover {
    cursor: url(${mousepointer}) 50 50, auto;
    width: 150px;
    height: 150px;
  }
  #back {
    cursor: url(${mousepointer}) 50 50, auto;
    font-family: "GD";
    font-size: 18px;
    color: white;
    background-color: #9db7d2;
    border: 3px solid #9db7d2;
    margin-top: 10px;
    border-radius: 10px;
    display: inline-block;
    width: 140px;
    text-align: center;
  }
`;
