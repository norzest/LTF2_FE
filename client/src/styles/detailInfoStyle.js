// writer: 권혁준
import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  display: inline-box;
  width: 70%;
  padding: 20px 50px 0px 50px;

  button {
    box-sizing: border-box;
    width: 48%;
    margin: 1% 1%;
  }
`;

export const PriceRow = styled.div`
  width: 100%;

  div {
    display: inline-block;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .label {
    width: 20%;
    font-weight: bold;
    font-size: large;
    vertical-align: top;
    padding-top: 15px;
    padding-right: 30px;

    .des {
      font-weight: 200;
      font-size: 16px;
    }
  }
  .content {
    width: 80%;
    padding-right: 30px;

    li {
      font-size: small;
    }
  }
`;

export const DiscountCard = styled.div`
  box-sizing: border-box;
  width: ${(props) => (props.left ? "33%" : "63%")};
  height: 220px;
  padding: 10px 30px;
  color: ${(props) => (props.active ? "black" : "grey")};
  outline: ${(props) => (props.active ? "2px solid black" : "2px solid grey")};
  border-radius: 10px;
  ${(props) => (props.disabled ? "" : "cursor: pointer;")}
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  margin: 0 1%;

  .type {
    margin-bottom: 0px;
  }
  .type-description {
    font-size: 22px;
    margin-top: 0px;
    font-weight: bold;
  }
  .type-price {
    text-align: right;
    position: relative;
    bottom: 0px;
    right: 0px;
    span {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .type-support-price {
    text-align: right;
    position: relative;
    bottom: -40px;
    right: 0px;
    span {
      font-size: 24px;
      font-weight: bold;
    }
  }

  ${(props) =>
    props.disabled
      ? ""
      : `&:hover {
    background-color: #f5f5f5;
  }
  &:active {
    background-color: lightgrey;
  }`}

  transition: all 0.2s ease-in-out;
`;

export const Spec = styled.img`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
`;

export const PlanCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  padding: 10px 20px;
  border: ${(props) => (props.now ? "2px solid black" : "2px solid grey")};
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0px;
  opacity: ${(props) => (props.now ? 1 : 0.5)};

  &:hover {
    background-color: #f5f5f5;
  }
  &:active {
    background-color: lightgrey;
  }

  transition: all 0.2s ease-in-out;
`;

export const PlanTitle = styled.p`
  font-size: 20px;
  margin: 10px 10px;
`;

export const PlanPrice = styled.p`
  box-sizing: border-box;
  width: 30%;
  display: inline-block;
  position: relative;
  bottom: 25px;
  left: 0px;
  font-size: 24px;
  font-weight: bold;
  padding: 0px 10px;
`;

export const PlanDescription = styled.div`
  box-sizing: border-box;
  width: 70%;
  display: flex;
  position: relative;
  bottom: 25px;
  right: 0px;
  text-align: right;
  padding: 0px 10px;
  align-items: center;
  margin: 0;

  p {
    display: inline-flex;
    margin: 0 5px;
  }

  .icon {
    position: relative;
    right: 0px;
    bottom: -6px;

    &:hover {
      color: #e6007e;
    }
  }
`;

export const DiscountPrice = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

export const SideBarContainer = styled.div`
  box-sizing: border-box;
  width: 30%;
  min-width: 300px;
  max-width: 400px;
  padding: 20px 30px;
  height: 1000px;
  background-color: #f5f5f5;
  position: sticky;
  top: 153px;

  h2,
  h3 {
    margin: 10px 0px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }

  button {
    width: 100%;
    margin: 10px 0px;
  }
`;

export const SideFlex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  p {
    color: grey;
  }

  .left {
    width: 60%;
    text-align: left;
  }
  .right {
    width: 40%;
    text-align: right;
  }
`;

export const NoContractDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 220px;
  padding: 86px 0px;
  position: relative;
  background: #f8f8f8;
  text-align: center;

  div {
    color: grey;
  }
`;

export const MorePlan = styled.p`
  display: inline-block,
  float: right,
  cursor: pointer,
`;

export const ImageCell = styled.th`
  width: 20%;
`;

export const InfoCell = styled.td`
  width: 80%;
`;

export const InfoTr = styled.tr`
  height: 60px;
`;

export const HeaderCell = styled.th`
  width: 20%;
  text-align: left;
  background: #f5f5f5;
  padding: 0px 30px;
  border-bottom: 1px solid lightgrey;
`;

export const SpecCell = styled.td`
  width: 80%;
  padding: 0px 30px;
  border-bottom: 1px solid lightgrey;
`;
