// writer : 최강현

import React from "react";
import * as SearchStyle from "../styles/searchStyle";
import { PageContainer } from "../components/PageContainer";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import SearchResultCount from "../components/SearchResultCount";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getList } from "../api/SearchAPI";

export default function Search({ saveCart, propsList }) {
  const { keyword } = useParams();

  const [searchPhones, setSearchPhones] = useState([]);

  const [fixKeyword, setFixKeyword] = useState([]);

  const [isShowMore, setIsShowMore] = useState(false);

  const fetchSearchPhones = async () => {
    const searchResult = await getList(keyword)
      .then((data) => {
        if (data.keyWord) {
          setFixKeyword(data.keyWord);
        } else {
          setFixKeyword("");
        }

        if (data.message) {
          return [];
        } else return data.SearchList;
      })
      .catch((e) => {});
    return searchResult;
  };

  useEffect(async () => {
    const result = await fetchSearchPhones();
    setSearchPhones(result);
  }, [keyword]);

  return (
    <SearchStyle.TotalLayout>
      <SearchBar
        keyword={keyword}
        isShowMore={isShowMore}
        setIsShowMore={setIsShowMore}
      />
      <SearchResultCount
        searchPhones={searchPhones}
        keyword={keyword}
        fixKeyword={fixKeyword}
        setFixKeyword={setFixKeyword}
      />
      {searchPhones.length > 0 && (
        <SearchResult
          searchPhones={searchPhones}
          isShowMore={isShowMore}
          setIsShowMore={setIsShowMore}
          saveCart={saveCart}
          propsList={propsList}
        />
      )}
    </SearchStyle.TotalLayout>
  );
}
