// writer : 최강현

import * as Bar from "../styles/searchBarStyle";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({keyword, isShowMore, setIsShowMore}) {
    const navigate = useNavigate();

    const [nowValue, setNowValue] = useState(keyword);

    const changeValue = e => setNowValue(e.target.value);

    const onClick = () => {
        if(nowValue.length < 2) {
            alert("두 글자 이상 입력하세요")
        } else if(nowValue.length > 20) {
            alert("검색어의 최대길이는 20자입니다.")
        } else {
            navigate(`/search/${nowValue}`)
            setIsShowMore(false);
        }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onClick();
        }
    }

    useEffect(async () => {
        setNowValue(keyword);
        setIsShowMore(false);
    }, [keyword]);

    return (
        <Bar.SearchBox>
            <Bar.Input value={nowValue} onChange={changeValue} onKeyPress={onKeyPress}/>
            <SearchIcon fontSize="large" onClick={onClick}/>
        </Bar.SearchBox>
    );
}