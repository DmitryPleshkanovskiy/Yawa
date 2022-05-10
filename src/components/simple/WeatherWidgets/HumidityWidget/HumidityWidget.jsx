import React from "react";
import PropTypes from "prop-types";

export default function HumidityWidget({ humidity }) {
  return (
    <>
      <i className="wi wi-humidity" /> {Math.round(humidity * 10) / 10}%
    </>
  );
}

HumidityWidget.propTypes = {
  humidity: PropTypes.number,
};

HumidityWidget.defaultProps = {
  humidity: 0,
};
