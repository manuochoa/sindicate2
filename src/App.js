import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import DashboardContainer from "./Pages/Dashboard/DashboardContainer";
import CalculatorContainer from "./Pages/Calculator/CalculatorContainer";
import SwapContainer from "./Pages/Swap/SwapContainer";
import MobileMenu from "./Components/Navbar/MobileMenu/MobileMenu";
import ConnectWalletModal from "./Components/ConnectWalletModal/ConnectWalletModal";
import { useDispatch, useSelector } from "react-redux";
import {
  connectMetamask,
  connectWalletConnect,
  getContractNumbers,
} from "./Redux/reduxActions";

const App = () => {
  const [isShowWalletModal, setIsShowWalletModal] = useState(false);
  const dispatch = useDispatch();
  // let userAddress = useSelector((state) => state.common.userAddress);
  let { userAddress, connectionType } = useSelector((state) => state.common);

  const handleIsShowWalletModal = () => {
    setIsShowWalletModal(!isShowWalletModal);
  };

  useEffect(() => {
    dispatch(getContractNumbers());
    if (userAddress) {
      switch (connectionType) {
        case "metamask":
          dispatch(connectMetamask());
          break;
        case "WALLET_CONNECT":
          dispatch(connectWalletConnect());
          break;

        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    // dispatch(getUserNumbers());
    if (userAddress) {
      setIsShowWalletModal(false);
    }
  }, [userAddress]);

  return (
    <Router>
      <HttpsRedirect>
        {isShowWalletModal && (
          <ConnectWalletModal onClose={handleIsShowWalletModal} />
        )}
        <div className="main">
          <Navbar showModal={handleIsShowWalletModal} />
          <div className="content">
            <Routes>
              <Route path="/" element={<DashboardContainer />} />
              <Route path="/calculator" element={<CalculatorContainer />} />
              <Route path="/swap" element={<SwapContainer />} />
            </Routes>
          </div>
        </div>
        <MobileMenu />
      </HttpsRedirect>
    </Router>
  );
};

export default App;
