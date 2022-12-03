import styled from "styled-components";

export default function SearchResultElement({ result }) {
  return (
    <StyledWrapper>
      <div id="picture">
        <img src={result.alcohol_image} alt="example" />
      </div>
      <div id="information">
        <div id="alcoholtitle">{result.alcohol_name}</div>
        <div>{result.brewery}</div>
        <div>
          {result.size}ml / {result.abv}도
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  border: 2px solid #ceab93;
  border-radius: 10px;
  margin: 10px 0px;
  align-items: center;
  width: 340px;

  :hover {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.9) 0px 3px 8px;
    background-color: #ecdfc8;
  }

  #picture {
    width: 100px;
    height: 100px;
    border: solid;
    border-width: 0 2px 0 0;
    border-color: transparent #d0b8a8 transparent transparent;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  #picture img {
    width: 90px;
    height: 90px;
    margin: auto;
    object-fit: contain;
  }
  #information {
    display: flex;
    flex-direction: column;
    margin: 5px;
    font-family: "GD";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #information div {
    margin: 0px 5px;
  }
  #information-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.2em;
  }
  #alcoholtitle {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
