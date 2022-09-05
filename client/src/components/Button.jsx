// writer: 권혁준
import styled from "styled-components";

function btnColor(variant) {
  const defaultOpt = { bg: "#e6007e", cl: "#ffffff", border: "none" };
  switch (variant) {
    case "primary":
      return {
        default: defaultOpt,
        hover: { ...defaultOpt, bg: "#cc0070" },
        active: { ...defaultOpt, bg: "#a10059" },
      };
    case "secondary":
      return {
        default: { ...defaultOpt, bg: "#6b6b6b" },
        hover: { ...defaultOpt, bg: "#535353" },
        active: { ...defaultOpt, bg: "#3a3a3a" },
      };
    case "light":
      return {
        default: {
          bg: "#ffffff",
          cl: "#6b6b6b",
          border: "1px solid #680039",
        },
        hover: { bg: "#ffffff", cl: "#680039", border: "1px solid #680039" },
        active: { bg: "#c4c4c4", cl: "#680039", border: "1px solid #680039" },
      };
    case "highlight":
      return {
        default: {
          bg: "#ffffff",
          cl: "#000000",
          border: "3px solid #000000",
        },
        hover: { bg: "#dddddd", cl: "#680039", border: "3px solid #680039" },
        active: { bg: "#ffeff8", cl: "#680039", border: "3px solid #680039" },
      };
    case "dark":
      return {
        default: { ...defaultOpt, bg: "#000000" },
        hover: { ...defaultOpt, bg: "#474747" },
        active: { ...defaultOpt, bg: "#858585" },
      };
    case "outline-primary":
      return {
        default: {
          bg: "#ffffff",
          cl: "#e6007e",
          border: "1px solid #e6007e",
        },
        hover: { bg: "#ffffff", cl: "#680039", border: "1px solid #680039" },
        active: { bg: "#ffeff8", cl: "#680039", border: "1px solid #680039" },
      };
    case "outline-dark":
      return {
        default: {
          bg: "#ffffff",
          cl: "#000000",
          border: "1px solid #a7a7a7",
        },
        hover: { bg: "#dddddd", cl: "#680039", border: "1px solid #680039" },
        active: { bg: "#ffeff8", cl: "#680039", border: "1px solid #680039" },
      };
    default:
      return {
        default: defaultOpt,
        hover: { ...defaultOpt, bg: "#cc0070" },
        active: { ...defaultOpt, bg: "#a10059" },
      };
  }
}
function btnSize(size) {
  switch (size) {
    case "sm":
      return {
        padding: "7.5px 22.5px",
        fontSize: "12px",
      };
    case "lg":
      return {
        padding: "10px 37.5px",
        fontSize: "18px",
      };
    default:
      return {
        padding: "10px 30px",
        fontSize: "16px",
      };
  }
}
function isRec(rec) {
  return rec ? "10px" : "100px";
}

export const LGButton = styled.button`
  padding: ${(props) => btnSize(props.size).padding};
  color: ${(props) => btnColor(props.variant).default.cl};
  border-radius: ${(props) => isRec(props.rec)};
  border: ${(props) => btnColor(props.variant).default.border};
  background-color: ${(props) => btnColor(props.variant).default.bg};
  font-size: ${(props) => btnSize(props.size).fontSize};
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    color: ${(props) => btnColor(props.variant).hover.cl};
    border: ${(props) => btnColor(props.variant).hover.border};
    background-color: ${(props) => btnColor(props.variant).hover.bg};
  }
  &:active {
    color: ${(props) => btnColor(props.variant).active.cl};
    border: ${(props) => btnColor(props.variant).active.border};
    background-color: ${(props) => btnColor(props.variant).active.bg};
  }
  &:disabled {
    cursor: default;
    color: grey;
    border: grey;
    background-color: lightgrey;
  }

  transition: all 0.2s ease-in-out;
`;

export const FormButton = styled.button.attrs((props) => ({
  type: "button",
}))`
  margin-right: 8px;
  width: 203px;
  position: relative;
  border-radius: 14px;
  min-height: 48px;
  padding: 0;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: none !important;
  border: ${(props) =>
    props.check ? "2px solid #000!important" : "1px solid #ddd!important"};
  cursor: pointer;
  font-weight: ${(props) => (props.check ? "400px" : "300px")};
  &:hover {
    border: 2px solid #000 !important;
    font-weight: 400;
  }
  &:active {
    border: 2px solid #000 !important;
    font-weight: 400;
  }
`;
