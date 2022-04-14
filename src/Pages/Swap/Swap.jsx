import React, { useState } from "react";
import Card from "../../Components/UI/Card/Card";
import classes from "./Swap.module.css";

import arrows from "../../Assets/Icons/arrows.svg";
import Input from "../../Components/UI/Form/Input/Input";
import { Button } from "@mui/material";

import logo from "../../Assets/logo.png";
import token from "../../Assets/token.png";
import SelectTokens from "../../Components/UI/Form/Select/Select";

const Swap = (props) => {
  const tokens = [
    {
      value: "$SIN",
      text: "Sindicate Token",
      count: "13123.34",
      cash: "4560,48",
      img: logo,
    },
    {
      value: "USDT",
      text: "Tether",
      count: "123.62",
      cash: "599 309,76",
      img: token,
    },
  ];

  const [currentSendItem, setCurrentSendItem] = useState(tokens[0]);
  const [currentGetItem, setCurrentGetItem] = useState(tokens[1]);

  return (
    <div className={classes.main}>
      <h2>SWAP TOKENS</h2>
      <div className={classes.windows}>
        <Card className={classes.card}>
          <h4>You Send</h4>
          <div className={classes.select}>
            <Input
              disabled={true}
              startAdornment={true}
              startAdornmentComponent={
                <div className={classes.select}>
                  <SelectTokens
                    onChange={setCurrentSendItem}
                    currentItem={currentSendItem}
                    tokens={tokens}
                  />
                </div>
              }
              endAdornment={true}
              endAdornmentText={`${
                currentSendItem.text
              } ${`(${currentSendItem.value})`}`}
              downLabel="Current value"
              downLabelValue={"$0.3456"}
              value={""}
            />
          </div>
          <Input
            endAdornment={true}
            endAdornmentText="MAX"
            downLabel="Available"
            downLabelValue={"675.6 K $SIN"}
            value={0}
          />
        </Card>
        <div className={classes.arrows}>
          <img src={arrows} alt="arrow" />
        </div>
        <Card className={classes.card}>
          <h4>You Get</h4>
          <div className={classes.select}>
            <Input
              disabled={true}
              startAdornment={true}
              startAdornmentComponent={
                <div className={classes.select}>
                  <SelectTokens
                    onChange={setCurrentGetItem}
                    currentItem={currentGetItem}
                    tokens={tokens}
                  />
                </div>
              }
              endAdornment={true}
              endAdornmentText={`${
                currentGetItem.text
              } ${`(${currentGetItem.value})`}`}
              downLabel="Current value"
              downLabelValue={"$1.0108"}
              value={""}
            />
          </div>
          <Input
            endAdornment={true}
            endAdornmentText="MAX"
            downLabel="Available"
            downLabelValue={"3,366 USDT"}
            value={0}
          />
        </Card>
      </div>
      <p className={classes.cost}>Trasaction cost: ~$0.567 (1.5 $SIN)</p>
      <Button className={classes.swap}>Swap Now</Button>
    </div>
  );
};

export default Swap;
