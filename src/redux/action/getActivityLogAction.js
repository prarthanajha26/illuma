// userActions.js

import {
  GET_ACTIVITY_DATA_FAILURE,
  GET_ACTIVITY_DATA_REQUEST,
  GET_ACTIVITY_DATA_SUCCESS,
} from './actionType';

export const getActivityDataRequest = (email, batch) => ({
  type: GET_ACTIVITY_DATA_REQUEST,
  payload: {email, batch},
});

export const getActivityDataSuccess = ActivityData => ({
  type: GET_ACTIVITY_DATA_SUCCESS,
  payload: ActivityData,
});

export const getActivityDataFailure = error => ({
  type: GET_ACTIVITY_DATA_FAILURE,
  payload: error,
});
