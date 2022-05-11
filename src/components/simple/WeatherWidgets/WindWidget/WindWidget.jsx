import React from "react";
import PropTypes from "prop-types";

// Helpers
import { calculatePercentageFromRange, mix } from "helpers/colorsManipulation";

export default function WindWidget({ windSpeed, windDirection }) {
  return (
    <div
      style={{
        color: mix(
          "cf4529",
          "000000",
          calculatePercentageFromRange(5, 25, windSpeed)
        ),
      }}
    >
      <i className="wi wi-strong-wind" /> {Math.round(windSpeed * 10) / 10} m/s{" "}
      <i
        className={`wi wi-wind towards-${Math.round(
          (180 + windDirection) % 360
        )}-deg`}
      />
    </div>
  );
}

WindWidget.propTypes = {
  windSpeed: PropTypes.number,
  windDirection: PropTypes.number,
};

WindWidget.defaultProps = {
  windSpeed: 0,
  windDirection: 0,
};
