// src/sagas/analysisSaga.js
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  fetchAnalysisFailure,
  fetchAnalysisSuccess,
} from '../action/analysisAction';
import {FETCH_ANALYSIS_REQUEST} from '../action/actionType';

const fetchAnalysisDataFromApi = async (email, imageData) => {
  const response = await fetch(
    'https://illuma-ai-gdcyh9andwarg9b8.canadacentral-01.azurewebsites.net/analyze_image',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        image_data: imageData,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch analysis data');
  }

  return response.json();
};

function* fetchAnalysis(action) {
  try {
    const {email, imageData} = action.payload;

    const data = yield call(fetchAnalysisDataFromApi, email, imageData);

    yield put(fetchAnalysisSuccess(data));
  } catch (error) {
    yield put(fetchAnalysisFailure(error.message));
  }
}

function* analysisSaga() {
  yield takeEvery(FETCH_ANALYSIS_REQUEST, fetchAnalysis);
}
export default analysisSaga;
