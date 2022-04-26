import {
  FETCH_FORECAST_DATA_REQUEST,
  FETCH_FORECAST_DATA_SUCCESS,
  FETCH_FORECAST_DATA_FAILURE,
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
});
