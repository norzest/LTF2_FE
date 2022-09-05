// writer: 권혁준
import styled from "styled-components";

export const ColorDot = styled.div`
  display: inline-box;
  margin: 5px 5px;
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
      props.hexCode === props.color.hexCode ? "white" : props.hexCode};
  border-radius: 50%;
  background-color: ${(props) => props.hexCode};
  outline: 2px solid grey;
  cursor: pointer;
  opacity: ${(props) => (props.hexCode === props.color.hexCode ? 1 : 0.4)};

  &:hover {
    border: 2px solid white;
    opacity: ${(props) => (props.hexCode === props.color.hexCode ? 0.8 : 0.6)};
  }
  &:active {
    border: 2px solid lightgrey;
    opacity: ${(props) => (props.hexCode === props.color.hexCode ? 0.6 : 0.8)};
  }

  transition: all 0.1s ease-in-out;
`;
