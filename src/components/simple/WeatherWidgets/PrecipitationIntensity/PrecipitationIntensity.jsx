import React from "react";
import PropTypes from "prop-types";

export default function PrecipitationIntensity({ precipitationIntensity }) {
  return (
    <>
      <i className="wi wi-raindrop" />{" "}
      {Math.round(precipitationIntensity * 100) / 100}
      mm/hr
    </>
  );
}

PrecipitationIntensity.propTypes = {
  precipitationIntensity: PropTypes.number,
};

PrecipitationIntensity.defaultProps = {
  precipitationIntensity: 0,
};
