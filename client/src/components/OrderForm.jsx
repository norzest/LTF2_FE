// writer : 전웅재
import { Button, FormControl, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Styles from "../styles/orderForm";
import orderfiled from "../assets/orderfiled";
import { FormButton, LGButton } from "./Button";
import MessageModal from "./MessageModal";
import { check, validator } from "../util/validator";
import useForm from "../util/useForm";

function OrderForm({ showUserInfo, setCallback, setRequires }) {
  const [userData, setUserData] = useState({
    userType: "내국인",
    authType: "휴대폰",
    userName: "",
    userId: "",
    userPhone: "",
  });
  const { handleNumber, handleChange, handleAuth, handleBlur, state, errors } =
    useForm({
      initState: userData,
      callback: () => {
        showUserInfo();
        setCallback(state, `${state.authType} 인증 완료!`);
      },
      validator,
    });

  const iterButton = (key) => {
    switch (key) {
      case "고객 유형":
        return orderfiled[key].map((v, i) => (
          <FormButton
            key={i}
            name="userType"
            value={v}
            check={check(state.userType, v)}
            onClick={handleChange}
          >
            {v}
          </FormButton>
        ));
      case "인증 방법":
        return orderfiled[key].map((v, i) => (
          <FormButton
            key={i}
            name="authType"
            value={v}
            check={check(state.authType, v)}
            onClick={handleChange}
          >
            {v}
          </FormButton>
        ));
      default:
        break;
    }
  };

  useEffect(() => {
    setRequires("orderForm", false);
  }, [state]);

  return (
    <Styles.FormTable>
      <tbody>
        <Styles.FormRow>
          <Styles.FormTh>고객 유형</Styles.FormTh>
          <Styles.FormTd>{iterButton("고객 유형")}</Styles.FormTd>
        </Styles.FormRow>
        <Styles.FormRow>
          <Styles.FormTh>이름</Styles.FormTh>
          <Styles.FormTd>
            <TextField
              variant="standard"
              color="error"
              placeholder="이름"
              name="userName"
              required
              onChange={handleChange}
              error={errors.userName ? true : false}
              helperText={errors.userName}
              onBlur={handleBlur}
            />
          </Styles.FormTd>
        </Styles.FormRow>
        <Styles.FormRow>
          <Styles.FormTh>주민등록 번호</Styles.FormTh>
          <Styles.FormTd>
            <TextField
              variant="standard"
              color="error"
              type="password"
              name="userId"
              required
              inputProps={{ maxLength: 13 }}
              placeholder="'-' 없이 숫자만 입력"
              value={state.userId}
              error={errors.userId ? true : false}
              helperText={errors.userId}
              onChange={handleNumber}
              onBlur={handleBlur}
            />
          </Styles.FormTd>
        </Styles.FormRow>
        <Styles.FormRow>
          <Styles.FormTh>인증 방법</Styles.FormTh>
          <Styles.FormTd>{iterButton("인증 방법")}</Styles.FormTd>
        </Styles.FormRow>
        <Styles.FormRow>
          <Styles.FormTh>기기 변경 휴대폰 번호</Styles.FormTh>
          <Styles.FormTd>
            <TextField
              variant="standard"
              color="error"
              name="userPhone"
              placeholder="'-'없이 숫자만 입력"
              required
              inputProps={{ maxLength: 11 }}
              onChange={handleNumber}
              onBlur={handleBlur}
              error={errors.userPhone ? true : false}
              helperText={errors.userPhone}
            />
            <LGButton
              type="button"
              size="sm"
              onClick={() => {
                handleAuth(state, () => {
                  setRequires("orderForm", true);
                });
              }}
            >
              인증하기
            </LGButton>
          </Styles.FormTd>
        </Styles.FormRow>
      </tbody>
    </Styles.FormTable>
  );
}

export default OrderForm;
