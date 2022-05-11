import React from "react";
import PropTypes from "prop-types";

export default function TemperatureWidget({ temperature }) {
  return (
    <>
      <i className="wi wi-thermometer" /> {Math.round(temperature * 10) / 10}{" "}
      <i className="wi wi-celsius" />
    </>
  );
}

TemperatureWidget.propTypes = {
  temperature: PropTypes.number,
};

TemperatureWidget.defaultProps = {
  temperature: 0,
};
