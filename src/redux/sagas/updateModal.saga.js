import { put, takeLatest } from "redux-saga/effects";
// worker Saga: will be fired on "FETCH_USER" actions
function* updateModal(action) {
  console.log("update modal", action.payload);
  // try {
  //   if (action.payload.show) {
  //     yield put({
  //       type: "SET_MODAL_VALUE",
  //       payload: { payload: action.payload.i },
  //     });
  //   } else {
  //     yield put({
  //       type: "UNSET_MODAL_VALUE",
  //     });
  //   }
  // } catch (error) {
  //   console.log("User get request failed", error);
  // }
}

function* updateModalSaga() {
  yield takeLatest("UPDATE_MODAL", updateModal);
}

export default updateModalSaga;
