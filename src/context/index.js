import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

const initialState = {
  forecastData: null,
  forecastDataError: null,
};

export const actions = {
  // FORECAST_DATA
  FETCH_FORECAST_DATA_SUCCESS: "FETCH_FORECAST_DATA_SUCCESS",
  FETCH_FORECAST_DATA_FAILURE: "FETCH_FORECAST_DATA_FAILURE",
};

const reducer = (state, action) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(action);
  }

  switch (action.type) {
    case actions.FETCH_FORECAST_DATA_SUCCESS:
      return {
        ...state,
        forecastData: action.payload,
        forecastDataError: null,
      };

    case actions.FETCH_FORECAST_DATA_FAILURE:
      return {
        ...state,
        forecastData: null,
        forecastDataError: action.payload,
      };

    default:
      throw new Error("No such action");
  }
};

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line react/prop-types
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
