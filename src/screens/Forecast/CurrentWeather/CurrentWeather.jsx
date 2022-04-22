import React from "react";
import PropTypes from "prop-types";

import { Panel } from "components/simple";

export default function CurrentWeather({ weatherData }) {
  return (
    <Panel>
      <div>Current weather: {JSON.stringify(weatherData, null, " ")}</div>
    </Panel>
  );
}

CurrentWeather.propTypes = {
  weatherData: PropTypes.shape({}),
};

CurrentWeather.defaultProps = {
  weatherData: {},
};
