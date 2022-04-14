import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./Directions.module.css";
import coin_icon from "../../../Assets/Icons/coin.svg";
import diamonds_icon from "../../../Assets/Icons/diamonds.svg";
import hour24 from "../../../Assets/Icons/24.svg";
import Baidge from "../../UI/Baidge/Baidge";
import { cx } from "../../../Utils/classnames";
import { useSelector } from "react-redux";

const Directions = (props) => {
  const { cap, daily, sinPrice } = props;
  const { usdPrice } = useSelector((state) => state.common);

  return (
    <Card className={classes.main}>
      <div className={classes.block}>
        <Baidge
          icon={coin_icon}
          text={"$SIN Price"}
          value={`$${usdPrice}`}
          direction={sinPrice.direction}
        />
        {/* <div className={cx(classes.statistic, classes.withBorder)}>
          <span>Next:</span>
          <p>{sinPrice.next}%</p>
        </div> */}
      </div>
      <div className={classes.block}>
        <Baidge
          icon={diamonds_icon}
          text={"Market Cap"}
          value={`$${cap.value} K`}
          direction={cap.direction}
        />
        {/* <div className={cx(classes.statistic, classes.withBorder)}>
          <span>5-day:</span>
          <p>{cap.day5}%</p>
        </div> */}
      </div>
      <div className={classes.block}>
        <Baidge
          icon={hour24}
          text={"Daily ROI"}
          value={`$${daily.value} %`}
          // direction={daily.direction}
        />
        <div className={classes.statistic}>
          <span>Next:</span>
          <p>{sinPrice.next}%</p>
        </div>
        <div className={classes.statistic}>
          <span>5-day:</span>
          <p>{cap.day5}%</p>
        </div>
        <div className={classes.statistic}>
          <span>Annual:</span>
          <p>{daily.annual}%</p>
        </div>
      </div>
      <div className={classes.statisticMobile}>
        <div className={cx(classes.statistic, classes.withBorder)}>
          <span>Next:</span>
          <p>{sinPrice.next}%</p>
        </div>
        <div className={cx(classes.statistic, classes.withBorder)}>
          <span>5-day:</span>
          <p>{cap.day5}%</p>
        </div>
        <div className={classes.statistic}>
          <span>Annual:</span>
          <p>{daily.annual}%</p>
        </div>
      </div>
    </Card>
  );
};

export default Directions;
