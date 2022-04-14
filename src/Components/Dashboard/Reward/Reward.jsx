import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./Reward.module.css";
import Countdown from "react-countdown";
import circle from "../../../Assets/circle.png";
import { useSelector } from "react-redux";

const countdownRenderer = ({ formatted }) => {
  return (
    <p>
      {formatted.minutes}:{formatted.seconds}
    </p>
  );
};

const Reward = () => {
  const { nextRebase, balance, usdPrice } = useSelector(
    (state) => state.common
  );

  const thSeparator = new Intl.NumberFormat("en-US");

  return (
    <Card className={classes.main}>
      <div className={classes.circleInfo}>
        <img src={circle} alt="circle" className={classes.circle} />
        <span>
          Rebases <br /> Every 30 min
        </span>
        <Countdown date={nextRebase} renderer={countdownRenderer} />
      </div>
      <div className={classes.info}>
        <p className={classes.infoTitle}>NEXT REWARD</p>
        <p className={classes.cash}>
          ${thSeparator.format((balance * 0.004 * usdPrice).toFixed(2))}
        </p>
        {/* <span>4.48 K $SIN</span> */}
      </div>
    </Card>
  );
};

export default Reward;
