import React from "react";
import PropTypes from "prop-types";

// Helpers
import { calculatePercentageFromRange, mix } from "helpers/colorsManipulation";

// Styles
import styles from "./temperature-widget.module.scss";

export default function TemperatureWidget({ temperature }) {
  return (
    <div
      style={{
        color:
          temperature > 0
            ? mix(
                "FFA500",
                "00ff5e",
                calculatePercentageFromRange(0, 30, temperature)
              )
            : mix(
                "1784d1",
                "9000ff",
                calculatePercentageFromRange(-15, 0, temperature)
              ),
      }}
    >
      <i className="wi wi-thermometer" />{" "}
      <span className={styles.temperatureValue}>
        {Math.round(temperature * 10) / 10}
      </span>{" "}
      <i className="wi wi-celsius" />
    </div>
  );
}

TemperatureWidget.propTypes = {
  temperature: PropTypes.number,
};

TemperatureWidget.defaultProps = {
  temperature: 0,
};
