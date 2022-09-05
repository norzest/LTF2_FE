// writer : 최강현

import { useNavigate } from "react-router-dom";
import * as ResultCount from "../styles/searchResultCountStyle";
import { LGButton } from "./Button";

export default function SearchResultCount({
  searchPhones,
  keyword,
  fixKeyword,
  setFixKeyword,
}) {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goFixKeyWord = (fixKeyword) => navigate(`/search/${fixKeyword}`);

  return (
    <ResultCount.CountBox>
      <span>"{keyword}"</span>에 대한 검색 결과는
      {searchPhones.length > 0 ? (
        <span>&nbsp;{searchPhones.length}건입니다.</span>
      ) : (
        <>
          <span>&nbsp;없습니다.</span>
          <div className="goHome">
            <LGButton onClick={goHome} variant="primary">
              메인페이지로
            </LGButton>
          </div>
        </>
      )}
      {fixKeyword.length > 0 ? (
        <div className="fixKeyword">
          혹시 &nbsp;
          <span onClick={() => goFixKeyWord(fixKeyword)}>{fixKeyword}</span>를
          검색하셨나요?
        </div>
      ) : (
        <></>
      )}
    </ResultCount.CountBox>
  );
}
