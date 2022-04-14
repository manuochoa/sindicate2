import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classes from "./Input.module.css";
import { cx } from "../../../../Utils/classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#1C1C1C",
    width: "100%",
    borderRadius: 8,
    "& input": {
      fontSize: "16px",
      fontFamily: "Open Sans",
      fontWeight: "400",
      padding: "0 24px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "& label.Mui-focused": {
      color: "#9DC8CF",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0 0 0 3pt rgba(255, 255, 255, 0.2)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      height: "60px",
      fontFamily: "Open Sans",
      fontSize: "14px",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      margin: 0,
      marginTop: 5,
    },
  },
}));

const Input = (props) => {
  const {
    value,
    onChange,
    startAdornment,
    endAdornment,
    startAdornmentText,
    startAdornmentComponent,
    endAdornmentText,
    endAdornmentComponent,
    topLabel,
    label,
    downLabel,
    downLabelValue,
    disabled = false,
    placeholder,
    current,
  } = props;

  const [onFocus, setFocus] = useState(false);

  const material = useStyles();

  const handleFocus = () => {
    setFocus(!onFocus);
  };

  const handleChange = (e) => {
    // onChange(e.replace(/[^0-9]/g, ""));
    onChange(e);
  };

  return (
    <div
      className={cx(
        classes.main,
        label ? classes.relativeInput : undefined,
        onFocus ? classes.onFocus : undefined
      )}
    >
      {topLabel && <label>{topLabel}</label>}
      {label && <label className={classes.absoluteLabel}>{label}</label>}
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        variant="outlined"
        onFocus={handleFocus}
        onBlur={handleFocus}
        classes={material}
        disabled={disabled}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment
              position="start"
              style={{ width: "fit-content", marginRight: "10px" }}
            >
              {startAdornmentComponent && startAdornmentComponent}
              {startAdornmentText && (
                <p className={classes.adornmentText}>{startAdornmentText}</p>
              )}
            </InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment
              onClick={() => handleChange(current)}
              position="end"
              style={{ width: "fit-content", marginRight: "10px" }}
            >
              {endAdornmentComponent && endAdornmentComponent}
              {endAdornmentText && (
                <p className={classes.adornmentText}>{endAdornmentText}</p>
              )}
            </InputAdornment>
          ),
        }}
      />
      {downLabel && (
        <div className={classes.downLabelContainer}>
          <label>{downLabel}:</label>
          <p>{downLabelValue}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
