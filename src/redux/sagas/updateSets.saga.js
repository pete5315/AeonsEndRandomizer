import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "FETCH_USER" actions
function* updateSets(action) {
  console.log("update sets", action.payload);
  try {
    yield put({
      type: "SET_SETS",
      payload: { [action.payload.set]: action.payload.setProp },
    });
    yield put({
      type: "UNSET_MARKET",
    });
    yield put({
      type: "SET_MARKET_IS_LOADING",
    });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* updateSetsSaga() {
  yield takeLatest("UPDATE_SETS", updateSets);
}

export default updateSetsSaga;
