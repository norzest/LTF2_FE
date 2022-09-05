// writer : 최강현

import * as Result from "../styles/searchResultStyle";
import PhoneList from "../components/PhoneList";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function SearchResult({
  searchPhones,
  isShowMore,
  setIsShowMore,
  saveCart,
  propsList,
}) {
  const onClick = () => setIsShowMore(!isShowMore);

  return (
    <Result.ResultBox>
      <Result.ResultBar>
        <div className="result">검색 결과</div>
        {isShowMore ? (
          <div></div>
        ) : (
          <div className="more" onClick={onClick}>
            더 보기
            <KeyboardArrowRightIcon fontSize="small"></KeyboardArrowRightIcon>
          </div>
        )}
      </Result.ResultBar>
      <Result.ResultList>
        {isShowMore ? (
          <PhoneList
            phones={searchPhones}
            search
            isShowMore
            saveCart={saveCart}
            propsList={propsList}
          />
        ) : (
          <PhoneList
            phones={searchPhones}
            search
            saveCart={saveCart}
            propsList={propsList}
          />
        )}
      </Result.ResultList>
    </Result.ResultBox>
  );
}
