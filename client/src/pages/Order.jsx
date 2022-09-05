// writer : 전웅재
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  Checkbox,
} from "@mui/material";
import React, { useEffect } from "react";
import { PageContainer } from "../components/PageContainer";
import { pink } from "@mui/material/colors";
import * as Styles from "../styles/orderStyle";
import OrderPhoneInfo from "../components/OrderPhoneInfo";
import OrderForm from "../components/OrderForm";
import { useState } from "react";
import OrderUserInfoForm from "../components/OrderUserInfoForm";
import { LGButton } from "../components/Button";
import MessageModal from "../components/MessageModal";
import { useLocation } from "react-router-dom";

export default function Order() {
  const { state } = useLocation();
  const [data, setData] = useState({
    phoneId: state.phone.phoneId,
    planId: state.plan.planId,
    colorId: state.color.colorId,
    deliveryType: state.ship,
    userType: "",
    authType: "",
    userName: "",
    userId: "",
    userPhone: "",
    ablePhone: "",
    email: "",
    address: "",
    billType: "",
    payType: "",
    cardNumber: "",
    cardExpiration: "",
    bank: "",
    account: "",
  });
  const [reqired, setReqired] = useState({
    agreement: false,
    orderForm: false,
    infoForm: false,
  });
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    btnMessage: "확인",
    func: () => {
      setShow(true);
      setOpen(false);
    },
  });
  const [show, setShow] = useState(false);
  const setCallback = (updateData, msg, addFunc) => {
    if (addFunc === undefined)
      setModalMsg(() => ({
        ...modalMsg,
        message: msg,
      }));
    else
      setModalMsg(() => ({
        ...modalMsg,
        message: msg,
        func: () => {
          setShow(true);
          setOpen(false);
          addFunc();
        },
      }));
    setOpen(true);
    Object.keys(updateData).map((k) => {
      setData((prev) => ({ ...prev, [k]: updateData[k] }));
    });
  };

  const setRequires = (filed, value) => {
    value === undefined
      ? setReqired((prev) => ({ ...prev, [filed]: !prev[filed] }))
      : setReqired((prev) => ({ ...prev, [filed]: value }));
  };

  return (
    <PageContainer>
      <Styles.OrderLayout>
        <Styles.OrderInfoLayout>
          <Grid container justify="center" spacing={2}>
            <Grid item md={2}>
              <Styles.AgreeTitle>이용 약관 동의</Styles.AgreeTitle>
            </Grid>
            <Grid item md={9} style={{ padding: "20px", marginTop: "10px" }}>
              <Accordion expanded={expand}>
                <AccordionSummary
                  expandIcon={
                    <ExpandMore
                      onClick={() => {
                        setExpand((prev) => !prev);
                      }}
                    />
                  }
                >
                  <Checkbox
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                    onChange={() => {
                      setRequires("agreement");
                    }}
                  />
                  <Styles.AgreeSubTilte>모든 약관에 동의</Styles.AgreeSubTilte>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    전체동의는 필수 및 선택 동의가 포함되어 있으며, 개별 동의를
                    원하실 경우 펼쳐보기로 선택해 주세요 <br />
                    (필수 : LG U+ 서비스 이용 및 개인 정보 수집 및 처리. 선택 :
                    고객 혜택/광고 정보 제공 및 가입절차 설명/권유를 위한 동의)
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
          <MessageModal
            open={open}
            setOpen={setOpen}
            message={modalMsg.message}
            btnMessage={modalMsg.btnMessage}
            func={modalMsg.func}
          />
          <Styles.UserProofTitle>가입자 본인인증</Styles.UserProofTitle>
          <OrderForm
            showUserInfo={setShow}
            setCallback={setCallback}
            setRequires={setRequires}
          />
          {show && (
            <>
              <Styles.UserProofTitle>가입자 정보</Styles.UserProofTitle>
              <OrderUserInfoForm
                setCallback={setCallback}
                setRequires={setRequires}
                reqired={reqired}
                data={data}
              />
            </>
          )}
        </Styles.OrderInfoLayout>
        <Styles.PhoneInfoLayout>
          <OrderPhoneInfo state={state} />
        </Styles.PhoneInfoLayout>
      </Styles.OrderLayout>
    </PageContainer>
  );
}
