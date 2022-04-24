import React from "react";
import PropTypes from "prop-types";

import styles from "./weather-icon.module.scss";

import { weatherCodeMap } from "./weatherCodesMap";

export default function WeatherIcon({ code, iconSize }) {
  const { icon, color, description } = weatherCodeMap?.weatherCode[code] || {
    icon: "na",
    color: "shadow",
    description: "N/A",
  };

  return (
    <div>
      <div className={styles.iconWrapper}>
        <i
          className={`wi ${icon} ${styles[`icon-size-${iconSize}`]} ${
            styles[`color-${color}`]
          }`}
        />
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

WeatherIcon.propTypes = {
  code: PropTypes.number,
  iconSize: PropTypes.string,
};

WeatherIcon.defaultProps = {
  code: -1,
  iconSize: "sm",
};
