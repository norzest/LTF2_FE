// writer : 전웅재
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useState } from "react";
import * as Styles from "../styles/sizeStyle";

const numbers = [13, 14, 15, 16, 17];
const ImgUrl =
  "//assets.piliapp.com/s3pxy/actual-size/iphone-13/default-front.png";

function Size() {
  const [inch, setInch] = useState(15);
  const [size, setSize] = useState({
    zoom: -0.093 * inch + 2.878,
    height: 146.7,
    width: 72.396,
  });
  const [inchText, setInchText] = useState(15);

  const getZoom = (len) => -0.093 * len + 2.878;

  const handleChange = (e) => {
    setInch(() => Number(e.target.value));
    setInchText(() => Number(e.target.value));

    setSize((prev) => ({ ...prev, zoom: getZoom(e.target.value) }));
  };

  const handleTextChange = (e) => {
    setInchText(e.target.value);
  };

  const handleInchChange = () => {
    setInch(() => Number(inchText));

    setSize((prev) => ({ ...prev, zoom: getZoom(inchText) }));
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };

  const SelectInch = () => {
    return (
      <RadioGroup row defaultValue={inch} onChange={handleChange} value={inch}>
        {numbers.map((num) => (
          <FormControlLabel
            value={num}
            control={
              <Radio
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
            }
            label={`${num} 인치`}
          />
        ))}
      </RadioGroup>
    );
  };
  const InputInch = () => {
    return (
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          width: "530px",
          marginTop: "15px",
          marginRight: "15px",
        }}
      >
        <IconButton
          type="button"
          sx={{ p: "10px", fontSize: "16px" }}
          aria-label="search"
        >
          직접 입력
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          type="number"
          inputProps={{ min: "0", max: "20", step: "0.1" }}
          placeholder="모니터 인치를 입력하세요"
          onKeyUp={onKeyUp}
          onChange={handleTextChange}
          value={inchText}
        />
        <IconButton
          type="button"
          sx={{ p: "10px", fontSize: "16px" }}
          aria-label="enter"
          onClick={handleInchChange}
        >
          확인
        </IconButton>
      </Paper>
    );
  };
  return (
    <Styles.SizeLayout>
      <Styles.ImgBox>
        <Styles.Img src={ImgUrl} zoom={size.zoom} height={size.height} />
      </Styles.ImgBox>
      <Styles.SizeBox>
        <Styles.RecommendInch>{`고객님의 화면은 ${inch} inch 인가요? `}</Styles.RecommendInch>
        <p>(정확하지 않다면, 아래의 화면 크기를 선택해주세요!)</p>
        <Styles.ButtonBox>{SelectInch()}</Styles.ButtonBox>
        <Styles.InputBox>{InputInch()}</Styles.InputBox>
      </Styles.SizeBox>
    </Styles.SizeLayout>
  );
}

export default Size;
