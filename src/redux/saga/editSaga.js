import {call, put, takeEvery} from 'redux-saga/effects';
import {
  UPDATE_NEWSLETTER,
  UPDATE_NEWSLETTER_FAILURE,
  UPDATE_NEWSLETTER_SUCCESS,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
} from '../action/actionType';

const updateNewsletterAPI = data => {
  return new Promise((resolve, reject) => {
    const {email, status} = data;

    fetch(
      'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/update_newsletter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer yourTokenHere`,
          email: email,
          status: status,
        },
        body: JSON.stringify({email, status}),
      },
    )
      .then(response => response.json())
      .then(responseData => resolve(responseData))
      .catch(error => reject('Failed to update newsletter: ' + error));
  });
};

const updateNotificationAPI = data => {
  return new Promise((resolve, reject) => {
    const {email, status} = data;

    fetch(
      'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/update_notification',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer yourTokenHere`,
          email: email,
          status: status,
        },
        body: JSON.stringify({email, status}),
      },
    )
      .then(response => response.json())
      .then(responseData => resolve(responseData))
      .catch(error => reject('Failed to update notification: ' + error));
  });
};

function* updateNewsletterSaga(action) {
  try {
    const response = yield call(updateNewsletterAPI, action.payload);
    yield put({type: UPDATE_NEWSLETTER_SUCCESS, payload: response});
  } catch (error) {
    yield put({type: UPDATE_NEWSLETTER_FAILURE, payload: error});
  }
}

function* updateNotificationSaga(action) {
  try {
    const response = yield call(updateNotificationAPI, action.payload);
    console.log(response, 'response');

    yield put({type: UPDATE_NOTIFICATION_SUCCESS, payload: response});
  } catch (error) {
    yield put({type: UPDATE_NOTIFICATION_FAILURE, payload: error});
  }
}

function* watchUpdateNewsletter() {
  yield takeEvery(UPDATE_NEWSLETTER, updateNewsletterSaga);
}

function* watchUpdateNotification() {
  yield takeEvery(UPDATE_NOTIFICATION, updateNotificationSaga);
}

export {watchUpdateNewsletter, watchUpdateNotification};
