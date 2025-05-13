// sagas/profileSaga.js
import {call, put, takeEvery} from 'redux-saga/effects';
import {UPDATE_SUBSCRIPTION_REQUEST} from '../action/actionType';
import {
  updateSubscriptionFailure,
  updateSubscriptionSuccess,
} from '../action/updateSubscription';

const updateSubsApi = async subscriptionData => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/change_subscription',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

function* updateSubsSaga(action) {
  try {
    const response = yield call(updateSubsApi, action.payload);
    if (response.error) {
      yield put(updateSubscriptionFailure(response));
    } else {
      yield put(updateSubscriptionSuccess(response));
    }
  } catch (error) {
    yield put(updateSubscriptionFailure(error.message));
  }
}

function* watchUpdateSubscription() {
  yield takeEvery(UPDATE_SUBSCRIPTION_REQUEST, updateSubsSaga);
}

export default watchUpdateSubscription;
