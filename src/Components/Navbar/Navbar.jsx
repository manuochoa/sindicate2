import React, { useEffect } from "react";
import classes from "./Navbar.module.css";
import logo from "../../Assets/logo.png";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "../../Redux/reduxActions";

// import { getNewMarketNFTs } from "../../redux/data/dataActions";

const Navbar = (props) => {
  const { showModal } = props;
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.common.userAddress);

  return (
    <div className={classes.main}>
      <img src={logo} alt="logo" className={classes.logo} />
      <div className={classes.links}>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/calculator"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Calculator
        </NavLink>
        <NavLink
          to="/swap"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Swap
        </NavLink>
      </div>
      <Button
        onClick={!userAddress ? showModal : () => dispatch(disconnectWallet())}
        className={classes.connectBut}
      >
        {userAddress
          ? `${userAddress.slice(0, 6)}...${userAddress.slice(-6)}`
          : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default Navbar;
