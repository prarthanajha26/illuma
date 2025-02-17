import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_ACTIVITY_DATA_REQUEST} from '../action/actionType';
import {
  getActivityDataFailure,
  getActivityDataSuccess,
} from '../action/getActivityLogAction';

const fetchActivityDataFromApi = async (email, batch) => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/get_activity_log',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, batch: batch}),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch bookmark data');
  }

  return response.json();
};

function* fetchActivityData(action) {
  try {
    const {email, batch} = action.payload;
    const data = yield call(fetchActivityDataFromApi, email, batch);

    yield put(getActivityDataSuccess(data));
  } catch (error) {
    yield put(getActivityDataFailure(error.message));
  }
}
function* getActivitySaga() {
  yield takeEvery(GET_ACTIVITY_DATA_REQUEST, fetchActivityData);
}

export default getActivitySaga;
