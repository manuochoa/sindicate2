import React, { useState } from "react";
import classes from "./Select.module.css";

import arrow from "../../../../Assets/Icons/select_arrow.svg";
import SelectTokenMenu from "./SelectTokenMenu/SelectTokenMenu";
import { cx } from "../../../../Utils/classnames";

const SelectTokens = (props) => {
  const { onChange, currentItem, tokens } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.main}>
      <div className={classes.view} onClick={handleOpen}>
        <img src={currentItem.img} alt="token_icon" className={classes.token} />
        <label>{currentItem.value}</label>
        <img
          src={arrow}
          alt="arrow"
          className={cx(classes.arrow, isOpen ? classes.active : "")}
        />
      </div>
      {isOpen && (
        <SelectTokenMenu
          tokens={tokens}
          setCurrentItem={onChange}
          onClose={handleOpen}
        />
      )}
    </div>
  );
};

export default SelectTokens;
