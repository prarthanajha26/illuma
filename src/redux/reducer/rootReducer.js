// src/reducers/rootReducer.js
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import analysisReducer from './analysisReducer';
import subscriptionReducer from './subscriptionreducer';
import getUserReducer from './getUserDataReducer';
import updateBookmarkReducer from './updateBookmarReducer';
import getBookmarData from './getBookmarReducer';
import getActivityData from './getActivityDataReducer';
import newsNotificationReducer from './editReducer';
import profileReducer from './updateProfileReducer';
import deleteUserReducer from './deleteUserReducer';

const rootReducer = combineReducers({
  user: userReducer,
  analysis: analysisReducer,
  subscription: subscriptionReducer,
  getUserData: getUserReducer,
  updateBookmarkReducer: updateBookmarkReducer,
  getBookmarData: getBookmarData,
  getActivityData: getActivityData,
  newsNotificationReducer: newsNotificationReducer,
  profileReducer: profileReducer,
  deleteUser: deleteUserReducer,
});

export default rootReducer;
