import { combineReducers } from 'redux';
import market from './market.reducer';
import sets from './sets.reducer';
import marketIsLoading from './marketIsLoading.reducer';
import showModal from './showModal.reducer';
import modalImage from './modalImage.reducer';

const rootReducer = combineReducers({
  market,
  sets,
  marketIsLoading,
  showModal,
  modalImage,
});

export default rootReducer;
