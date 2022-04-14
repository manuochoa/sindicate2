import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./Balance.module.css";
import Baidge from "../../UI/Baidge/Baidge";

import treasure_icon from "../../../Assets/Icons/treasure.svg";
import gift_icon from "../../../Assets/Icons/gift.svg";

import { useSelector } from "react-redux";

const Balance = () => {
  const { treasuryBalance, treasuryPrevBalance, usdPrice } = useSelector(
    (state) => state.common
  );

  const thSeparator = new Intl.NumberFormat("en-US");

  return (
    <Card className={classes.main}>
      <Baidge
        icon={treasure_icon}
        text="Treasury Balance"
        value={`$${thSeparator.format(
          (treasuryBalance * usdPrice).toFixed(2)
        )}`}
      />
      <Baidge
        icon={gift_icon}
        text="Today’s Gains"
        value={`$${thSeparator.format(
          ((treasuryBalance - treasuryPrevBalance) * usdPrice).toFixed(2)
        )}`}
      />
    </Card>
  );
};

export default Balance;
