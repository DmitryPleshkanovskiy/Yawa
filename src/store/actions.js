import {
  // Fetch forecast data
  FETCH_FORECAST_DATA_REQUEST,
  FETCH_FORECAST_DATA_SUCCESS,
  FETCH_FORECAST_DATA_FAILURE,

  // User location
  SET_USER_LOCATION,
} from "./constants";

export const useActions = (dispatch) => ({
  // === Fetch forecast data ===
  fetchForecastDataRequest: (payload) => {
    dispatch({
      type: FETCH_FORECAST_DATA_REQUEST,
      payload,
    });
  },

  fetchForecastDataSuccess: (payload) => {
    dispatch({
      type: FETCH_FORECAST_DATA_SUCCESS,
      payload,
    });
  },

  fetchForecastDataFailure: (payload) => {
    dispatch({
      type: FETCH_FORECAST_DATA_FAILURE,
      payload,
    });
  },
  // === END Fetch forecast data ===

  // === User location ===
  setUserLocation: (payload) => {
    dispatch({
      type: SET_USER_LOCATION,
      payload,
    });
  },
  // === END User location ===
});
