/* eslint-disable react-hooks/exhaustive-deps */
// writer : 전웅재
import React from "react";
import { useNavigate } from "react-router-dom";
import { inputComparePhone } from "../util/inputCompare";
import * as Styles from "../styles/phoneStyle";
import { LGButton } from "./Button";
import { priceCalcbyId } from "../util/priceCalc";
import { useState } from "react";
import { useEffect } from "react";
import MessageModal from "./MessageModal";
import goToCart from "../util/goToCart";

export default function Phone({
  phone,
  modalShow,
  saveCart,
  propsList,
  filterOpt,
  search,
  setActualPay,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [priceInfo, setPriceInfo] = useState({
    phone: 0,
    plan: 0,
    total: 0,
  });

  const tech = phone.telecomTech === "5G" ? 1 : 17;

  const comparePlanId = search ? tech : filterOpt.planId;

  const [modalMsg, setModalMsg] = useState({
    type: "",
    message: "",
    btnMessage: "",
    func: "",
  });
  const changeModalMsg = (type, message, btnMessage, func) =>
    setModalMsg({ type, message, btnMessage, func });

  const goCart = () => {
    const active = {
      phone,
      plan: { planId: comparePlanId },
      ship: "우체국 택배",
      date: new Date(),
      color: phone.colorList[0],
      registration: "신규가입",
      installment: filterOpt.disCountType === 12 ? 12 : 24,
      discount: filterOpt.disCountType,
    };
    goToCart(active, saveCart, changeModalMsg, navigate, setOpen);
  };

  useEffect(() => {
    const tech = phone.telecomTech === "5G" ? 1 : 17;
    search && priceCalcbyId(phone.phoneId, tech, -1, 24, setPriceInfo);
  }, []);

  useEffect(() => {
    setActualPay((prev) => ({
      ...prev,
      [phone.phoneId]: priceInfo,
    }));
  }, [priceInfo]);

  useEffect(() => {
    if (!search) {
      let month = 24;
      if (filterOpt.disCountType !== -1) month = filterOpt.disCountType;
      priceCalcbyId(
        phone.phoneId,
        filterOpt.planId,
        filterOpt.disCountType,
        month,
        setPriceInfo
      );
    }
  }, [filterOpt]);

  const compareDisabled =
    propsList.comparePhoneList.filter((row) => row.phoneId).length === 3;
  return (
    <Styles.CardLayout>
      <MessageModal
        open={open}
        setOpen={setOpen}
        type={modalMsg.type}
        message={modalMsg.message}
        btnMessage={modalMsg.btnMessage}
        func={modalMsg.func}
      />
      <Styles.CardHeader onClick={() => navigate(`/detail/${phone.phoneId}`)}>
        <Styles.ImageLayout>
          <Styles.Image src={phone.previewImg} />
          <Styles.ColorList>
            {phone.colorList.map((color, idx) => (
              <Styles.Color
                key={idx}
                title={color.name}
                background={color.hexCode}
              />
            ))}
          </Styles.ColorList>
        </Styles.ImageLayout>
        <Styles.Title>{phone.titleName}</Styles.Title>
        <Styles.SubTitle>
          {/* 대표 요금제 이름 */}
          {priceInfo.planName}
        </Styles.SubTitle>
      </Styles.CardHeader>
      <Styles.CardBody>
        <Styles.PlanLayout>
          <Styles.PhoneMoney>
            {/* 월 핸드폰 납부 금액 */}
            {`휴대폰 월 ${priceInfo.phone.toLocaleString()}원`}
          </Styles.PhoneMoney>
          <Styles.PlanMoney>
            {/* 월 요금 납부 금액 */}
            {`통신료 월 ${priceInfo.plan.toLocaleString()}원`}
          </Styles.PlanMoney>
          <Styles.TotalMoney>
            {/* 월 총 납부 금액 */}
            {`월 ${priceInfo.total.toLocaleString()}원`}
          </Styles.TotalMoney>
        </Styles.PlanLayout>
      </Styles.CardBody>
      <Styles.CardFooter>
        <Styles.OrderNumber>
          {/* 총 구매자 */}
          구매 {phone.orderCount}명
        </Styles.OrderNumber>
        <Styles.CompareButton>
          <LGButton
            variant={
              propsList.comparePhoneList.findIndex(
                (row) => row.phoneId === phone.phoneId
              ) === -1
                ? "light"
                : "dark"
            }
            size="sm"
            disabled={
              propsList.comparePhoneList.findIndex(
                (row) => row.phoneId === phone.phoneId
              ) === -1 && compareDisabled
            }
            onClick={() => inputComparePhone(phone, comparePlanId, propsList)}
          >
            비교하기
          </LGButton>
          <Styles.CartButton onClick={goCart} />
        </Styles.CompareButton>
      </Styles.CardFooter>
    </Styles.CardLayout>
  );
}
