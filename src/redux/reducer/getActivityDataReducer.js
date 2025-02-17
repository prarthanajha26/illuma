import {
  CLEAR_ACTIVITY_DATA,
  GET_ACTIVITY_DATA_FAILURE,
  GET_ACTIVITY_DATA_REQUEST,
  GET_ACTIVITY_DATA_SUCCESS,
} from '../action/actionType';

const initialState = {
  activeLoading: false,
  activityData: null,
  activeError: null,
};

const getActivityData = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITY_DATA_REQUEST:
      return {...state, activeLoading: true, activeError: null};
    case GET_ACTIVITY_DATA_SUCCESS:
      const updatedData = state.activityData
        ? [
            ...state.activityData.data,
            ...action.payload.data.filter(
              newItem =>
                !state.activityData.data.some(
                  existingItem => existingItem.unique_id === newItem.unique_id,
                ),
            ),
          ]
        : action.payload.data;
      return {
        ...state,
        activeLoading: false,
        activityData: {
          ...action.payload,
          data: updatedData,
        },
      };

    case GET_ACTIVITY_DATA_FAILURE:
      return {...state, activeLoading: false, activeError: action.payload};
    case CLEAR_ACTIVITY_DATA:
      return {initialState};
    default:
      return state;
  }
};

export default getActivityData;
