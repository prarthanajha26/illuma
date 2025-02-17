// actions/types.js

import {
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from './actionType';

// actions/profileActions.js

export const updateProfileRequest = profileData => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: profileData,
});

export const updateProfileSuccess = updatedProfile => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updatedProfile,
});

export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});
