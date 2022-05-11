import React from "react";
import PropTypes from "prop-types";

// Styles
import styles from "./humidity-widget.module.scss";

export default function HumidityWidget({ humidity }) {
  return (
    <div className={styles.humidityValue}>
      <i className="wi wi-humidity" /> {Math.round(humidity * 10) / 10}%
    </div>
  );
}

HumidityWidget.propTypes = {
  humidity: PropTypes.number,
};

HumidityWidget.defaultProps = {
  humidity: 0,
};
