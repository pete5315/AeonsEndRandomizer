const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MARKET_IS_LOADING":
      return true;
    case "RESET_MARKET_IS_LOADING":
      return false;
    default:
      return state;
  }
};
