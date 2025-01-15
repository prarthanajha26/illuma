// src/reducers/analysisReducer.js

import {
  FETCH_ANALYSIS_FAILURE,
  FETCH_ANALYSIS_REQUEST,
  FETCH_ANALYSIS_SUCCESS,
} from '../action/actionType';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const analysisReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANALYSIS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ANALYSIS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ANALYSIS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default analysisReducer;
