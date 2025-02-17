// sagas.js
import {takeLatest, put, call} from 'redux-saga/effects';
import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from '../action/actionType';

const deleteUserApi = async email => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/delete_user',
    {
      method: 'POST',
      body: JSON.stringify({email: email}),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  return response.json();
};

function* deleteUserSaga(action) {
  try {
    const data = yield call(deleteUserApi, action.email);

    yield put({type: DELETE_USER_SUCCESS, message: data.message});
  } catch (error) {
    yield put({
      type: DELETE_USER_FAILURE,
      error: error.message || 'Something went wrong',
    });
  }
}

export function* watchDeleteUserSaga() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);
}
