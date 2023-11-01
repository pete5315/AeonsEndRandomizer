const initialState = Array(9).fill(false);

export default (state = initialState, action) => {
  const updatedModalStates = [...state];
  switch (action.type) {
    case "SET_MODAL_VALUE":
      updatedModalStates[action.payload] = true;
      return updatedModalStates;
    case "UNSET_MODAL_VALUE":
      return Array(9).fill(false);
    default:
      return state;
  }
};
