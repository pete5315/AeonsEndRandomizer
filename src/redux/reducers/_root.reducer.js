import { combineReducers } from 'redux';
import market from './market.reducer';


const rootReducer = combineReducers({
  market, 
});

export default rootReducer;
