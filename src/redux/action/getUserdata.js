// userActions.js

import {
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
} from './actionType';

export const getUserDataRequest = email => ({
  type: GET_USER_DATA_REQUEST,
  payload: {email},
});

export const getUserDataSuccess = userData => ({
  type: GET_USER_DATA_SUCCESS,
  payload: userData,
});

export const getUserDataFailure = error => ({
  type: GET_USER_DATA_FAILURE,
  payload: error,
});
