// writer: 권혁준
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.svg";
import * as Bar from "../styles/barStyle";

export default function Header() {
  const history = useNavigate();

  const goHome = () => {
    history("/");
  };

  return (
    <Bar.MainContainer>
      <Bar.MainLogo src={logo} alt="logo" onClick={goHome} />
    </Bar.MainContainer>
  );
}
