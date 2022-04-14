import { IconButton } from "@mui/material";
import React from "react";
import classes from "./SelectTokenMenu.module.css";
import close_icon from "../../../../../Assets/Icons/close_icon.svg";
import Input from "../../Input/Input";

import searchIcon from "../../../../../Assets/Icons/search.svg";
import TokenMenuItem from "./TokenMenuItem/TokenMenuItem";

const SelectTokenMenu = (props) => {
  const { tokens, setCurrentItem, onClose } = props;

  const handleClick = (token) => {
    setCurrentItem(token);
    onClose();
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h4>Select a Token</h4>
        <IconButton onClick={onClose}>
          <img src={close_icon} alt="close icon" />
        </IconButton>
      </div>
      <div className={classes.search}>
        <Input
          placeholder="Search name or past address"
          endAdornment={true}
          endAdornmentComponent={<img src={searchIcon} alt="search_icon" />}
        />
      </div>
      <div className={classes.wrapper}>
        {tokens.map((el) => (
          <TokenMenuItem
            key={el.value}
            token={el}
            setCurrentItem={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectTokenMenu;
