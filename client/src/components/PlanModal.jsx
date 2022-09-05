/* eslint-disable react-hooks/exhaustive-deps */
// writer : 최강현
// modifier: 권혁준

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as ModalStyle from "../styles/modalStyle";
import * as PlanStyle from "../styles/planStyle";
import * as OptionData from "../assets/filterOptions";
import CloseIcon from "@mui/icons-material/Close";
import { LGButton } from "./Button";
import { useEffect, useState } from "react";
import sortPlanList from "../util/sortPlanList";
import RangeSlider from "./RangeSlider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PlanBox from "./PlanBox";
import { planFilter, planSort } from "../assets/sortOpt";

const style = {
  boxSizing: "border-box",
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1280px",
  height: "810px",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  textAlign: "center",
  verticalAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontFamily: "Noto Sans KR",
  p: 4,
};

export default function PlanModal({
  tech,
  modalShow,
  setModalShow,
  nowPlanId,
  handleFilterOpt,
  setDefaultValue,
  plans,
}) {
  const [active, setActive] = useState(-1);

  const [planList, setPlanList] = useState([]);
  const [filter, setFilter] = useState({
    data: [0, 200],
    monthPrice: [0, 150000],
  });

  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("전체");

  const setRadio = (id) => setActive(id);

  const handleClose = () => {
    setModalShow({ ...modalShow, plan: false });
  };

  const handleChange = (key, value) => {
    const { name } = plans.filter((p) => p.planId === value)[0];
    setDefaultValue !== undefined &&
      (OptionData.default[tech].요금제.values[name] = value);
    setDefaultValue !== undefined && setDefaultValue(name);
    handleFilterOpt(key, value);
    setModalShow({ ...modalShow, plan: false });
  };

  const filterArr = (arr) => {
    return arr.filter(
      (row) =>
        ((row.data === "무제한" && filter.data[1] === 200) ||
          (row.data !== "무제한" &&
            Number(row.data.replace(/[^0-9.]/g, "")) >= filter.data[0] &&
            Number(row.data.replace(/[^0-9.]/g, "")) <= filter.data[1])) &&
        row.monthPrice >= filter.monthPrice[0] &&
        row.monthPrice <= filter.monthPrice[1] &&
        ((filterBy !== "전체" && row.planType === filterBy) ||
          filterBy === "전체")
    );
  };

  const SelectOpt = ({ type }) => {
    const changeValue =
      type === "sort"
        ? { label: "정렬", optArr: planSort, value: sortBy, handle: setSortBy }
        : {
            label: "유형",
            optArr: planFilter,
            value: filterBy,
            handle: setFilterBy,
          };
    return (
      <PlanStyle.PlanBarItem
        style={{ width: "250px" }}
        children={
          <FormControl variant="standard" sx={{ minWidth: 200, height: 50 }}>
            <InputLabel id="demo-simple-select-standard-label">
              {changeValue.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={changeValue.value}
              onChange={(e) => changeValue.handle(e.target.value)}
              label={changeValue.label}
            >
              {changeValue.optArr.map((row) => (
                <MenuItem key={row.value} value={row.value}>
                  {row.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
    );
  };

  const RangeOpt = ({ optKey }) => {
    return (
      <PlanStyle.PlanBarItem
        style={{ width: "250px" }}
        children={
          <RangeSlider state={filter} setState={setFilter} optKey={optKey} />
        }
      />
    );
  };

  useEffect(() => {
    sortPlanList("", plans, setPlanList);
  }, [plans]);

  useEffect(() => {
    sortPlanList(sortBy, plans, setPlanList);
  }, [sortBy]);

  useEffect(() => {
    if (modalShow.plan) {
      setActive(nowPlanId);
    }
  }, [modalShow.plan]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalShow.plan}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={modalShow.plan}>
          <Box sx={style}>
            <ModalStyle.Header>
              <ModalStyle.Title children="더 많은 요금제 보기" />
              <ModalStyle.CloseBtn
                children={<CloseIcon onClick={handleClose} />}
              />
            </ModalStyle.Header>
            <PlanStyle.Container>
              <PlanStyle.PlanBar style={{ height: "30px", border: "none" }}>
                <PlanStyle.PlanBarItem
                  style={{ width: "250px" }}
                  children={<p children="요금제 정렬" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "250px" }}
                  children={<p children="요금제 유형" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "250px" }}
                  children={<p children="데이터" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "250px" }}
                  children={<p children="가격" />}
                />
              </PlanStyle.PlanBar>
              <PlanStyle.PlanBar style={{ height: "60px" }}>
                <SelectOpt type="sort" />
                <SelectOpt type="filter" />
                <RangeOpt optKey="data" />
                <RangeOpt optKey="monthPrice" />
              </PlanStyle.PlanBar>
              <PlanStyle.PlanBar>
                <PlanStyle.PlanBarItem
                  style={{ width: "525px" }}
                  children={<p children="요금제" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "135px" }}
                  children={<p children="데이터" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "135px" }}
                  children={<p children="나눠쓰기" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "135px" }}
                  children={<p children="음성통화" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "150px" }}
                  children={<p children="메세지" />}
                />
              </PlanStyle.PlanBar>
              <PlanStyle.BoxContainer>
                {filterArr(planList).map((row) => (
                  <PlanBox
                    key={row.planId}
                    row={row}
                    active={active}
                    setRadio={setRadio}
                  />
                ))}
              </PlanStyle.BoxContainer>
            </PlanStyle.Container>
            <ModalStyle.Footer>
              <LGButton
                style={{ marginRight: 5 }}
                onClick={handleClose}
                variant="light"
                children="취소"
              />
              <LGButton
                style={{ marginLeft: 5 }}
                onClick={() => handleChange("planId", active)}
                children="적용"
                disabled={nowPlanId === -1}
              />
            </ModalStyle.Footer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
