import React from "react";
import classes from "./Baidge.module.css";
import arrow_up from "../../../Assets/Icons/arrow_up.svg";
import arrow_down from "../../../Assets/Icons/arrow_down.svg";
import { cx } from "../../../Utils/classnames";

const Baidge = (props) => {
  const { icon, text, value, direction, className, sinBalance } = props;

  return (
    <div className={cx(classes.main, className)}>
      <div className={classes.header}>
        <img src={icon} alt="icon" />
        {text && <span>{text}</span>}
      </div>
      <div className={classes.info}>
        <p>{value}</p>

        {direction &&
          (direction > 0 ? (
            <div className={classes.direction}>
              <img src={arrow_up} alt="arrow_up" />
              <span className={classes.directionUp}>{direction}%</span>
            </div>
          ) : (
            <div className={classes.direction}>
              <img src={arrow_down} alt="arrow_down" />
              <span className={classes.directionDown}>{direction}%</span>
            </div>
          ))}
      </div>
      {sinBalance && (
        <div className={classes.block}>
          <div className={classes.statistic}>
            <span>{sinBalance}</span>
            {/* <p>%</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Baidge;
