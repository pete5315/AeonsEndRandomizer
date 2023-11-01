import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "FETCH_USER" actions
function* hideModal(action) {
  console.log("hide modal4", action.payload);
  try {
    // yield put({ type: "UNSET_MODAL_IMAGE" });r
  } catch (error) {
    console.log("hide modal request failed", error);
  }
}

function* hideModalSaga() {
  yield takeLatest("HIDE_MODAL", hideModal);
}

export default hideModalSaga;
