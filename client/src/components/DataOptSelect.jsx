/* eslint-disable react-hooks/exhaustive-deps */
// writer: 권혁준
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { getPhonesByTelecomTech } from "../api/PhoneAPI";
import { getPlansByTelecomTech } from "../api/PlanAPI";
import { dropdownOpt } from "../assets/dropdownOpt";

export default function DataOptSelect({
  label,
  value,
  handleChange,
  extra,
  dataList,
}) {
  const style = {
    minWidth: 120,
    margin: "10px 0px",
    fontFamily: "Noto Sans KR",
  };

  const [list, setList] = useState([]);

  const getPlanData = async () => {
    const values = await getPlansByTelecomTech(extra)
      .then((d) => (d.status === 400 ? [] : d.PlanList))
      .catch((e) => console.log(e.message));
    return values;
  };

  const getPhoneData = async () => {
    const values = await getPhonesByTelecomTech(extra[0])
      .then((d) => (d.status === 400 ? [] : d.phoneList))
      .catch((e) => console.log(e.message));
    return values;
  };

  const arr = () => {
    switch (label) {
      case "가입유형":
        return dropdownOpt().registration;
      case "할부":
        return dropdownOpt().installment;
      case "할인유형":
        return dropdownOpt(extra).discount;
      case "통신":
        return dropdownOpt().telecomTech;
      case "제조사":
        return dropdownOpt().manufacturingCompany;
      case "기기명":
        return list
          .filter((row) =>
            extra[1] !== "전체"
              ? row.manufacturingCompany === (extra[1] || "")
              : true
          )
          .map((row) => ({
            label: row.titleName,
            value: row.phoneId,
          }));
      default:
        return list;
    }
  };

  useEffect(async () => {
    if (label === "요금제") {
      const values = await getPlanData();
      setList(
        values.map((row) => ({
          label: row.name,
          value: row.planId,
        }))
      );
    } else if (label === "기기명") {
      const values = await getPhoneData();
      setList(values);
    }
  }, []);

  useEffect(async () => {
    if (label === "기기명") {
      const values = await getPhoneData();
      setList(values);
    }
  }, [extra]);

  return (
    <Box sx={style}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {arr().map((row, i) => {
            return (
              <MenuItem key={row.value} value={row.value}>
                {row.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
