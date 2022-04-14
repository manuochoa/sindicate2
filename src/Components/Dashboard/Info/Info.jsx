import React from "react";
import Card from "../../UI/Card/Card";
import classes from "./Info.module.css";
import { useSelector } from "react-redux";

const Info = () => {
  const {
    buyFee,
    sellFee,
    transferFee,
    bracketMultiplier,
    maxSell,
    maxBuy,
    taxBracket,
  } = useSelector((state) => state.common);

  return (
    <Card className={classes.main}>
      <div className={classes.section}>
        <h4>General Buy / Sell Details</h4>
        <div className={classes.fields}>
          <div className={classes.field}>
            <label>Buy Tax</label>
            <span>{buyFee}%</span>
          </div>
          <div className={classes.field}>
            <label>Sell Tax</label>
            <span>{sellFee}%</span>
          </div>
          <div className={classes.field}>
            <label>Transfer Tax</label>
            <span>{transferFee}%</span>
          </div>
          <div className={classes.field}>
            <label>Max Tokens Per Buy</label>
            <span>{maxBuy}</span>
          </div>
          <div className={classes.field}>
            <label>Max Tokens Per Sell</label>
            <span>{maxSell}</span>
          </div>
        </div>
      </div>
      <div className={classes.section}>
        <h4>Your Current Tax Bracket</h4>
        <div className={classes.fields}>
          <div className={classes.field}>
            <label>
              Sell Tier {taxBracket / bracketMultiplier} (+{taxBracket}%)
            </label>
            <span>{sellFee + taxBracket}%</span>
          </div>
          <div className={classes.field}>
            <label>
              Transfer Tier {taxBracket / bracketMultiplier} (+{taxBracket}%)
            </label>
            <span>{transferFee + taxBracket}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Info;
