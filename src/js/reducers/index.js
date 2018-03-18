import { combineReducers } from 'redux';
import listReducer from './listReducers';

const rootReducers  = combineReducers({
  list: listReducer
});

export default rootReducers;