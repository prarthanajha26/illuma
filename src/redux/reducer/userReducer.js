// src/reducers/userReducer.js
import {
  CREATE_USER_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
} from '../action/actionType';

const initialState = {
  loading: false,
  email: '',
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.payload,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
