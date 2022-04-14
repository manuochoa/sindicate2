import React from "react";
import { setIsShowConnectWalletModal } from "../../Redux/commonReducer";
import Overflow from "../UI/Overflow/Overflow";
import { Button, IconButton } from "@mui/material";
import classes from "./ConnectWalletModal.module.css";

import metamask from "../../Assets/metamask.png";
import wallet from "../../Assets/wallet.png";
import close_icon from "../../Assets/Icons/close_icon.svg";
import {
  connectMetamask,
  connectWalletConnect,
} from "../../Redux/reduxActions";
import { useDispatch, useSelector } from "react-redux";

const ConnectWalletModal = (props) => {
  const { onClose } = props;
  const dispatch = useDispatch();

  return (
    <Overflow>
      <div className={classes.main}>
        <div className={classes.header}>
          <h4>Connect Wallet</h4>
          <IconButton onClick={onClose}>
            <img src={close_icon} alt="close icon" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <Button
            onClick={() => dispatch(connectMetamask())}
            className={classes.button}
          >
            <img src={metamask} alt="metamask" />
            <p>Metamask</p>
          </Button>
          <Button
            onClick={() => dispatch(connectWalletConnect())}
            className={classes.button}
          >
            <img src={wallet} alt="metamask" />
            <p>WalletConnect</p>
          </Button>
        </div>
        {/* <Button className={classes.submit}>Connect</Button> */}
      </div>
    </Overflow>
  );
};

export default ConnectWalletModal;
