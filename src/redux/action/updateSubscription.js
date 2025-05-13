// actions/types.js

import {
  UPDATE_SUBSCRIPTION_ERROR,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
} from './actionType';

// actions/profileActions.js

export const updateSubscriptionReq = subscriptionData => ({
  type: UPDATE_SUBSCRIPTION_REQUEST,
  payload: subscriptionData,
});

export const updateSubscriptionSuccess = updatedSubscription => ({
  type: UPDATE_SUBSCRIPTION_SUCCESS,
  payload: updatedSubscription,
});

export const updateSubscriptionFailure = error => ({
  type: UPDATE_SUBSCRIPTION_ERROR,
  payload: error,
});
