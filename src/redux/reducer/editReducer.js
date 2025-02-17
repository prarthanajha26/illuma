import {
  UPDATE_NEWSLETTER,
  UPDATE_NEWSLETTER_FAILURE,
  UPDATE_NEWSLETTER_SUCCESS,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
} from '../action/actionType';

const initialState = {
  newsletter: {
    loading: false,
    error: null,
    data: null,
  },
  notification: {
    loading: false,
    error: null,
    data: null,
  },
};

const newsNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Newsletter actions
    case UPDATE_NEWSLETTER:
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          loading: true,
          error: null,
        },
      };
    case UPDATE_NEWSLETTER_SUCCESS:
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case UPDATE_NEWSLETTER_FAILURE:
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          loading: false,
          error: action.payload,
        },
      };

    // Notification actions
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          loading: true,
          error: null,
        },
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: {
          ...state.notification,
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case UPDATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        notification: {
          ...state.notification,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default newsNotificationReducer;
