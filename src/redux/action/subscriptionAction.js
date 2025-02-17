import {
  FETCH_SUBSCRIPTION_FAILURE,
  FETCH_SUBSCRIPTION_REQUEST,
  FETCH_SUBSCRIPTION_SUCCESS,
} from './actionType';

export const fetchSubscriptionRequest = () => ({
  type: FETCH_SUBSCRIPTION_REQUEST,
});

export const fetchSubscriptionSuccess = data => ({
  type: FETCH_SUBSCRIPTION_SUCCESS,
  payload: data,
});

export const fetchSubscriptionFailure = error => ({
  type: FETCH_SUBSCRIPTION_FAILURE,
  payload: error,
});
