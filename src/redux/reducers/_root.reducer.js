import { combineReducers } from 'redux';
import market from './market.reducer';
import sets from './sets.reducer';
import marketIsLoading from './marketIsLoading.reducer';

const rootReducer = combineReducers({
  market,
  sets,
  marketIsLoading,
});

export default rootReducer;
