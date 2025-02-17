// sagas/profileSaga.js
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  updateProfileFailure,
  updateProfileSuccess,
} from '../action/updateProfileAction';
import {UPDATE_PROFILE_REQUEST} from '../action/actionType';

const updateProfileApi = async profileData => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/update_user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

function* updateProfileSaga(action) {
  try {
    const response = yield call(updateProfileApi, action.payload);
    if (response.error) {
      yield put(updateProfileFailure(response));
    } else {
      yield put(updateProfileSuccess(response));
    }
  } catch (error) {
    yield put(updateProfileFailure(error.message));
  }
}

function* watchUpdateProfile() {
  yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga);
}

export default watchUpdateProfile;
