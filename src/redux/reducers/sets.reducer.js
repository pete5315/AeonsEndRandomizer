const initialState = {
  AE: false,
  D: false,
  N: false,
  WE: false,
  V: false,
  OD: false,
  L: false,
  BS: false,
  NA: false,
  SD: false,
  A: false,
  IW: false,
  O: false,
  RG: false,
  SV: false,
  LG: false,
  R: false,
  PF: false,
  OR: false,
  E: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SETS":
      return {...state, ...action.payload};
    case "UNSET_SETS":
      return [];
    default:
      return state;
  }
};
