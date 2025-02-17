// src/sagas/subscriptionSaga.js

import {call, put, takeEvery} from 'redux-saga/effects';

import {
  fetchSubscriptionFailure,
  fetchSubscriptionSuccess,
} from '../action/subscriptionAction';
import {FETCH_SUBSCRIPTION_REQUEST} from '../action/actionType';

const fetchSubscriptionDataFromApi = async () => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/get_subscription_plans',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch subscription data');
  }

  return response.json();
};

function* fetchSubscription(action) {
  try {
    const data = yield call(fetchSubscriptionDataFromApi);

    yield put(fetchSubscriptionSuccess(data));
  } catch (error) {
    yield put(fetchSubscriptionFailure(error.message));
  }
}

function* subscriptionSaga() {
  yield takeEvery(FETCH_SUBSCRIPTION_REQUEST, fetchSubscription);
}

export default subscriptionSaga;
