import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import loaderReducer from './loaderReducer';

const rootReducers = combineReducers({
  user: userReducer,
  chat: chatReducer,
  loader: loaderReducer,
});

export default rootReducers;
