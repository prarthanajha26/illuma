// userReducer.js

import {
  CLEAR_BOOKMARK_DATA,
  GET_BOOKMARK_DATA_FAILURE,
  GET_BOOKMARK_DATA_REQUEST,
  GET_BOOKMARK_DATA_SUCCESS,
} from '../action/actionType';

const initialState = {
  loading: false,
  bookmarkData: null,
  error: null,
};

const getBookmarData = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARK_DATA_REQUEST:
      return {...state, loading: true, error: null};
    case GET_BOOKMARK_DATA_SUCCESS:
      const updatedData = state.bookmarkData
        ? [
            ...state.bookmarkData.data.filter(
              item =>
                !action.payload.data.some(
                  newItem => newItem.uniqueId === item.uniqueId,
                ),
            ),
            ...action.payload.data,
          ]
        : action.payload.data;

      return {
        ...state,
        loading: false,
        bookmarkData: {
          ...action.payload,
          data: updatedData,
        },
      };
    case GET_BOOKMARK_DATA_FAILURE:
      return {...state, loading: false, error: action.payload};
    case CLEAR_BOOKMARK_DATA:
      return {initialState};
    default:
      return state;
  }
};

export default getBookmarData;
