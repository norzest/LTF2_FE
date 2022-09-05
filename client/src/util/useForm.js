// writer : 전웅재
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postOrder } from "../api/OrderAPI";

// ******************************
const useForm = ({ initState, callback, validator }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate();
// ******************************
  useEffect(() => {
    const isValidErrors = Object.values(errors).filter(error => typeof error !== "undefined")
        .length > 0;
    // 버튼 누르고, errors 메시지가 없다면,
    if (isClicked && !isValidErrors) {
      callback();
      setIsClicked(false);
    }
  }, [errors]);

// ******************************
  const handleChange = e => {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value
    }));
  };

// ******************************
  const handleBlur = e => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0]
    }));
  };

// ******************************
  const handleAuth = (checkData , callback) => {
    Object.keys(checkData).map((k) => {
        const fieldName = k
        const faildFiels = validator(state, fieldName);
        setErrors((prev) => ({ ...prev, [fieldName]: faildFiels[fieldName] }));
    })
    setIsClicked(true)
    const chk = Object.values(errors).filter(error => typeof error !== "undefined").length === 0
    if (chk)
      callback()
  };

// ******************************
  const handleSubmit = async (data, callback) => {
    const {phoneId, planId,colorId, deliveryType,userType, userName,userPhone, ablePhone, email, address,billType,payType} = data
    const body = {
      phoneId,
      planId,
      colorId,
      deliveryType,
      userType, userName,userPhone, ablePhone, email, address,billType,payType
    }
    await postOrder(body).then((res) =>{
      callback({},"주문을 완료했습니다!",() => navigate("/"))
    }).catch((e) =>{
      callback({},"주문에 실패했습니다. 다시 시도해주세요.")
      console.log(e)
    })
  };

// ******************************
  const handleNumber = e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    handleChange(e);
  }

  return {
    handleChange,
    handleAuth,
    handleSubmit,
    handleBlur,
    handleNumber,
    state,
    errors,
    auth
  };
};

export default useForm;
