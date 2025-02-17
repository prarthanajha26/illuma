// src/reducers/analysisReducer.js

import {
  UPDATE_BOOKMARK_FAILURE,
  UPDATE_BOOKMARK_REQUEST,
  UPDATE_BOOKMARK_SUCCESS,
} from '../action/actionType';

const initialState = {
  loading: false,
  error: null,
};

const updateBookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOKMARK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BOOKMARK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_BOOKMARK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateBookmarkReducer;
