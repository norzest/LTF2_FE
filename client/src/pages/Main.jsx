import React from "react";
import { useNavigate } from "react-router-dom";
import * as Styles from "../styles/mainStyle";
import mainImg from "../image/mainImg.jpg";
import { LGButton } from "../components/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Main({}) {
  const navigate = useNavigate();

  const goFlip = () => navigate("/detail/1");
  const goPhone = () => navigate("/phone/5G");

  return (
    <Styles.MainBox>
      <Styles.MainBlack />
      <Styles.MainImg src={mainImg} alt="mainImg" />
      <Styles.MainTitle>Galaxy Z Flip 4 | Z Fold 4</Styles.MainTitle>
      <Styles.MainDes>
        유플러스 단독 메종키츠네 리미티드 에디션부터
        <br />
        갤럭시 워치5와 버즈2까지
      </Styles.MainDes>
      <LGButton onClick={goFlip} className="goButton">
        바로 알아보기
      </LGButton>
      <Styles.GoFive onClick={goPhone}>
        5G 휴대폰 전체보기
        <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
      </Styles.GoFive>
    </Styles.MainBox>
  );
}
