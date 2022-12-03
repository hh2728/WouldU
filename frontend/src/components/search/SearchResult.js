import styled from "styled-components";
import React, { useState, useEffect } from "react";
import testinput from "./testinput";
import Element from "./Element";
import { Link } from "react-router-dom";
// import Pagination from "./Pagination";
import Pagination from "react-js-pagination";

export default function SearchResult({ searchData, params, setParams }) {
  // const { searchQuery, filterKinds } = props;
  // eslint-disable-next-line
  const [limit, setLimit] = useState(15);
  const [totalPage, setTotalPage] = useState(1);

  const handlePageChange = page => {
    // setPage(page);
    setParams(prevState => ({ ...prevState, page: page }));
  };

  useEffect(() => {
    if (searchData.length > 0) {
      // console.log(searchData[0].total_count);
      setTotalPage(searchData[0].total_count);
    }
  }, [searchData]);

  return (
    <>
      <StyledWrapper>
        <div id="result">
          {searchData &&
            searchData.map(result => (
              <Link
                to={`/detail/${result.alcohol_no}`}
                key={`detail + ${result.alcohol_no}`}
              >
                <Element
                  id={result.alcohol_no}
                  img_link={result.alcohol_image}
                  name={result.alcohol_name}
                  brewery={result.brewery}
                  // ingredients={result.}
                  size={result.size}
                  alcohol={result.abv}
                  // desc={result.}
                  key={`${result.alcohol_no}`}
                />
              </Link>
            ))}
        </div>
      </StyledWrapper>
      {/* <Pagination
          total={value.length}
          limit={limit}
          page={page}
          setPage={setPage}
        /> */}
      <PgStyle>
        <Pagination
          activePage={params.page} // 현재 페이지
          itemsCountPerPage={limit} // 한 페이지랑 보여줄 아이템 갯수
          totalItemsCount={totalPage} // 총 아이템 갯수
          pageRangeDisplayed={5} // paginator의 페이지 범위
          prevPageText={"‹"} // "이전"을 나타낼 텍스트
          nextPageText={"›"} // "다음"을 나타낼 텍스트
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </PgStyle>
    </>
  );
}
const PgStyle = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    cursor: pointer;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    // border: 1px solid #9db7d2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;

    :hover {
      box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.3) inset;
    }
  }

  ul.pagination li:first-child {
    border-radius: 10px;
  }

  ul.pagination li:last-child {
    border-radius: 10px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 1rem;
    font-family: "GD";
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #9db7d2;
  }

  ul.pagination li a:hover {
    color: white;
  }

  ul.pagination li a.active {
    color: white;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #ffa500;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 620px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  a {
    text-decoration: none;
    color: black;
  }
  #result {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
  }
`;
