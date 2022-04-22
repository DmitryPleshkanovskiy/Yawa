import React from "react";

import PropTypes from "prop-types";

export default function CurrentWeather({ weatherData }) {
  return <div>{JSON.stringify(weatherData)}</div>;
}

CurrentWeather.propTypes = {
  weatherData: PropTypes.shape({}),
};

CurrentWeather.defaultProps = {
  weatherData: {},
};
