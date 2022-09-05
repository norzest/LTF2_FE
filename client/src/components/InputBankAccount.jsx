// writer : 전웅재
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { LGButton } from "./Button";
import MessageModal from "./MessageModal";
import * as Styles from "../styles/orderForm";

const banks = ["국민은행", "우리은행", "기업은행"];

function InputBankAccount({
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
        <Styles.FormTh>은행 계좌번호</Styles.FormTh>
        <Styles.FormTd>
          <FormControl required sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="bank">은행 선택</InputLabel>
            <Select
              labelId="bank"
              value={state.bank}
              name="bank"
              onChange={handleChange}
            >
              {banks.map((name) => (
                <MenuItem key={name} name="bank" value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
              }}
            >
              <TextField
                variant="standard"
                color="error"
                name="account"
                placeholder="'-' 없이 입력해 주세요"
                error={errors.account ? true : false}
                helperText={errors.account}
                onChange={handleNumber}
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
            </div>
          </FormControl>
        </Styles.FormTd>
      </Styles.FormRow>
    </>
  );
}

export default InputBankAccount;
