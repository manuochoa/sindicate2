import React, { useState } from "react";
import CalculatorInfoItem from "../../Components/Calculator/CalculatorInfoItem/CalculatorInfoItem";
import GeneralBuy from "../../Components/Calculator/GeneralBuy/GeneralBuy";

import classes from "./Calculator.module.css";

import coins from "../../Assets/Icons/coins.svg";
import briefcase from "../../Assets/Icons/briefcase.svg";
import coin from "../../Assets/Icons/coin.svg";
import { useSelector } from "react-redux";

const Calculator = (props) => {
  const [inputs, setInputs] = useState({
    amount: 0,
    apy: 0,
    priceAtPurchase: 0,
    futurePrice: 0,
    time: 7,
  });
  const info = {
    initialInvestment: "0.0000",
    currentWealth: "137,76.80",
    sin: "612",
    initialInvestment2: "137,76.80",
  };
  const { usdPrice } = useSelector((state) => state.common);

  const truncate = (value, numDecimalPlaces) =>
    Math.trunc(value * Math.pow(10, numDecimalPlaces)) /
    Math.pow(10, numDecimalPlaces);

  const getAmount = (type) => {
    let rebaseValue = (inputs.apy / 100) ** (1 / 17520);
    let earnings = rebaseValue ** (inputs.time * 48) * inputs.amount;
    switch (type) {
      case "INITIAL_INVEST":
        return `$${truncate(inputs.amount * inputs.priceAtPurchase, 2)}`;
        break;
      case "CURRENT_WEALTH":
        return `$${truncate(inputs.amount * usdPrice, 0)}`;
        break;
      case "SIN_REWARD":
        return `${earnings.toFixed(2)} $SIN`;
        break;
      case "RETURN":
        let usdReturn = earnings * inputs.futurePrice;
        return `$${usdReturn.toFixed(0)}`;
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <GeneralBuy setInputs={setInputs} inputs={inputs} />
      </div>
      <div className={classes.right}>
        <CalculatorInfoItem
          icon={coins}
          text="Your Initial Inverstment"
          value={getAmount("INITIAL_INVEST")}
        />
        <CalculatorInfoItem
          icon={briefcase}
          text="Your Current Wealth"
          value={getAmount("CURRENT_WEALTH")}
        />
        <CalculatorInfoItem
          icon={coin}
          text="$SIN Rewards Est."
          value={getAmount("SIN_REWARD")}
        />
        <CalculatorInfoItem
          icon={coins}
          text="Potential Return"
          value={getAmount("RETURN")}
        />
      </div>
    </div>
  );
};

export default Calculator;
