import React, { useEffect, useState } from "react";
import { search } from "../../api/searchAPI";
import styled from "styled-components";
import SearchFilterButton from "./SearchFilterButton";
import { Divider, Typography } from "@mui/material";

export default function SearchFilter(props) {
  const { params, setParams, setSearchData } = props;

  return (
    <StyledWrapper>
      <div id="filter-frame">
        <Typography id="filter-title">종류</Typography>
        <Divider
          component="span"
          sx={{ height: 33, borderWidth: "1px" }}
          orientation="vertical"
        />
        <div id="filter-elements">
          <SearchFilterButton
            buttonValue="A5"
            buttonName="탁주"
            params={params}
            setParams={setParams}
            setSearchData={setSearchData}
          />
          <SearchFilterButton
            buttonValue="A3"
            buttonName="약주·청주"
            params={params}
            setParams={setParams}
            setSearchData={setSearchData}
          />
          <SearchFilterButton
            buttonValue="A1"
            buttonName="과실주"
            params={params}
            setParams={setParams}
            setSearchData={setSearchData}
          />
          <SearchFilterButton
            buttonValue="A2"
            buttonName="증류주"
            params={params}
            setParams={setParams}
            setSearchData={setSearchData}
          />
          <SearchFilterButton
            buttonValue="A4"
            buttonName="리큐르/기타주류"
            params={params}
            setParams={setParams}
            setSearchData={setSearchData}
          />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 800px;
  height: auto;
  margin: 0px 0px 10px;
  padding: 5px;

  #filter-frame {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  #filter-title {
    text-align: center;
    font-family: "GD";
    font-size: 1.2rem;
  }

  #filter-elements {
    display: flex;
  }
`;
