import React from "react";
import PropTypes from "prop-types";

// Helpers
import { precipitationTypes } from "../../../../screens/Forecast/forecast.helpers";

export default function PrecipitationTypeWidget({ precipitationType }) {
  return (
    <div>
      {precipitationType === 0
        ? "No precipitation"
        : precipitationTypes[precipitationType]}
    </div>
  );
}

PrecipitationTypeWidget.propTypes = {
  precipitationType: PropTypes.number,
};

PrecipitationTypeWidget.defaultProps = {
  precipitationType: 0,
};
