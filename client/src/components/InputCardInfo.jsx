// writer : 전웅재
import { Input, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import * as Styles from "../styles/orderForm";
import { LGButton } from "./Button";
import MessageModal from "./MessageModal";

function InputCardInfo({
  handleChange,
  handleNumber,
  handleBlur,
  handleAuth,
  setRequires,
  state,
  errors,
}) {
  return (
    <>
      <Styles.FormRow>
        <Styles.FormTh>신용카드 번호</Styles.FormTh>
        <Styles.FormTd>
          <TextField
            variant="standard"
            color="error"
            name="cardNumber"
            placeholder="'-' 없이 숫자만 입력"
            error={errors.cardNumber ? true : false}
            helperText={errors.cardNumber}
            onChange={handleNumber}
            onBlur={handleBlur}
          />
        </Styles.FormTd>
      </Styles.FormRow>
      <Styles.FormRow>
        <Styles.FormTh>유효 기간</Styles.FormTh>
        <Styles.FormTd>
          <TextField
            variant="standard"
            color="error"
            name="cardExpiration"
            placeholder="MM/YY"
            error={errors.cardExpiration ? true : false}
            helperText={errors.cardExpiration}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <LGButton
            type="button"
            size="sm"
            onClick={() => {
              handleAuth(state, () => {
                setRequires("infoForm", true);
              });
            }}
          >
            인증하기
          </LGButton>
        </Styles.FormTd>
      </Styles.FormRow>
    </>
  );
}

export default InputCardInfo;
