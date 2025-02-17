// src/sagas/userSaga.js

import {call, put, takeEvery} from 'redux-saga/effects';
import {getUserDataFailure, getUserDataSuccess} from '../action/getUserdata';
import {GET_USER_DATA_REQUEST} from '../action/actionType';

const fetchUserDataFromApi = async email => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/get_ext_user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
};

function* fetchUserData(action) {
  try {
    const {email} = action.payload;
    const data = yield call(fetchUserDataFromApi, email);

    yield put(getUserDataSuccess(data));
  } catch (error) {
    yield put(getUserDataFailure(error.message));
  }
}

// Watcher Saga listens for the GET_USER_DATA_REQUEST action and triggers the worker saga
function* userSaga() {
  yield takeEvery(GET_USER_DATA_REQUEST, fetchUserData);
}

export default userSaga;
