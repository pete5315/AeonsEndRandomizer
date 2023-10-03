import { all } from 'redux-saga/effects';
import updateMarketSaga from './updateMarket.saga';

export default function* rootSaga() {
  yield all([
    updateMarketSaga
  ]);
}
