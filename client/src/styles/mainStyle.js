// writer : 최강현
import styled from "styled-components";

export const MainBox = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    overflow: hidden;
    height: 1400px;

    .goButton {
        position: absolute;
        top: 500px;
        left: 160px;
    }
`;

export const MainBlack = styled.div`
  position: fixed;
  background-color: black;
  width: 3000px;
  height: 1920px;
  z-index: -1;
`;

export const MainImg = styled.img`
  width: 1920px;
`;

export const MainTitle = styled.div`
  position: absolute;
  top: 320px;
  left: 160px;
  color: white;
  font-size: 40px;
  font-weight: 700;
`;

export const MainDes = styled.div`
  position: absolute;
  top: 400px;
  left: 160px;
  color: white;
  font-size: 20px;
  font-weight: 450;
`;

export const GoFive = styled.div`
    font-size: 20px;
    margin-top: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: white;

    &:hover {
        cursor: pointer;
    }
`;
