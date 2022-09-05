// writer : 전웅재
export const validator = (state, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "userId":
      validateUserID(state.userType, state.userId, errors);
      break;
    case "userName":
      validateName(state.userName, errors);
      break;
    case "userPhone":
    case "ablePhone":
      let phone = state.userPhone;
      if (phone === undefined) phone = state.ablePhone;
      validatePhoneNumber(fieldName, phone, errors);
      break;
    case "email":
      validateEmail(state.email, errors);
      break;
    case "address":
      validateAddress(state.address, errors);
      break;
    case "cardNumber":
      validateCardInfo(state, errors);
      break;
    case "cardExpiration":
      validateCardExpiration(state, errors);
      break;
    case "account":
      validateAccountInfo(state, errors);
      break;
    default:
  }
  return errors;
};

export const check = (data, value) => {
  return data === value;
};

// ******************************
function validatePhoneNumber(fieldName, phone, errors) {
  let result = true;
  const phoneRe = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const phoneObject = phoneRe.test(phone);
  if (!phoneObject || phone.length < 11) {
    errors[fieldName] = "번호를 다시 확인해주세요.";
    result = false;
  }
  return result;
}
// ******************************
function validateUserID(userType, userId, errors) {
  let result = true;
  if (!userId) {
    errors.userId = "주민등록번호를 입력해 주세요.";
    result = false;
  } else if (userId.length != 13) {
    errors.userId = "주민등록번호를 올바르게 입력해 주세요.";
    result = false;
  } else {
    let re;
    userType === "외국인"
      ? (re = /^(\d{6})?(\d{5}[7-9]\d{1})$/)
      : (re =
          /(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))[1-4][0-9]{6}$/);
    result = re.test(String(userId));
    if (!result) errors.userId = "바르지 않은 형식입니다.";
  }
  return result;
}

// ******************************
function validateName(name, errors) {
  let result = true;
  if (name.length === 0) {
    errors.userName = "이름을 입력해주세요.";
    result = false;
  }
  return result;
}

// ******************************
function validateEmail(email, errors) {
  let result = true;

  if (!email) {
    errors.email = "이메일을 입력해주세요";
    result = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "잘못된 이메일 양식 입니다.";
  }
  return result;
}
// ******************************
function validateAddress(address, errors) {
  let result = true;

  if (!address) {
    errors.address = "주소를 입력해주세요";
    result = false;
  }
  return result;
}
// ******************************
function validateCardInfo(state, errors) {
  let result = true;
  if (state.payType !== "신용 카드") return result;
  if (!state.cardNumber) {
    errors.cardNumber = "카드 번호를 입력해주세요";
    result = false;
  } else {
    const cardRe = /(5[1-5]\d{14})|(4\d{12})(\d{3}?)|3[47]\d{13}|(6011\d{12})/;
    if (!cardRe.test(state.cardNumber)) {
      errors.cardNumber = "카드 번호를 다시 확인해주세요";
      result = false;
    }
  }
  return result;
}
// ******************************
function validateCardExpiration(state, errors) {
  let result = true;
  if (state.payType !== "신용 카드") return result;
  if (!state.cardExpiration) {
    errors.cardExpiration = "카드 유효기간을 입력해주세요";
    result = false;
  } else {
    const expirationRe = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expirationRe.test(state.cardExpiration)) {
      errors.cardExpiration = "카드 유효기간을 다시 확인해주세요";
      result = false;
    }
  }
  return result;
}

// ******************************
function validateAccountInfo(state, errors) {
  let result = true;
  if (state.payType !== "계좌이체") return result;
  if (!state.account) {
    errors.account = "계좌번호를 입력해주세요.";
    result = false;
  } else {
    // const accountRe = /([0-9,-]{3,6}\-[0-9,\-]{2,6}\-[0-9,\-])/
    // if(!accountRe.test(state.account)){
    //   errors.account = "유효하지 않은 계좌 번호 입니다."
    //   result = false
    // }
  }

  return result;
}
