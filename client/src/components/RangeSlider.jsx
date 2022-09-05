// writer: 권혁준
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const dataMarks = [
  {
    value: 50,
    label: "50GB",
  },
  {
    value: 100,
    label: "100GB",
  },
  {
    value: 150,
    label: "150GB",
  },
  {
    value: 200,
    label: "무제한",
  },
];
const monthPriceMarks = [
  {
    value: 50000,
    label: "5만원",
  },
  {
    value: 100000,
    label: "10만원",
  },
  {
    value: 150000,
    label: "15만원",
  },
];

function valuetext(value) {
  return value;
}

export default function RangeSlider({ state, setState, optKey }) {
  const handleChange = (e) => setState({ ...state, [optKey]: e.target.value });

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        sx={{
          color: "#e6007e",
        }}
        getAriaLabel={() => "Temperature range"}
        value={state[optKey]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={optKey === "data" ? dataMarks : monthPriceMarks}
        min={optKey === "data" ? 0 : 30000}
        max={optKey === "data" ? 200 : 150000}
        step={optKey === "data" ? 10 : 10000}
      />
    </Box>
  );
}
