import React, { useState, useEffect } from "react";
import Card from "../../Components/UI/Card/Card";
import classes from "./Swap.module.css";
import arrows from "../../Assets/Icons/arrows.svg";
import Input from "../../Components/UI/Form/Input/Input";
import { Button } from "@mui/material";
import logo from "../../Assets/logo.png";
import token from "../../Assets/token.png";
import SelectTokens from "../../Components/UI/Form/Select/Select";
import {
  getTokenBalance,
  getQuote,
  checkAllowance,
  Approve,
  swap,
} from "../../blockchain/functions";
import { useSelector } from "react-redux";
import { useMoralisWeb3Api } from "react-moralis";

const tokens = [
  {
    value: "$SIN",
    text: "Sindicate Token",
    address: "0xBa847d96e2d702A9DCc016Dd524E74170B229b1A",
    decimals: 18,
    img: logo,
    currentValue: "0",
    balance: "0",
  },
  {
    value: "BNB",
    text: "BNB",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    currentValue: "0",
    balance: "0",
  },
  {
    value: "BUSD",
    text: "BUSD Token",
    address: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
    decimals: 18,
    img: "https://raw.githubusercontent.com/complusnetwork/default-token-list/master/src/bsc/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png",
    currentValue: "0",
    balance: "0",
  },
];

const Swap = (props) => {
  const Web3Api = useMoralisWeb3Api();
  let { userAddress } = useSelector((state) => state.common);
  let { signer } = useSelector((state) => state.signer);
  const [enoughAllowance, setEnoughAllowance] = useState(true);
  const [slippage, setSlippage] = useState(30);
  const [tokenIn, setTokenIn] = useState({
    value: "BNB",
    text: "BNB",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    currentValue: "0",
    balance: "0",
  });
  const [tokenOut, setTokenOut] = useState({
    value: "$SIN",
    text: "Sindicate Token",
    address: "0xBa847d96e2d702A9DCc016Dd524E74170B229b1A",
    decimals: 18,
    img: logo,
    currentValue: "0",
    balance: "0",
  });
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");

  const truncateByDecimalPlace = (value, numDecimalPlaces) =>
    Math.trunc(value * Math.pow(10, numDecimalPlaces)) /
    Math.pow(10, numDecimalPlaces);

  const changeToken = async (token, side) => {
    // let options = {
    //   address: token.address,
    //   chain: "bsc",
    // };
    // let price = await Web3Api.token.getTokenPrice(options);
    let balance = await getTokenBalance(token.text, token.address, userAddress);
    // console.log("balance", price.usdPrice);
    let currentValue = 0;

    switch (side) {
      case "IN":
        checkTokenAllowance(token);
        setTokenIn({ ...token, balance, currentValue });
        break;
      case "OUT":
        setTokenOut({ ...token, balance, currentValue });
        break;
      default:
        break;
    }
  };

  const checkTokenAllowance = async (token) => {
    if (token.value === "BNB") {
      setEnoughAllowance(true);
    } else {
      let allowance = await checkAllowance(userAddress, token.address);
      console.log(allowance > 0, "allowance");
      setEnoughAllowance(allowance > 0);
    }
  };

  const handleAmountChange = async (num, side) => {
    let path = [tokenIn.address, tokenOut.address];
    let quote;
    let result;
    switch (side) {
      case "IN":
        setAmountIn(num);
        quote = await getQuote(num, path, side);
        setAmountOut(getNumberDecimals(quote));
        break;
      case "OUT":
        setAmountOut(num);
        quote = await getQuote(num, path, side);
        setAmountIn(getNumberDecimals(quote));
        break;
      default:
        break;
    }
  };

  const handleSwap = async () => {
    let path = [tokenIn.address, tokenOut.address];
    let receipt = await swap(amountIn, amountOut, path, userAddress, signer);
    if (receipt) {
      changeToken(tokenIn, "IN");
      changeToken(tokenOut, "OUT");
      console.log(receipt);
    }
  };

  const handleApprove = async () => {
    let receipt = await Approve(tokenIn.address, signer);
    if (receipt) {
      checkTokenAllowance(tokenIn);
      console.log(receipt);
    }
  };

  const getNumberDecimals = (num) => {
    let length = Math.floor(num).toString().length;
    if (length > 4) {
      return Number(num).toFixed(0);
    } else {
      return Number(num).toFixed(8);
    }
  };

  useEffect(() => {
    changeToken(tokens[1], "IN");
    changeToken(tokens[0], "OUT");
  }, []);

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
                    onChange={(item) => changeToken(item, "IN")}
                    currentItem={tokenIn}
                    tokens={tokens}
                  />
                </div>
              }
              endAdornment={true}
              endAdornmentText={`${tokenIn.text}`}
              downLabel="Current value"
              downLabelValue={`${tokenIn.currentValue}`}
              value={""}
            />
          </div>
          <Input
            endAdornment={true}
            onChange={(e) => handleAmountChange(e, "IN")}
            endAdornmentText="MAX"
            downLabel="Available"
            downLabelValue={`${getNumberDecimals(tokenIn.balance)} ${
              tokenIn.value
            }`}
            value={amountIn}
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
                    onChange={(item) => changeToken(item, "OUT")}
                    currentItem={tokenOut}
                    tokens={tokens}
                  />
                </div>
              }
              endAdornment={true}
              endAdornmentText={`${tokenOut.text}`}
              downLabel="Current value"
              downLabelValue={`${tokenOut.currentValue}`}
              value={""}
            />
          </div>
          <Input
            endAdornment={true}
            endAdornmentText="MAX"
            downLabel="Available"
            onChange={(e) => handleAmountChange(e, "OUT")}
            downLabelValue={`${getNumberDecimals(tokenOut.balance)} ${
              tokenOut.value
            }`}
            value={amountOut}
          />
        </Card>
      </div>
      {/* <p className={classes.cost}>Trasaction cost: ~$0.567 (1.5 $SIN)</p> */}
      <Button
        onClick={enoughAllowance ? handleSwap : handleApprove}
        className={classes.swap}
      >
        {enoughAllowance ? "Swap Now" : `Approve ${tokenIn.value}`}
      </Button>
    </div>
  );
};

export default Swap;
