import { put, takeLatest } from "redux-saga/effects";

function* updateMarket(action) {
  console.log("4, updating market");
  try {
    yield put({ type: "UNSET_MARKET", payload: [] });
    console.log("market reset");
    yield put({
      type: "SET_MARKET",
      payload: action.payload,
    });
    console.log("market reset");
  } catch (error) {
    console.log("Market update error", error);
  }
  return;
}

function* updateMarketSaga() {
  yield takeLatest("UPDATE_MARKET", updateMarket);
}

export default updateMarketSaga;
