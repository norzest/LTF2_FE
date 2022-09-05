// writer: 권혁준
import styled from "styled-components";

export const Header = styled.header`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  top: 0px;
  left: 0px;
  height: 60px;
  width: 100%;
  background: #fff;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid grey;
  padding: 18px 24px 17px;
  text-align: left;
  align-items: center;
`;

export const Title = styled.h3`
  margin: 0px;
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 24px;
  top: 18px;
  cursor: pointer;

  &:hover {
    color: grey;
  }
`;

export const Footer = styled.footer`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  bottom: 0px;
  left: 0px;
  height: 80px;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  padding: 18px 24px 18px;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  left: 0px;
  background: #f5f5f5;
  overflow: auto;
  width: 100%;
  height: 660px;
  padding: 18px 24px 18px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
