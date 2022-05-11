import React from "react";
import PropTypes from "prop-types";

export default function PressureWidget({ pressure }) {
  return (
    <>
      <i className="wi wi-barometer" /> {Math.round(pressure)}
      hPa
    </>
  );
}

PressureWidget.propTypes = {
  pressure: PropTypes.number,
};

PressureWidget.defaultProps = {
  pressure: 0,
};
