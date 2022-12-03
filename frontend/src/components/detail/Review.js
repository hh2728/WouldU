import styled from "styled-components";
import Rating from "@mui/material/Rating";
import { Divider } from "@mui/material";

export default function Review({ review }) {
  // 술 리스트 반복으로 보여주기

  return (
    <StyledWrapper>
      <div id="reviewframe">
        <div id="reviewtitle">&lt; "우주" 회원들의 평가 &gt;</div>
        <div id="reviewlist">
          {review.length > 0 ? null : (
            <div id="reviewnull">현재 등록된 리뷰가 없습니다.😥</div>
          )}
          {review &&
            review.map((item, index, arr) => (
              <div key={index}>
                <div id="reviews">
                  <div id="tx_star">
                    <Rating
                      name="read-only"
                      value={item.score}
                      readOnly
                      id="stars"
                      size="large"
                      key={index}
                    />
                  </div>
                  <div id="tx_comment">{item.comment}</div>
                </div>
                {arr.length - 1 !== index ? (
                  <Divider className="reviewDivider" />
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  font-family: "GD";
  margin-bottom: 50px;

  #reviewframe {
    margin: 10px 0px;
    border-radius: 10px;
    background-color: #fff1f0;
    padding: 5px;
    padding-bottom: 30px;
  }

  #reviewtitle {
    font-size: 24px;
    margin: 10px;
  }

  #reviewnull {
    text-align: center;
    font-size: 24px;
  }

  #reviews {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin: 5px 4px;
    border-radius: 10px;
    font-size: 20px;
    padding: 2px;
  }

  #tx_star {
    border-radius: 10px;
    margin-left: 5px;
  }
  #tx_comment {
    margin-left: 10px;
  }

  .reviewDivider {
    border-width: 1px;
    border-color: #7a7a7a;
    width: 97%;
    margin: 2px 1.5%;
  }

  .MuiRating-root {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }
`;
