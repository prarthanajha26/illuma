// src/sagas/bookmarkSaga.js
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  updateBookmarkFailure,
  updateBookmarkSuccess,
} from '../action/updatBookmarAction';
import {UPDATE_BOOKMARK_REQUEST} from '../action/actionType';

const updateBookmarkInApi = async (email, analysis_id, bookmark) => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/update_bookmark',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        analysis_id: analysis_id,
        bookmark: bookmark,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to update bookmark');
  }

  return response.json();
};

function* updateBookmark(action) {
  try {
    const {email, analysis_id, bookmark} = action.payload;

    const data = yield call(updateBookmarkInApi, email, analysis_id, bookmark);

    yield put(updateBookmarkSuccess(data));
  } catch (error) {
    yield put(updateBookmarkFailure(error.message));
  }
}

function* bookmarkSaga() {
  yield takeEvery(UPDATE_BOOKMARK_REQUEST, updateBookmark);
}

export default bookmarkSaga;
