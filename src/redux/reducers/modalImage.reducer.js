const initialState = {isShown: false, image: ""};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL_IMAGE":
      return {isShown: true, image: action.payload.image, i: action.payload.i};
    case "UNSET_MODAL_IMAGE":
      return {isShown: false, image: ""};
    default:
      return state;
  }
};
