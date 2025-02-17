// actions.js

import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from './actionType';

export const deleteUserRequest = email => ({
  type: DELETE_USER_REQUEST,
  email,
});

export const deleteUserSuccess = message => ({
  type: DELETE_USER_SUCCESS,
  message,
});

export const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  error,
});
