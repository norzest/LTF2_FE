// writer : 전웅재
import { Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Styles from "../styles/orderForm";
import useForm from "../util/useForm";
import { check, validator } from "../util/validator";
import { FormButton, LGButton } from "./Button";
import InputBankAccount from "./InputBankAccount";
import InputCardInfo from "./InputCardInfo";

function OrderUserInfoForm({ setCallback, setRequires, reqired, data }) {
  const [disable, setDisable] = useState(true);
  const [userData, setUserData] = useState({
    ablePhone: "",
    email: "",
    address: "",
    billType: "문자 메세지",
    payType: "신용 카드",
    cardNumber: "",
    cardExpiration: "",
    bank: "국민은행",
    account: "",
  });
  const {
    handleChange,
    handleAuth,
    handleSubmit,
    handleBlur,
    handleNumber,
    state,
    errors,
  } = useForm({
    initState: userData,
    callback: () => {
      setCallback(state, `${state.payType} 인증 완료!`);
    },
    validator,
  });

  useEffect(() => {
    setRequires("infoForm", false);
  }, [state]);

  useEffect(() => {
    console.log(reqired);
    setDisable(Object.values(reqired).includes(false));
  }, [reqired]);
  return (
    <>
      <Styles.FormTable>
        <tbody>
          <Styles.FormRow>
            <Styles.FormTh>연락 가능한 전화번호</Styles.FormTh>
            <Styles.FormTd>
              <TextField
                variant="standard"
                color="error"
                name="ablePhone"
                placeholder="'-'없이 숫자만 입력"
                inputProps={{ maxLength: 11 }}
                error={errors.ablePhone ? true : false}
                helperText={errors.ablePhone}
                onChange={handleNumber}
                onBlur={handleBlur}
              />
            </Styles.FormTd>
          </Styles.FormRow>
          <Styles.FormRow>
            <Styles.FormTh>이메일 주소</Styles.FormTh>
            <Styles.FormTd>
              <TextField
                variant="standard"
                color="error"
                name="email"
                placeholder="xxxx@lguplus.com"
                error={errors.email ? true : false}
                helperText={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Styles.FormTd>
          </Styles.FormRow>
          <Styles.FormRow>
            <Styles.FormTh>주소</Styles.FormTh>
            <Styles.FormTd>
              <TextField
                variant="standard"
                color="error"
                name="address"
                placeholder="주소를 입력해주세요"
                error={errors.address ? true : false}
                helperText={errors.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Styles.FormTd>
          </Styles.FormRow>
          <Styles.FormRow>
            <Styles.FormTh>청구서 받는 방법</Styles.FormTh>
            <Styles.FormTd>
              <FormButton
                name="billType"
                value="문자 메세지"
                check={check(state.billType, "문자 메세지")}
                onClick={handleChange}
              >
                문자 메시지 (요약정보)
              </FormButton>
              <FormButton
                name="billType"
                value="이메일"
                check={check(state.billType, "이메일")}
                onClick={handleChange}
              >
                이메일 (상세정보)
              </FormButton>
            </Styles.FormTd>
          </Styles.FormRow>
          <Styles.FormRow>
            <Styles.FormTh>요금 납부 방법</Styles.FormTh>
            <Styles.FormTd>
              <FormButton
                name="payType"
                value="신용 카드"
                check={check(state.payType, "신용 카드")}
                onClick={handleChange}
              >
                신용 카드
              </FormButton>
              <FormButton
                name="payType"
                value="계좌 이체"
                check={check(state.payType, "계좌 이체")}
                onClick={handleChange}
              >
                계좌 이체
              </FormButton>
            </Styles.FormTd>
          </Styles.FormRow>
          {state.payType === "신용 카드" ? (
            <InputCardInfo
              handleChange={handleChange}
              handleNumber={handleNumber}
              handleBlur={handleBlur}
              handleAuth={handleAuth}
              setRequires={setRequires}
              state={state}
              errors={errors}
            />
          ) : (
            <InputBankAccount
              handleChange={handleChange}
              handleNumber={handleNumber}
              handleBlur={handleBlur}
              handleAuth={handleAuth}
              setRequires={setRequires}
              state={state}
              errors={errors}
            />
          )}
        </tbody>
      </Styles.FormTable>
      <LGButton
        type="button"
        size="lg"
        style={{ margin: "20px" }}
        disabled={disable}
        onClick={() => {
          handleSubmit(data, setCallback);
        }}
      >
        주문하기
      </LGButton>
    </>
  );
}

export default OrderUserInfoForm;
