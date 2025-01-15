import {
  FETCH_ANALYSIS_FAILURE,
  FETCH_ANALYSIS_REQUEST,
  FETCH_ANALYSIS_SUCCESS,
} from './actionType';

export const fetchAnalysisRequest = (email, imageData) => ({
  type: FETCH_ANALYSIS_REQUEST,
  payload: {email, imageData}, // Pass both email and imageData
});

// Action on success
export const fetchAnalysisSuccess = data => ({
  type: FETCH_ANALYSIS_SUCCESS,
  payload: data,
});

// Action on failure
export const fetchAnalysisFailure = error => ({
  type: FETCH_ANALYSIS_FAILURE,
  payload: error,
});
