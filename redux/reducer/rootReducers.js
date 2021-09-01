import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducers = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export default rootReducers;
