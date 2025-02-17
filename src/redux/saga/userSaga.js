import {takeEvery, call, put} from 'redux-saga/effects';

import {CREATE_USER} from '../action/actionType';
import {
  createUserFailure,
  createUserSuccess,
} from '../action/createUserActions';

const createUserApi = async userData => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/create_user',
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
};

function* createUser(action) {
  try {
    const userData = action.payload;
    const result = yield call(createUserApi, userData);

    if (result && result.success) {
      yield put(createUserSuccess(result.message));
    } else {
      throw new Error('Unexpected API response');
    }
  } catch (error) {
    console.log('Error caught in saga:', error);
    yield put(createUserFailure(error));
  }
}

function* userCreateSaga() {
  yield takeEvery(CREATE_USER, createUser);
}

export default userCreateSaga;
