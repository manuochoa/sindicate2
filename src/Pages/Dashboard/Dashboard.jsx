import React from "react";
import Chart from "../../Components/Dashboard/Chart/Chart";
import classes from "./Dashboard.module.css";
import Directions from "../../Components/Dashboard/Directions/Directions";
import Balance from "../../Components/Dashboard/Balance/Balance";
import TotalWallets from "../../Components/Dashboard/TotalWallets/TotalWallets";
import Reward from "../../Components/Dashboard/Reward/Reward";
import Info from "../../Components/Dashboard/Info/Info";

const Dashboard = (props) => {
  const holdings = "137,76.80";
  const daily = "137,76.80";

  const sinPrice = {
    value: "0.3456",
    direction: 2,
    next: "0.04",
  };

  const cap = {
    value: "767.32",
    direction: 2,
    day5: "9.92",
  };

  const dailyRoi = {
    value: "1.91",
    direction: -7,
    annual: "99,900",
    day5: "9.92",
  };

  const balance = {
    treasury: {
      value: "874.89",
    },
    today: {
      value: "93.32",
    },
  };

  const wallet = {
    total: {
      value: "74.89",
    },
    dyson: "1.4008",
  };

  const info = {
    details: {
      buyTax: "13%",
      sellTax: "20%",
      transferTax: "4%",
      maxTokensPerBuy: "869.23 B $SIN",
      maxTokensPerSell: "1.54 B $SIN",
    },
    taxBracket: {
      sellTier: "Total Sell Tex = 30%",
      transferTier: "Total Transfer Tax = 20%",
    },
  };

  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <Chart holdings={holdings} daily={daily} />
        <Directions cap={cap} daily={dailyRoi} sinPrice={sinPrice} />
        <div className={classes.container}>
          <Balance balance={balance} />
          <TotalWallets wallet={wallet} />
        </div>
      </div>
      <div className={classes.right}>
        <Reward />
        <Info info={info} />
      </div>
      <div className={classes.mobile}>
        <Chart holdings={holdings} daily={daily} />
        <Reward />
        <Directions cap={cap} daily={dailyRoi} sinPrice={sinPrice} />
        <div className={classes.container}>
          <Balance balance={balance} />
          <TotalWallets wallet={wallet} />
        </div>
        <Info info={info} />
      </div>
    </div>
  );
};

export default Dashboard;
