// subscriptionReducer.js

import {
  FETCH_SUBSCRIPTION_FAILURE,
  FETCH_SUBSCRIPTION_REQUEST,
  FETCH_SUBSCRIPTION_SUCCESS,
} from '../action/actionType';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_REQUEST:
      return {...state, loading: true};
    case FETCH_SUBSCRIPTION_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case FETCH_SUBSCRIPTION_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default subscriptionReducer;
