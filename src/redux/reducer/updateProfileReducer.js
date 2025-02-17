// reducers/profileReducer.js

import {
  CLEAR_PROFILE_STATUS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../action/actionType';

const initialState = {
  success: false,
  Updateloading: false,
  error: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {...state, loading: true, error: false, success: false};
    case UPDATE_PROFILE_SUCCESS:
      return {...state, loading: false, success: true};
    case UPDATE_PROFILE_FAILURE:
      return {...state, loading: false, error: action.payload, success: false};
    case CLEAR_PROFILE_STATUS:
      return {
        ...state,
        success: false,
        error: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
