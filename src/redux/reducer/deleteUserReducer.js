// reducer.js

import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from '../action/actionType';

const initialState = {
  message: '',
  error: '',
  loading: false,
};

export default function deleteUserReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        message: '',
        error: '',
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
        error: '',
        loading: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        message: '',
        loading: false,
      };
    default:
      return state;
  }
}
