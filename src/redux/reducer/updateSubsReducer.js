// src/reducers/analysisReducer.js

import {
  UPDATE_SUBSCRIPTION_ERROR,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
} from '../action/actionType';

const initialState = {
  SubsLoading: false,
  error: null,
};

const updateSubsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        SubsLoading: true,
      };
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        SubsLoading: false,
      };
    case UPDATE_SUBSCRIPTION_ERROR:
      return {
        ...state,
        SubsLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateSubsReducer;
