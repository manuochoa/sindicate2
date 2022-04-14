import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import DiscreteSlider from "../../UI/Form/DiscreteSlider/DiscreteSlider";
import Input from "../../UI/Form/Input/Input";
import classes from "./GeneralBuy.module.css";
import { useSelector } from "react-redux";

const GeneralBuy = ({ inputs, setInputs }) => {
  const { amount, apy, priceAtPurchase, futurePrice, time } = inputs;
  const { usdPrice, maxBuy } = useSelector((state) => state.common);

  return (
    <Card className={classes.main}>
      <div className={classes.block}>
        <h4>General Buy / Sell Details</h4>
        <div className={classes.row}>
          <Input
            topLabel={"$SIN Amount"}
            onChange={(e) => setInputs({ ...inputs, amount: e })}
            current={maxBuy}
            value={amount}
            endAdornment={true}
            endAdornmentText="MAX"
            label="$SIN Amount"
          />
          <Input
            topLabel={"APY"}
            onChange={(e) => setInputs({ ...inputs, apy: e })}
            current={99900}
            value={apy}
            endAdornment={true}
            endAdornmentText="CURRENT"
          />
        </div>
        <div className={classes.row}>
          <Input
            topLabel={"$SIN Price at Purchase ($)"}
            onChange={(e) => setInputs({ ...inputs, priceAtPurchase: e })}
            current={usdPrice}
            value={priceAtPurchase}
            endAdornment={true}
            endAdornmentText="CURRENT"
          />
          <Input
            topLabel={"Future $SIN Price ($)"}
            onChange={(e) => setInputs({ ...inputs, futurePrice: e })}
            current={usdPrice}
            value={futurePrice}
            endAdornment={true}
            endAdornmentText="CURRENT"
          />
        </div>
      </div>
      <div className={classes.block}>
        <h4>Staking Duration</h4>
        <DiscreteSlider
          value={time}
          onChange={(e) => setInputs({ ...inputs, time: e })}
        />
      </div>
    </Card>
  );
};

export default GeneralBuy;
