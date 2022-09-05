/* eslint-disable react-hooks/exhaustive-deps */
// writer: 권혁준
import * as Compare from "../styles/compareStyle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { LGButton } from "./Button";
import { deleteAll, deleteOne } from "../util/inputCompare";
import { priceCalc } from "../util/priceCalc";
import { discountType } from "../util/transform";

export default function ComparedPopup({ modalShow, setModalShow, propsList }) {
  const filterArr = propsList.comparePhoneList.filter((row) => row.phoneId);

  const togglePopup = () =>
    setModalShow({ ...modalShow, comparePopup: !modalShow.comparePopup });

  const toggle = () => {
    switch (true) {
      case !modalShow.comparePopup && filterArr.length !== 0: {
        return "remain";
      }
      case !modalShow.comparePopup && filterArr.length === 0: {
        return "none";
      }
      default:
        return "show";
    }
  };

  const openModal = () => {
    if (filterArr.length >= 2) {
      setModalShow({ ...modalShow, compare: true });
    }
  };

  const priceInfo = (i) => {
    const dataList = propsList.compareDataList[i];

    const phone = propsList.comparePhoneList[i];
    const plan = dataList.plan;
    const supportPrice = dataList.supportPrice;
    const discount = dataList.discount;
    const installment = dataList.installment;
    return priceCalc(phone, plan, supportPrice, discount, installment);
  };

  useEffect(() => {
    if (filterArr.length === 0 && modalShow.comparePopup) {
      setModalShow({ ...modalShow, comparePopup: false });
    } else if (filterArr.length !== 0 && !modalShow.comparePopup) {
      setModalShow({ ...modalShow, comparePopup: true });
    }
  }, [propsList.comparePhoneList]);
  return (
    <div>
      <Compare.PopUp show={toggle()} active={!modalShow.comparePopup}>
        <Compare.PopUpTitle>
          <h3>
            비교하기 (
            {propsList.comparePhoneList.filter((row) => row.phoneId).length})
          </h3>

          <Compare.PopUpCloseBtn
            children={
              modalShow.comparePopup ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )
            }
            onClick={togglePopup}
          />
        </Compare.PopUpTitle>
        <Compare.PopUpContent show={modalShow.comparePopup}>
          {propsList.comparePhoneList.map((row, i) => {
            if (row.phoneId) {
              return (
                <Compare.PopUpPhone key={i}>
                  <Compare.PopUpPhoneImg
                    src={row.previewImg || row.colorList[0].phoneImgList[0]}
                  />
                  <Compare.PopUpPhoneInfo>
                    <strong>{row.titleName}</strong>
                    <strong style={{ fontSize: "12px" }}>
                      {propsList.compareDataList[i].plan.name} /{" "}
                      {discountType(propsList.compareDataList[i].discount)} /{" "}
                      {propsList.compareDataList[i].installment === 1
                        ? "일시불"
                        : propsList.compareDataList[i].installment +
                          "개월 할부"}
                    </strong>
                    <h2>월 {priceInfo(i).total.toLocaleString()}원</h2>
                  </Compare.PopUpPhoneInfo>
                  <Compare.PopUpDeleteBtn
                    children={<CloseIcon />}
                    onClick={() => deleteOne(i, propsList)}
                  />
                </Compare.PopUpPhone>
              );
            } else
              return (
                <Compare.PopUpPhone key={i}>기기 미선택</Compare.PopUpPhone>
              );
          })}
          <Compare.PopUpBtnGroup>
            <Compare.NopeToolTip
              title={
                filterArr.length < 2 ? (
                  <p>
                    2개 이상의 상품을 선택하셔야 <br />
                    비교하기가 가능합니다.
                  </p>
                ) : (
                  ""
                )
              }
              placement="top"
            >
              <LGButton
                variant={filterArr.length < 2 ? "secondary" : "primary"}
                children="비교하기"
                onClick={openModal}
              />
            </Compare.NopeToolTip>
            <LGButton
              variant="outline-dark"
              children="전체삭제"
              onClick={() => deleteAll(propsList)}
            />
          </Compare.PopUpBtnGroup>
        </Compare.PopUpContent>
      </Compare.PopUp>
    </div>
  );
}
