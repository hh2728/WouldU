import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { search } from "../../api/searchAPI";

export default function SearchFilterButton(props) {
  const { buttonValue, buttonName, params, setParams, setSearchData } = props;
  const [selected, setSelected] = useState(false);
  const [filterKinds, setFilterKinds] = useState([]);
  const [temp, setTemp] = useState("aa");
  // {
  //   'name': '',
  //   'sort': 1,
  //   'row_index': 0,
  //   'alcol-type':[],
  // }

  const handleClick = e => {
    e.preventDefault();

    if (selected === false) {
      setSelected(true);

      const at = params.alcol_type + buttonValue + ",";
      setParams(prevState => ({ ...prevState, alcol_type: at, page: 1 }));
    } else {
      setSelected(false);

      const at = params.alcol_type.replace(buttonValue + ",", "");
      setParams(prevState => ({ ...prevState, alcol_type: at, page: 1 }));
    }
  };

  return (
    <StyledWrapper>
      <div>
        <button
          id={selected === true ? "clicked" : "non-clicked"}
          type="button"
          onClick={handleClick}
        >
          {buttonName}
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  line-height: 2;
  font-size: 20px;
  text-align: center;
  font-family: "GD";

  #non-clicked,
  #clicked {
    border-radius: 10px;
    margin: 0px 10px;
    padding: 0 15px;
    color: #d8d8d8;
  }

  #non-clicked {
    border: 2px solid #d8d8d8;
    background-color: transparent;
  }
  #non-clicked:hover {
    border-color: white;
    color: white;
    background-color: #9db7d2;
  }
  #clicked {
    background-color: transparent;
    border: 2px solid #5783b2;
    color: #5783b2;
  }
`;
