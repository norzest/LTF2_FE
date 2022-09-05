// writer: 권혁준
import { Row } from "../styles/gridStyle";
import { LGButton } from "./Button";
import { ColorDot } from "./ColorDot";
import * as PhoneInfo from "../styles/phoneInfoStyle";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MessageModal from "./MessageModal";
import { SideFlex } from "../styles/detailInfoStyle";
import { discountType } from "../util/transform";
import goToCart from "../util/goToCart";

export default function PhoneInfomation({
  active,
  setActive,
  priceInfo,
  saveCart,
}) {
  const navigate = useNavigate();

  const [nowImg, setNowImg] = useState(0);
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

  const storageText = (storage) => {
    switch (storage) {
      case 64:
        return `가장 일반적인 용량이에요. 사진촬영을 즐긴다면! 사진은 약 12,800장, 음악은 약 6,000곡을 저장할 수 있어요.`;
      case 128:
        return `여유롭게 쓰기 좋아요, 고화질 사진과 영화 저장까지!
        사진은 약 25,600장, 영화는 약80편을 저장할 수 있어요.`;
      case 256:
        return `자유롭게 쓸 수 있어요. 사진, 음악, 영화와 떨어질 수 없다면!
          사진은 약 51,200장, 영화는 약 320편을 저장할 수 있어요.`;
      case 512:
        return `사진은 102,400장, 음악은 51,200곡 이상 저장할 수 있어요.`;
      default:
        return "";
    }
  };

  const JoinBtn = () => {
    const typeArr = ["기기변경", "번호이동", "신규가입"];

    return (
      <>
        {typeArr.map((row) => (
          <LGButton
            key={row}
            variant={active.registration === row ? "dark" : "outline-dark"}
            size="lg"
            rec
            children={row}
            style={{ margin: "0px 5px" }}
            onClick={() => setActive({ ...active, registration: row })}
          />
        ))}
      </>
    );
  };

  return (
    <Row justify="center">
      <MessageModal
        open={open}
        setOpen={setOpen}
        type={modalMsg.type}
        message={modalMsg.message}
        btnMessage={modalMsg.btnMessage}
        func={modalMsg.func}
      />
      <PhoneInfo.ImgContainer>
        <PhoneInfo.ImageMain img={active.color.phoneImgList[nowImg]} />
        <Row justify="center">
          {active.color.phoneImgList.map((row, i) => (
            <PhoneInfo.ImageSub
              key={row}
              img={row}
              now={nowImg === i}
              onClick={() => setNowImg(i)}
            />
          ))}
        </Row>
        {active.phone.phoneId === 18 && (
          <LGButton
            style={{ width: "100%" }}
            onClick={() => navigate("/size")}
            children="실제 크기 측정하기"
          />
        )}
      </PhoneInfo.ImgContainer>
      <PhoneInfo.Container>
        <div className="phone-info">
          <PhoneInfo.Info>
            <h1>{active.phone.titleName}</h1>
            <h4>{`(${active.phone.model})`}</h4>
          </PhoneInfo.Info>
          <PhoneInfo.Info style={{ marginBottom: "20px" }}>
            <p>{active.phone.titleSub}</p>
            <Rating
              name="read-only"
              value={5}
              readOnly
              size="small"
              style={{ float: "right" }}
            />
          </PhoneInfo.Info>
          <PhoneInfo.Info>
            <h4 style={{ margin: "0 10px 0 0" }}>색상</h4>
            <p>{active.color.name}</p>
          </PhoneInfo.Info>
          <PhoneInfo.Info style={{ marginBottom: "20px" }}>
            {active.phone.colorList.map((row) => (
              <ColorDot
                key={row.hexCode}
                hexCode={row.hexCode}
                color={active.color}
                onClick={() => setActive({ ...active, color: row })}
              />
            ))}
          </PhoneInfo.Info>
          <PhoneInfo.Info children="저장공간" />
          <Row justify="left" style={{ margin: "10px 0px" }}>
            <LGButton
              variant="outline-dark"
              size="lg"
              rec
              children={`${active.phone.phoneInfo.memory}GB`}
            />
          </Row>
          <PhoneInfo.Info
            children={<p>{storageText(active.phone.phoneInfo.memory)}</p>}
            style={{ marginBottom: "20px" }}
          />
          <PhoneInfo.Info children="가입유형" />
          <Row justify="left" style={{ margin: "10px 0px" }}>
            {JoinBtn()}
          </Row>

          <PhoneInfo.Price>
            <h1>월 {priceInfo.total.toLocaleString()}원</h1>
            <p>
              {active.plan.name}, {discountType(active.discount)} 기준
            </p>
            <SideFlex>
              <p className="left" style={{ width: "20%", color: "#000000" }}>
                휴대폰
              </p>
              <p className="left" style={{ width: "80%", color: "#000000" }}>
                {priceInfo.phone.toLocaleString()} 원
              </p>
            </SideFlex>
            <SideFlex>
              <p className="left" style={{ width: "20%", color: "#000000" }}>
                통신료
              </p>
              {active.discount < 1 ? (
                <p className="left" style={{ width: "80%", color: "#000000" }}>
                  {priceInfo.plan.toLocaleString()} 원
                </p>
              ) : (
                <p className="left" style={{ width: "80%" }}>
                  <span style={{ color: "#000000" }}>
                    {priceInfo.plan.toLocaleString()} 원
                  </span>{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                    }}
                  >
                    {active.plan.monthPrice.toLocaleString()} 원
                  </span>
                  <span
                    style={{
                      color: "#e6007e",
                    }}
                  >
                    (25% ↓)
                  </span>
                </p>
              )}
            </SideFlex>
            <SideFlex>
              <p className="left" style={{ width: "20%", color: "#000000" }}>
                정상가
              </p>
              <p className="left" style={{ width: "80%", color: "#000000" }}>
                {active.phone.price.toLocaleString()} 원
              </p>
            </SideFlex>
          </PhoneInfo.Price>
          <PhoneInfo.Info>
            <Row justify="center">
              <LGButton variant="outline-dark" size="lg" onClick={goCart}>
                장바구니
              </LGButton>
              <LGButton variant="primary" size="lg" onClick={goToOrder}>
                온라인 주문
              </LGButton>
            </Row>
          </PhoneInfo.Info>
        </div>
      </PhoneInfo.Container>
    </Row>
  );
}
