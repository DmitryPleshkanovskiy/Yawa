import React from "react";
import PropTypes from "prop-types";

export default function PrecipitationIntensityWidget({
  precipitationIntensity,
}) {
  return (
    <>
      <i className="wi wi-raindrop" />{" "}
      {Math.round(precipitationIntensity * 100) / 100}
      mm/hr
    </>
  );
}

PrecipitationIntensityWidget.propTypes = {
  precipitationIntensity: PropTypes.number,
};

PrecipitationIntensityWidget.defaultProps = {
  precipitationIntensity: 0,
};
