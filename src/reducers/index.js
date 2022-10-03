import { combineReducers } from 'redux';
import auth from './auth';
import tokenlist from './tokenlist';
import wallet from './wallet';

export default combineReducers({
  auth,
  tokenlist,
  wallet
});
