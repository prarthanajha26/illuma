// userActions.js

import {
  GET_BOOKMARK_DATA_FAILURE,
  GET_BOOKMARK_DATA_REQUEST,
  GET_BOOKMARK_DATA_SUCCESS,
} from './actionType';

export const getBookmarkDataRequest = (email, batch) => ({
  type: GET_BOOKMARK_DATA_REQUEST,
  payload: {email, batch},
});

export const getBookmarkDataSuccess = bookmarkData => ({
  type: GET_BOOKMARK_DATA_SUCCESS,
  payload: bookmarkData,
});

export const getBookmarkDataFailure = error => ({
  type: GET_BOOKMARK_DATA_FAILURE,
  payload: error,
});
