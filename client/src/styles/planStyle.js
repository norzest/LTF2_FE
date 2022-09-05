// writer : 최강현

import styled from "styled-components";

export const PlanRadio = styled.div`
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  border: 4px solid #fff;
  border-radius: 50%;
  outline: 2px solid grey;
  position: relative;
  top: -10px;
  left: -20px;
  cursor: pointer;
  background: ${(props) => (props.now ? "#e6007e" : "#fff")};

  &:hover {
    background: ${(props) => (props.now ? "#cc0070" : "#eee")};
  }
  &:active {
    background: ${(props) => (props.now ? "#a10059" : "#ddd")};
  }

  transition: all 0.1s ease-in-out;
`;

export const PlanBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  top: 60px;
  left: 0px;
  display: flex;
  padding: 0px 100px;
  border-bottom: 1px solid lightgrey;
  color: grey;
  background: #fff;
  z-index: 100;
  position: sticky;
  top: 0px;
  left: 0px;
`;

export const PlanBarItem = styled.div`
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;

  p {
    margin: 0px;
  }
`;

export const BoxContainer = styled.div`
  width: 100%;
  height: 530px;
  background: #f5f5f5;
  overflow: auto;
`;

export const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  left: 0px;
  background: #f5f5f5;
  width: 100%;
  height: 660px;
`;

export const PlanBox = styled.div`
  width: 1100px;
  height: 200px;
  background: #fff;
  padding: 24px 48px 24px 34px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin: 50px auto;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlanCol = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
`;

export const SpecCol = styled.div`
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SpecRow = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  h1,
  h2 {
    margin: 0;
  }
`;

export const Title = styled.h3`
  display: block;
  position: relative;
  top: -20px;
  left: 10px;
`;

export const Price = styled.h1`
  display: block;
  position: relative;
  top: -30px;
  left: 10px;
`;
