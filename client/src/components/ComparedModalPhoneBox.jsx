// writer: 권혁준
import * as ModalStyle from "../styles/modalStyle";
import * as Compare from "../styles/compareStyle";
import { priceCalc } from "../util/priceCalc";
import { LGButton } from "./Button";
import DataOptSelect from "./DataOptSelect";
import { useNavigate } from "react-router-dom";
import { getPhoneByPhoneId } from "../api/PhoneAPI";
import { getPublicSupportByPhoneIdAndPlanId } from "../api/PublicSupportAPI";
import CloseIcon from "@mui/icons-material/Close";
import { deleteAll, deleteOne } from "../util/inputCompare";

export function ComparedModalPhoneBox({
  opt,
  setOpt,
  modalShow,
  setModalShow,
  propsList,
  plans,
}) {
  const navigate = useNavigate();

  const handleAllClose = () =>
    setModalShow({ ...modalShow, compare: false, comparePopup: false });

  const handleOptChange = (e, i, optKey) => {
    const returnArr = [...opt];
    returnArr[i][optKey] = e.target.value;
    if (optKey === "product") {
      returnArr[i].phoneId = "";
    }
    setOpt(returnArr);
  };

  const goToDetail = (row) => {
    deleteAll(propsList);
    handleAllClose();
    navigate(`/detail/${row.phoneId}`);
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

  const handleData = async (id) => {
    const [phoneData, planData, supportPrice] = await getPhoneByPhoneId(
      id
    ).then(async (d) => {
      if (d.status === 404) {
        return ["error", "error", "error"];
      } else {
        const defaultPlan = plans.filter(
          (row) => row.telecomTech === d.phoneDetail.telecomTech
        )[0];
        return await Promise.all([
          d,
          defaultPlan,
          defaultPlan.planType === "다이렉트"
            ? 0
            : getPublicSupportByPhoneIdAndPlanId({
                phone_id: id,
                plan_id: defaultPlan.planId,
              }).then((d) => {
                if (d.status === 404) {
                  return 0;
                } else {
                  return d.PublicSupportPrice;
                }
              }),
        ]);
      }
    });
    if (phoneData === "error") {
      return "error";
    } else
      return {
        phone: phoneData.phoneDetail,
        plan: planData,
        supportPrice: supportPrice,
      };
  };

  const handleFetch = async (i) => {
    const returnPhoneArr = [...propsList.comparePhoneList];
    const returnDataArr = [...propsList.compareDataList];
    const values = await handleData(opt[i].phoneId);
    returnPhoneArr[i] = values.phone;
    returnDataArr[i] = {
      registration: "기기변경",
      installment: 24,
      discount: values.plan.planType === "다이렉트" ? 0 : -1,
      plan: values.plan,
      supportPrice: values.supportPrice,
    };
    returnDataArr[i].plan = values.plan;
    returnDataArr[i].supportPrice = values.supportPrice;
    propsList.setCompareDataList(returnDataArr);
    propsList.setComparePhoneList(returnPhoneArr);
  };

  const deleteOpt = (idx) => {
    deleteOne(idx, propsList);
    const returnArr = [...opt];
    returnArr[idx] = { tech: "5G", product: "", phoneId: "" };
    setOpt(returnArr);
  };

  const addDisabled = (row) => {
    return Object.keys(row)
      .map((obj) => row[obj] === "")
      .includes(true);
  };

  return (
    <ModalStyle.Row>
      {propsList.comparePhoneList.map((row, i) => {
        if (row.phoneId) {
          return (
            <Compare.ModalPhoneBox key={"box" + i}>
              <Compare.ModalDeleteBtn
                children={<CloseIcon />}
                onClick={() => deleteOpt(i)}
              />
              <Compare.ModalPhoneImg
                src={row.previewImg || row.colorList[0].phoneImgList[0]}
              />
              <Compare.ModalPhoneText>
                <p children={row.titleName} />
                <h2 children={`월 ${priceInfo(i).total.toLocaleString()}원`} />
              </Compare.ModalPhoneText>
              <Compare.ModalPhoneFooter>
                <LGButton
                  children="자세히보기"
                  size="sm"
                  style={{ marginRight: "10px" }}
                  onClick={() => goToDetail(row)}
                />
                <LGButton
                  children="장바구니"
                  size="sm"
                  variant="light"
                  onClick={() => goToDetail(row)}
                />
              </Compare.ModalPhoneFooter>
            </Compare.ModalPhoneBox>
          );
        } else
          return (
            <Compare.ModalPhoneBox key={"box" + i}>
              <Compare.ModalPhoneSelect>
                <DataOptSelect
                  label="통신"
                  value={opt[i].tech}
                  handleChange={(e) => handleOptChange(e, i, "tech")}
                />
                <DataOptSelect
                  label="제조사"
                  value={opt[i].product}
                  handleChange={(e) => handleOptChange(e, i, "product")}
                />
                <DataOptSelect
                  label="기기명"
                  value={opt[i].phoneId}
                  handleChange={(e) => handleOptChange(e, i, "phoneId")}
                  extra={[opt[i].tech, opt[i].product]}
                />
              </Compare.ModalPhoneSelect>
              <Compare.ModalPhoneFooter>
                <LGButton
                  children="추가하기"
                  size="sm"
                  disabled={addDisabled(opt[i])}
                  onClick={() => handleFetch(i)}
                />
              </Compare.ModalPhoneFooter>
            </Compare.ModalPhoneBox>
          );
      })}
    </ModalStyle.Row>
  );
}
