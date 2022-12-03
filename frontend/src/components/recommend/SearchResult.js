import styled from "styled-components";
import SearchResultElement from "components/recommend/SearchResultElement";
import Pagination from "react-js-pagination";
import React, { useState, useEffect } from "react";

export default function SearchResult(props) {
  const { searchData, params, setParams, setHandleClick, setReviewTarget } =
    props;

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
              <div
                key={`detail + ${result.alcohol_no}`}
                id="result-one"
                onClick={() => {
                  setHandleClick(true);
                  setReviewTarget({
                    alcohol_no: result.alcohol_no,
                    alcohol_image: result.alcohol_image,
                    alcohol_name: result.alcohol_name,
                    brewery: result.brewery,
                    size: result.size,
                    alcohol: result.abv,
                  });
                }}
              >
                {/* <SearchResultElement
              id={result.alcohol_no}
              img_link={result.alcohol_image}
              name={result.alcohol_name}
              brewery={result.brewery}
              size={result.size}
              alcohol={result.abv}
              key={`${result.alcohol_no}`}
            /> */}
                <SearchResultElement
                  id={result.alcohol_no}
                  result={result}
                  key={`${result.alcohol_no}`}
                />
              </div>
            ))}
        </div>
      </StyledWrapper>
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

const StyledWrapper = styled.div`
  width: 1800px;
  height: 620px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  #result {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
  }
  #result-one {
    cursor: pointer;
  }
`;

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
