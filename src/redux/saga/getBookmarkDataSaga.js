import {call, put, takeEvery} from 'redux-saga/effects';
import {
  getBookmarkDataFailure,
  getBookmarkDataSuccess,
} from '../action/getBookmarkAction';
import {GET_BOOKMARK_DATA_REQUEST} from '../action/actionType';

const fetchBookmarkDataFromApi = async (email, batch) => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/get_favorites',
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

function* fetchBookmarkData(action) {
  try {
    const {email, batch} = action.payload;
    const data = yield call(fetchBookmarkDataFromApi, email, batch);

    yield put(getBookmarkDataSuccess(data));
  } catch (error) {
    yield put(getBookmarkDataFailure(error.message));
  }
}
function* getBookmarkSaga() {
  yield takeEvery(GET_BOOKMARK_DATA_REQUEST, fetchBookmarkData);
}

export default getBookmarkSaga;
