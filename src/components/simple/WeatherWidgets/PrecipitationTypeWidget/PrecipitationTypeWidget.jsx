import React from "react";
import PropTypes from "prop-types";

export const precipitationTypes = {
  0: "N/A",
  1: "Rain",
  2: "Snow",
  3: "Freezing Rain",
  4: "Ice Pellets",
};

export default function PrecipitationTypeWidget({ precipitationType }) {
  return (
    <div>
      {precipitationType === 0 ? (
        <>
          No <i className="wi wi-raindrop" />
        </>
      ) : (
        precipitationTypes[precipitationType]
      )}
    </div>
  );
}

PrecipitationTypeWidget.propTypes = {
  precipitationType: PropTypes.number,
};

PrecipitationTypeWidget.defaultProps = {
  precipitationType: 0,
};
