import { ethers, providers } from "ethers";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { tokenABI } from "../abi/sindicate";
// import axios from "axios";
import store from "../Redux/reduxStore";

const updateUser = (payload) => {
  return {
    type: "UPDATE_USER",
    payload: payload,
  };
};

const updateSigner = (payload) => {
  return {
    type: "UPDATE_SIGNER",
    payload: payload,
  };
};

const updateContractNumbers = (payload) => {
  return {
    type: "UPDATE_CONTRACT_NUMBERS",
    payload: payload,
  };
};

const updateUserNumbers = (payload) => {
  return {
    type: "UPDATE_USER_NUMBERS",
    payload: payload,
  };
};

let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-2-s2.binance.org:8545/"
);

let reduxStore = store.getState().common;

let tokenAddress = "0xBa847d96e2d702A9DCc016Dd524E74170B229b1A";

let tokenInstance = new ethers.Contract(tokenAddress, tokenABI, provider);

export const getContractNumbers = () => {
  return async (dispatch) => {
    try {
      let lastBlock = await provider.getBlockNumber();
      let dayAgo = lastBlock - 14400;
      const overrides = {
        blockTag: dayAgo,
      };
      let treasuryAddress = await tokenInstance.treasuryReceiver();
      let treasuryBalance = await tokenInstance.balanceOf(treasuryAddress);
      let treasuryPrevBalance = await tokenInstance.balanceOf(
        treasuryAddress,
        overrides
      );
      let buyFee = await tokenInstance.totalBuyFee();
      let sellFee = await tokenInstance.totalSellFee();
      let transferFee = await tokenInstance.feesOnNormalTransfers();
      let bracketMultiplier = await tokenInstance.taxBracketMultiplier();
      let maxSell = await tokenInstance.maxSellTransactionAmount();
      let maxBuy = await tokenInstance.maxBuyTransactionAmount();
      let nextRebase = await tokenInstance.nextRebase();
      let usdPrice = 0.3456;

      dispatch(
        updateContractNumbers({
          treasuryBalance: ethers.utils.formatEther(treasuryBalance),
          treasuryPrevBalance: ethers.utils.formatEther(treasuryPrevBalance),
          buyFee: Number(buyFee),
          sellFee: Number(sellFee),
          transferFee: Number(transferFee),
          bracketMultiplier: Number(bracketMultiplier),
          maxSell: ethers.utils.formatEther(maxSell),
          maxBuy: ethers.utils.formatEther(maxBuy),
          nextRebase: Number(nextRebase * 1000),
          usdPrice: usdPrice,
        })
      );
    } catch (error) {
      console.log(error, "getContractNumbers");
    }
  };
};

export const getUserNumbers = (userAddress) => {
  return async (dispatch) => {
    try {
      if (userAddress) {
        let taxBracket = await tokenInstance.getCurrentTaxBracket(userAddress);
        let balance = await tokenInstance.balanceOf(userAddress);

        dispatch(
          updateUserNumbers({
            taxBracket: Number(taxBracket),
            balance: ethers.utils.formatEther(balance),
          })
        );
      }
    } catch (error) {
      console.log(error, "getUserNumbers");
    }
  };
};

export const connectMetamask = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userAddress = accounts[0];

      dispatch(getSigner());

      window.ethereum.on("accountsChanged", function (accounts) {
        dispatch(getUserNumbers(accounts[0]));
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "metamask",
            provider: null,
          })
        );
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );

      if (userAddress) {
        dispatch(getUserNumbers(userAddress));
        dispatch(
          updateUser({
            userAddress,
            connectionType: "metamask",
            provider: null,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const connectWalletConnect = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          // 56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // network: "binance",
        chainId: 97,
        infuraId: null,
      });

      await provider.enable();

      dispatch(getSigner("WALLET_CONNECT", provider));

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();

      provider.on("accountsChanged", (accounts) => {
        updateUser({
          userAddress: accounts[0],
          connectionType: "WALLET_CONNECT",
          provider,
        });
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        dispatch(disconnectWallet());
      });

      if (accounts) {
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "WALLET_CONNECT",
            provider,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const disconnectWallet = () => {
  return async (dispatch) => {
    try {
      let { connectionType } = reduxStore;
      if (connectionType === "WALLET_CONNECT") {
        const provider = new WalletConnectProvider({
          rpc: {
            // 56: "https://bsc-dataseed1.ninicoin.io/",

            97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
          },
          chainId: 97,
          infuraId: null,
        });
        await provider.disconnect();
      }

      dispatch(
        updateUser({
          userAddress: "",
          connectionType: "",
          provider: null,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

const getSigner = (walletType, provider) => {
  return async (dispatch) => {
    try {
      let signer;
      if (walletType === "WALLET_CONNECT") {
        const web3Provider = new providers.Web3Provider(provider);

        signer = await web3Provider.getSigner(0);
      } else {
        let newProvider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await newProvider.getSigner(0);
      }

      dispatch(
        updateSigner({
          signer,
        })
      );
    } catch (error) {
      console.log(error, "signer");
    }
  };
};
