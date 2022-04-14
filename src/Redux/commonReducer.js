let initialState = {
  loading: "",
  userAddress: "",
  connectionType: "",
  treasuryBalance: "",
  treasuryPrevBalance: "",
  buyFee: "",
  sellFee: "",
  transferFee: "",
  bracketMultiplier: "",
  maxSell: "",
  maxBuy: "",
  nextRebase: "",
  taxBracket: "",
  balance: "",
  usdPrice: 0.3456,
};

let commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        userAddress: action.payload.userAddress,
        connectionType: action.payload.connectionType,
        provider: action.payload.provider,
      };
    case "UPDATE_CONTRACT_NUMBERS":
      return {
        ...state,
        loading: false,
        treasuryBalance: action.payload.treasuryBalance,
        treasuryPrevBalance: action.payload.treasuryPrevBalance,
        buyFee: action.payload.buyFee,
        sellFee: action.payload.sellFee,
        transferFee: action.payload.transferFee,
        bracketMultiplier: action.payload.bracketMultiplier,
        maxSell: action.payload.maxSell,
        maxBuy: action.payload.maxBuy,
        nextRebase: action.payload.nextRebase,
        usdPrice: action.payload.usdPrice,
      };
    case "UPDATE_USER_NUMBERS":
      return {
        ...state,
        loading: false,
        taxBracket: action.payload.taxBracket,
        balance: action.payload.balance,
      };
    default: {
      return state;
    }
  }
};

export default commonReducer;
