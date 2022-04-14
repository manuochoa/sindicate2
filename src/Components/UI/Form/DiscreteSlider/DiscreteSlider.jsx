import React from "react";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const PrettoSlider = styled(Slider)({
  color: "white",
  height: 20,
  width: "98%",
  margin: "0 10px",
  marginBottom: "60px",
  padding: "0 20px",
  boxSizing: "border-box",
  borderRadius: "6px",
  "@media(max-width: 458px)": {
    width: "95%",
    position: "relative",
    left: "-2px",
    marginBottom: 20,
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-markLabel": {
    marginTop: "8px",
    color: "white",
    fontFamily: "Open Sans",
  },
  "& .MuiSlider-rail": {
    opacity: 0.05,
    left: 0,
  },
  "& .MuiSlider-valueLabelOpen": {
    backgroundColor: "white",
    color: "black",
    fontFamily: "Open Sans",
    padding: 0,
    fontSize: "14px",
    transform: "translateY(0) scale(1)",
  },
  "& .MuiSlider-valueLabel": {
    top: "20px",
  },
  "& .MuiSlider-valueLabel:before": {
    display: "none",
  },
  "& .MuiSlider-mark": {
    color: "rgba(255, 255, 255, 0.1)",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
  },
  '& .MuiSlider-markLabel[data-index="0"]': {
    transform: "translateX(0%) translateY(0px)",
  },
  '& .MuiSlider-markLabel[data-index="1"]': {
    transform: "translateX(200%) translateY(0px)",
  },
  '& .MuiSlider-markLabel[data-index="12"]': {
    transform: "translateX(-88%) translateY(0px)",
  },
  '& .MuiSlider-markActive[data-index="0"]': {
    transform: "translateX(100%) translateY(-3px)",
  },
  '& .MuiSlider-markActive[data-index="1"]': {
    "@media(max-width: 458px)": {
      transform: "translateX(40%) translateY(-3px)",
    },
  },
  '& .MuiSlider-mark[data-index="11"]': {
    transform: "translateX(-75%) translateY(-3px)",
    "@media(max-width: 458px)": {
      transform: "translateX(-110%) translateY(-3px)",
    },
  },
  '& .MuiSlider-mark[data-index="12"]': {
    transform: "translateX(-250%) translateY(-3px)",
  },
  "& .MuiSlider-markActive": {
    color: "black",
    backgroundColor: "black",
  },
  "& .MuiSlider-thumb": {
    height: 28,
    width: 48,
    backgroundColor: "white",
    borderRadius: "6px",
    border: "3px solid #000000",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  // '& .MuiSlider-valueLabel': {
  //   lineHeight: 1.2,
  //   fontSize: 12,
  //   background: 'unset',
  //   padding: 0,
  //   width: 32,
  //   height: 32,
  //   borderRadius: '50% 50% 50% 0',
  //   backgroundColor: '#9DC8CF',
  //   transformOrigin: 'bottom left',
  //   transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
  //   '&:before': { display: 'none' },
  //   '&.MuiSlider-valueLabelOpen': {
  //     transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
  //   },
  //   '& > *': {
  //     transform: 'rotate(45deg)',
  //   },
  // },
});

const DiscreteSlider = ({ onChange, value }) => {
  const marks = [
    {
      value: 0,
      label: "1 Week",
    },
    {
      value: 7,
      label: "",
    },
    {
      value: 20,
      label: "",
    },
    {
      value: 30,
      label: "",
    },
    {
      value: 40,
      label: "",
    },
    {
      value: 50,
      label: "",
    },
    {
      value: 60,
      label: "Two Months",
    },
    {
      value: 70,
      label: "",
    },
    {
      value: 80,
      label: "",
    },
    {
      value: 90,
      label: "",
    },
    {
      value: 100,
      label: "",
    },
    {
      value: 110,
      label: "",
    },
    {
      value: 120,
      label: "Four Months",
    },
  ];

  return (
    <PrettoSlider
      aria-label="Temperature"
      value={value}
      // getAriaValueText={valuetext}
      valueLabelDisplay={"on"}
      onChange={(e) => onChange(e.target.value)}
      step={1}
      min={0}
      max={120}
      marks={marks}
    />
  );
};

export default DiscreteSlider;
