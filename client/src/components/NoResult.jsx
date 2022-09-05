// writer: 권혁준
import * as Styled from "../styles/cartStyle";
import { LGButton } from "./Button";

export default function NoResult({
  setDefaultValue,
  setFilterOpt,
  setFilter,
  tech,
}) {
  const onClick = () => {
    setDefaultValue("전체");
    setFilter({
      plan: "전체",
      disCountType: "전체",
      manufacturingCompany: "전체",
      storage: "전체",
      memory: "전체",
    });
    setFilterOpt({ planId: tech === "5G" ? 1 : 17, disCountType: -1 });
  };
  return (
    <div>
      <Styled.CartImgLayout>
        <Styled.CartAlertImg />
      </Styled.CartImgLayout>

      <Styled.CartLayout>
        <Styled.CartText>
          설정한 조건과 일치하는 상품이 없습니다.
        </Styled.CartText>
      </Styled.CartLayout>
      <Styled.MvMainBtnLayout>
        <LGButton onClick={onClick} size="lg" children="필터 초기화" />
      </Styled.MvMainBtnLayout>
    </div>
  );
}
