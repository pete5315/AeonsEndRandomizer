import { combineReducers } from 'redux';
import market from './market.reducer';
import sets from './sets.reducer';

const rootReducer = combineReducers({
  market,
  sets,
});

export default rootReducer;
