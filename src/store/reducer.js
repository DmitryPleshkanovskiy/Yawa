import {
  // Fetch forecast data
  FETCH_FORECAST_DATA_REQUEST,
  FETCH_FORECAST_DATA_SUCCESS,
  FETCH_FORECAST_DATA_FAILURE,

  // User location
  SET_USER_LOCATION,
} from "./constants";

export const initialState = {
  // Forecast data
  forecastData: null,
  isForecastDataLoading: false,
  forecastDataError: null,

  // User location
  userLocation: null,
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

    // === User location ===
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: payload,
      };
    // === END User location ===

    default:
      return state;
  }
};

export default reducer;
