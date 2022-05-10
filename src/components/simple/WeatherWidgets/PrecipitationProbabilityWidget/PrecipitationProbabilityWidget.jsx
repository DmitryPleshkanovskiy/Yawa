import React from "react";
import PropTypes from "prop-types";

export default function PrecipitationProbabilityWidget({
  precipitationProbability,
}) {
  return (
    <div>
      <i className="wi wi-raindrop" /> {precipitationProbability}%
    </div>
  );
}

PrecipitationProbabilityWidget.propTypes = {
  precipitationProbability: PropTypes.number,
};

PrecipitationProbabilityWidget.defaultProps = {
  precipitationProbability: 0,
};
