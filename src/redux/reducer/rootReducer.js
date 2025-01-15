// src/reducers/rootReducer.js
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import analysisReducer from './analysisReducer';

const rootReducer = combineReducers({
  user: userReducer,
  analysis: analysisReducer,
});

export default rootReducer;
