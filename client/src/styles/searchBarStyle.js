// writer : 최강현
import styled from "styled-components";

export const SearchBox = styled.div`
    width: calc(100% - 4px);
    margin-top: 50px;
    border-radius: 141px;
    border: 2px solid black;
    background-color: #F4F4F4;
    height: 58px;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        margin-right: 15px;

        &:hover {
            cursor: pointer;
        }
    }
`

export const Input = styled.input`
    width: 90%;
    background: none;
    border: none;
    height: 58px;
    font-size: 32px;
    font-weight: bold;
    color: #e6007e;
    margin: 0px 25px;

    &:focus {
        outline: none;
    }
`