import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from './actionType';

export const createUser = userData => ({
  type: CREATE_USER,
  payload: userData,
});

export const createUserSuccess = userData => ({
  type: CREATE_USER_SUCCESS,
  payload: userData,
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});
