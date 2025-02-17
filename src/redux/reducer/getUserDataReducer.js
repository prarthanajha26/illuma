// userReducer.js

import {act} from 'react';
import {
  DELETE_USER_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  LOGOUT,
} from '../action/actionType';

const initialState = {
  userDataloading: false,
  userData: null,
  error: null,
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      return {...state, userDataloading: true, error: null};
    case GET_USER_DATA_SUCCESS:
      return {...state, userDataloading: false, userData: action.payload};
    case GET_USER_DATA_FAILURE:
      return {...state, userDataloading: false, error: action.payload};
    case DELETE_USER_SUCCESS:
      return {initialState};
    case LOGOUT:
      return {initialState};
    default:
      return state;
  }
};

export default getUserReducer;
