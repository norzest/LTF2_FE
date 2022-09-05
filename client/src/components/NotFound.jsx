/* eslint-disable react-hooks/exhaustive-deps */
// writer: 권혁준
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as NF from "../styles/notFoundStyle";
import { LGButton } from "./Button";

export default function NotFound() {
  const navigate = useNavigate();

  const timeoutGoHome = () =>
    setTimeout(() => {
      navigate("/");
    }, 3000);

  useEffect(() => {
    timeoutGoHome();
    return () => clearTimeout(timeoutGoHome);
  }, []);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/");

  return (
    <NF.Container>
      <h1>일시적인 장애로 원하시는 화면으로 이동하지 못했습니다.</h1>
      <h1>잠시 후에 메인 페이지로 이동합니다.</h1>
      <NF.AskContainer>
        <p>
          이 페이지가 계속 나타날 경우 1:1 문의 를 이용하여 주시기 바랍니다.
        </p>
        <p>
          1:1 문의 접수 시 문의유형을 “홈페이지 이용＂으로 선택하시면 좀 더 빠른
          답변 및 조치를 받으실 수 있습니다.
        </p>
        <p>기타 궁금한 사항은 자주하는 질문을 참고하시길 바랍니다.</p>
      </NF.AskContainer>
      <LGButton
        size="lg"
        variant="light"
        children="이전 페이지로 이동하기"
        style={{ margin: "0px 10px" }}
        onClick={goBack}
      />
      <LGButton
        size="lg"
        children="메인 페이지로 이동하기"
        style={{ margin: "0px 10px" }}
        onClick={goHome}
      />
    </NF.Container>
  );
}
