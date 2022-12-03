import Element from "components/search/Element";
import { Link } from "react-router-dom";
import { onceRecom } from "api/recommendAPI";
import { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import filteringresulticon from "assets/img/filteringresulticon.png";
import mousepointer from "assets/img/mousepointer.png";

export default function ResultFiltering(props) {
  const [recomResults, setRecomResults] = useState({});
  const { setGoToResult, sweet, sour, body, smell, value } = props;

  const convertRange = num => {
    let res;

    if (num < 6) {
      res = 1;
    } else if (num < 11) {
      res = 2;
    } else if (num < 16) {
      res = 3;
    } else if (num < 21) {
      res = 4;
    } else if (num < 31) {
      res = 5;
    } else if (num < 41) {
      res = 6;
    } else {
      res = 7;
    }

    return res;
  };

  useEffect(() => {
    const low = convertRange(value[0]);
    const high = convertRange(value[1]);
    let convValue = Array(high - low + 1)
      .fill()
      .map((v, i) => i + low);

    // console.log(convValue);

    onceRecom({
      sweet: Number(sweet),
      sour: Number(sour),
      body: Number(body),
      scent: Number(smell),
      abv_level: convValue,
    }).then(res => {
      setRecomResults(res);
    });
  }, []);

  const setElement = e => {
    return (
      <Link to={"/detail/" + e.alcohol_no} key={`detail + ${e.alcohol_no}`}>
        <Element
          id={e.alcohol_no}
          img_link={e.alcohol_image}
          name={e.alcohol_name}
          brewery={e.brewery}
          ingredients={e.material}
          size={e.size}
          alcohol={e.abv}
          desc={e.detail}
          key={`${e.alcohol_no}`}
        />
      </Link>
    );
  };

  const inListItems = recomResults["in_alcohol_list"]?.map(item =>
    setElement(item),
  );
  const outListItems = recomResults["out_alcohol_list"]?.map(item =>
    setElement(item),
  );

  return (
    <StyledWrapper>
      <div id="background">
        <div id="resultfilteringpageframe">
          <div id="introdecutotal">
            {inListItems?.length > 0 ? (
              <div id="filteringresult-frame">
                <div id="introducetext">
                  😎 "우주"에서 회원님의 취향을 바탕으로 전통주를 선정해
                  보았어요!
                </div>
                <div id="filteringresult">{inListItems}</div>
              </div>
            ) : null}
            {outListItems?.length > 0 ? (
              <div id="filteringresult-frame">
                <div id="introducetext">
                  😅 원하시는 도수는 아니지만, 이런 전통주는 어떠신가요?
                </div>
                <div id="filteringresult">{outListItems}</div>
              </div>
            ) : null}
          </div>
          <div
            id="rocketframe"
            onClick={() => {
              setGoToResult(false);
            }}
          >
            <img src={filteringresulticon} alt="우주인" />
            <div id="backtodialog">다시 대화하기</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: "GD";

  #background {
    height: 100%;
  }
  #resultfilteringpageframe {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: auto;
  }
  #introducetotal {
    margin-top: 50px;
    text-align: center;
  }
  #introducetext {
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
  }
  #filteringresult {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #filteringresult a {
    text-decoration: none;
    color: black;
  }
  #filteringresult-frame {
    margin: 50px 0px 30px;
  }
  #rocketframe {
    cursor: url(${mousepointer}) 50 50, auto;
    position: fixed;
    top: 74vh;
    left: 0vw;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #rocketframe:hover {
    cursor: url(${mousepointer}) 50 50, auto;
    -webkit-transform: translateY(-18px);
    transform: translateY(-18px);
    transform: scale(1.1);
  }
  #rocketframe img {
    cursor: url(${mousepointer}) 50 50, auto;
    width: 100px;
  }
  #rocketframe img:hover {
    cursor: url(${mousepointer}) 50 50, auto;
    transform: scale(1.1);
  }
  #backtodialog {
    cursor: url(${mousepointer}) 50 50, auto;
    font-family: "GD";
    font-size: 18px;
    color: white;
    background-color: #9db7d2;
    margin-top: 10px;
    border-radius: 10px;
    display: inline-block;
    width: 120px;
    text-align: center;
  }
`;
