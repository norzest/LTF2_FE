// writer: 권혁준
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as DetailInfo from "../styles/detailInfoStyle";
import goToCart from "../util/goToCart";
import { LGButton } from "./Button";
import MessageModal from "./MessageModal";
import SideFlexRow, {
  SideFlexDetailBoldRow,
  SideFlexDetailRow,
} from "./SideFlexRow";

export default function DetailSideBar({ active, priceInfo, saveCart }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    type: "",
    message: "",
    btnMessage: "",
    func: "",
  });
  const changeModalMsg = (type, message, btnMessage, func) =>
    setModalMsg({ type, message, btnMessage, func });

  const goCart = () =>
    goToCart(active, saveCart, changeModalMsg, navigate, setOpen);

  const goToOrder = () => {
    navigate("/order", { state: active });
  };

  return (
    <DetailInfo.SideBarContainer>
      <MessageModal
        open={open}
        setOpen={setOpen}
        type={modalMsg.type}
        message={modalMsg.message}
        btnMessage={modalMsg.btnMessage}
        func={modalMsg.func}
      />
      <h2>{active.phone.titleName}</h2>
      <p>{`${active.color.name} | ${active.phone.phoneInfo.memory}GB | ${active.registration}`}</p>
      <hr />
      <h3>최종 결제금액 계산</h3>
      <SideFlexDetailBoldRow
        left={
          active.installment === 1 ? "기기 완납 결제 가격" : "월 휴대폰 할부금"
        }
        right={`${priceInfo.phone.toLocaleString()} 원`}
      />
      <SideFlexDetailRow
        left="정상가"
        right={`${priceInfo.originalPhone.toLocaleString()} 원`}
      />
      {active.discount === -1 && (
        <div>
          <SideFlexDetailRow
            left="공시지원금"
            right={`-${priceInfo.supportPrice.toLocaleString()} 원`}
            discount
          />
          <SideFlexDetailRow
            left="추가지원금"
            right={`-${priceInfo.extraSupportPrice.toLocaleString()} 원`}
            discount
          />
        </div>
      )}
      <SideFlexDetailRow
        left="실구매가"
        right={`${priceInfo.actualPrice.toLocaleString()} 원`}
      />
      {active.installment !== 1 && (
        <div>
          <SideFlexDetailRow
            left="할부 개월수"
            right={`${active.installment}개월`}
          />
          <SideFlexDetailRow
            left="할부수수료 (연 5.9%)"
            right={`${priceInfo.installmentFee.toLocaleString()} 원`}
          />
        </div>
      )}
      <hr />
      <SideFlexDetailRow
        left="월 통신료"
        right={`${priceInfo.plan.toLocaleString()} 원`}
      />
      <SideFlexDetailRow
        left={active.plan.name}
        right={`${priceInfo.originalPlan.toLocaleString()} 원`}
      />
      {active.discount > 11 && (
        <SideFlexDetailRow
          left=" 선택 약정 할인"
          right={`-${priceInfo.discountPlan.toLocaleString()} 원`}
          discount
        />
      )}
      <hr />
      <div
        style={{
          background: "#fff",
          height: "80px",
          padding: "10px 10px",
          boxSizing: "border-box",
          borderRadius: "10px",
        }}
      >
        <SideFlexRow
          left="월 납부금액"
          right={`${priceInfo.total.toLocaleString()} 원`}
          title
        />
        <hr />
      </div>
      <LGButton variant="primary" size="lg" onClick={goToOrder}>
        온라인 주문
      </LGButton>
      <LGButton variant="outline-dark" size="lg" onClick={goCart}>
        장바구니
      </LGButton>
    </DetailInfo.SideBarContainer>
  );
}
