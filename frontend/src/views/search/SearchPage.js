import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "components/search/SearchBar";
import SearchFilter from "components/search/SearchFilter";
import SearchResult from "components/search/SearchResult";
import { search } from "../../api/searchAPI";
import Nav from "components/nav/Nav";

export default function SearchPage() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [params, setParams] = useState({
    name: "",
    sort: 1,
    page: 1,
    alcol_type: "",
  });

  // 정렬 버튼이 아직 없어서 그 부분 추가 안했음
  // 추가 하게 되면 sort <- 부분을 바꿔주면 됨
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
          <div id="searchtools">
            <SearchBar
              params={params}
              setParams={setParams}
              setSearchData={setSearchData}
            />
            <SearchFilter
              params={params}
              setParams={setParams}
              setSearchData={setSearchData}
            />
            {/* <SearchFilter filterKinds={ filterKinds } setFilterKinds={setFilterKinds} /> */}
            {/* <SearchResult searchQuery={searchQuery} filterKinds={filterKinds} /> */}
            <SearchResult
              searchData={searchData}
              params={params}
              setParams={setParams}
            />
          </div>
        </div>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  height: 100vh;

  #background {
    height: 100%;
  }

  #searchtools {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
