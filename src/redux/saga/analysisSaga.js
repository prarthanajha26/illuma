// src/sagas/analysisSaga.js
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  fetchAnalysisFailure,
  fetchAnalysisSuccess,
} from '../action/analysisAction';
import {FETCH_ANALYSIS_REQUEST} from '../action/actionType';

// Define the API function
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
        image_data: imageData, // Base64 image data
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch analysis data');
  }

  return response.json();
};

// Worker Saga: Handles the fetch analysis request
function* fetchAnalysis(action) {
  try {
    const {email, imageData} = action.payload; // Destructure email and imageData from action payload

    // Make the API call to fetch the analysis data
    const data = yield call(fetchAnalysisDataFromApi, email, imageData);
    console.log(data, 'data');

    // Dispatch success action with the data
    yield put(fetchAnalysisSuccess(data));
  } catch (error) {
    // Dispatch failure action with the error message
    yield put(fetchAnalysisFailure(error.message));
  }
}

// Watcher Saga: Watches for the FETCH_ANALYSIS_REQUEST action
function* analysisSaga() {
  yield takeEvery(FETCH_ANALYSIS_REQUEST, fetchAnalysis);
}
export default analysisSaga;
