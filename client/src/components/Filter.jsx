// writer : 전웅재
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import * as Styles from "../styles/filterStyle";
import * as OptionData from "../assets/filterOptions";
import { LGButton } from "./Button";

export default function Filter({
  filter,
  phones,
  tech,
  defaultValue,
  handleChange,
  handleModal,
  setIsDefault,
}) {
  const data = OptionData["default"][tech];
  const converter = {
    요금제: "plan",
    "할인 유형": "disCountType",
    제조사: "manufacturingCompany",
    "배터리 용량": "storage",
    저장용량: "memory",
  };
  const Options = (values) => {
    const keys = Object.keys(values);
    return keys.map((name, idx) => {
      const id = values[name];
      return (
        <FormControlLabel
          key={idx}
          value={idx === 0 ? "전체" : name}
          control={<Radio id={id} color="error" />}
          label={<Styles.OptionText>{name}</Styles.OptionText>}
        />
      );
    });
  };
  return (
    <>
      {Object.keys(data).map((k, i) => {
        /*
            k = 요금제, 할인유형, 제조사...
        */
        return (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Styles.OptionTitle>{k}</Styles.OptionTitle>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                {k === "요금제" ? (
                  <>
                    <RadioGroup
                      value={defaultValue}
                      name={data[k].name}
                      onChange={(e) => {
                        handleChange(e, phones);
                        setIsDefault(false);
                      }}
                    >
                      {Options(data[k].values)}
                    </RadioGroup>
                    <LGButton
                      onClick={handleModal}
                      children={"요금제 더보기+"}
                      rec
                      size="sm"
                      variant="light"
                    />
                  </>
                ) : (
                  <RadioGroup
                    value={filter[converter[k]]}
                    name={data[k].name}
                    onChange={(e) => {
                      handleChange(e, phones);
                      setIsDefault(false);
                    }}
                  >
                    {Options(data[k].values)}
                  </RadioGroup>
                )}
              </FormControl>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
