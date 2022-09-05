// writer : 최강현
import styled from "styled-components";

export const ResultBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ResultBar = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;

    .result {
        font-size: 24px;
        font-weight: bold;
    }

    .more {
        font-size: 16px;
        display: flex;
        align-items: center;

        &:hover {
            cursor: pointer;
        }
    }
`

export const ResultList = styled.div`
    width: 90%;
    margin-top : 15px;
`