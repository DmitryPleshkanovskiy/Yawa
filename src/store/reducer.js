// Fetch forecast data
import {
  FETCH_FORECAST_DATA_REQUEST,
  FETCH_FORECAST_DATA_SUCCESS,
  FETCH_FORECAST_DATA_FAILURE,
} from "./constants";

export const initialState = {
  forecastData: null,
  isForecastDataLoading: false,
  forecastDataError: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    // === Fetch forecast data ===
    case FETCH_FORECAST_DATA_REQUEST:
      return { ...state, isForecastDataLoading: true };

    case FETCH_FORECAST_DATA_SUCCESS:
      return {
        ...state,
        forecastData: payload,
        forecastDataError: null,
        isForecastDataLoading: false,
      };

    case FETCH_FORECAST_DATA_FAILURE:
      return {
        ...state,
        forecastData: null,
        forecastDataError: payload,
        isForecastDataLoading: false,
      };
    // === END Fetch forecast data ===

    default:
      return state;
  }
};

export default reducer;
