import {
  UPDATE_NEWSLETTER,
  UPDATE_NEWSLETTER_FAILURE,
  UPDATE_NEWSLETTER_SUCCESS,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
} from './actionType';

// Action Creators for Newsletter
export const updateNewsletter = payload => ({
  type: UPDATE_NEWSLETTER,
  payload,
});

export const updateNewsletterSuccess = data => ({
  type: UPDATE_NEWSLETTER_SUCCESS,
  payload: data,
});

export const updateNewsletterFailure = error => ({
  type: UPDATE_NEWSLETTER_FAILURE,
  payload: error,
});

// Action Creators for Notification
export const updateNotification = payload => ({
  type: UPDATE_NOTIFICATION,
  payload,
});

export const updateNotificationSuccess = data => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  payload: data,
});

export const updateNotificationFailure = error => ({
  type: UPDATE_NOTIFICATION_FAILURE,
  payload: error,
});
