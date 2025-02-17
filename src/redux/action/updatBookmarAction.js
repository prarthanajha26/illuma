import {
  UPDATE_BOOKMARK_FAILURE,
  UPDATE_BOOKMARK_REQUEST,
  UPDATE_BOOKMARK_SUCCESS,
} from './actionType';

export const updateBookmarkRequest = (email, analysis_id, bookmark) => ({
  type: UPDATE_BOOKMARK_REQUEST,
  payload: {email, analysis_id, bookmark},
});

export const updateBookmarkSuccess = () => ({
  type: UPDATE_BOOKMARK_SUCCESS,
});

export const updateBookmarkFailure = error => ({
  type: UPDATE_BOOKMARK_FAILURE,
  payload: error,
});
