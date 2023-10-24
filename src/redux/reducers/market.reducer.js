const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MARKET":
      return action.payload;
    case "UNSET_MARKET":
      return [];
    default:
      return state;
  }
};
``