// writer : 전웅재
import { useEffect, useState } from "react";
// ******************************
const useFilter = ({ initState, initList ,callback ,filterModule, orderModule }) => {
  const [state, setState] = useState(initState);
  const [list, setList] = useState(initList);
  const [orderType,setOrderType] = useState("")
  const [actualPay,setActualPay] = useState([])
  // ******************************

  useEffect(() => {
    const filteredList = filterModule(state,list)
    setList(filteredList)
    if(orderType){

    }
  }, [state]);

  useEffect(() => {
    const orderedList = orderModule(orderType,list,actualPay)
    setList(orderedList)
  }, [orderType]);
  
  // ******************************
  
  const handleChange = (e, phones) => {
    const { name, value } = e.target;
    setList(phones)
    setState(() => ({
      ...state,
      [name]: value
    }));
    
    switch (name) {
      case "plan":
        callback("plan",e.target)
        break;
      case "disCountType":
        callback("disCountType",e.target)
        break;
      default:
        break;
    }
  };

  const handleOrder = (e,phones,actualPay) => {
    const { value } = e.target;
    setList(phones)
    setActualPay(actualPay)
    setOrderType(value)
  };

  const handleData = phones => {
    setList(phones)
  };

  const resetFilter = () => {
    setState(initState)
  }

  return {
    handleChange,
    handleOrder,
    handleData,
    state,
    list
  };
};

export default useFilter;
