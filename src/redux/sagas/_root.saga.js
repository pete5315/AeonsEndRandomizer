import { all } from 'redux-saga/effects';
import updateMarketSaga from './updateMarket.saga';
import updateSetsSaga from './updateSets.saga';
import redrawCardSaga from './redrawCard.saga';
import updateModalSaga from './updateModal.saga';
import hideModalSaga from './hideModal.saga';

export default function* rootSaga() {
  yield all([
    updateMarketSaga(),
    updateSetsSaga(),
    redrawCardSaga(),
    updateModalSaga(),
    hideModalSaga(),
  ]);
}
