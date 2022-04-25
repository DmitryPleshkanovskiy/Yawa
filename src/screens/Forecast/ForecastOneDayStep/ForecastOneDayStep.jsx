/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";

// Libraries
import moment from "moment";

// Components
import { Panel, WeatherIcon } from "components/simple";

// Styles
import styles from "./forecast-one-day-step.module.scss";

export default function ForecastOneDayStep({ className, weatherData }) {
  return (
    <Panel className={className}>
      <Panel.Title>Next 7 days:</Panel.Title>
      <div className={styles.forecastListContainer}>
        {weatherData?.intervals?.map((item, index) => {
          const {
            weatherCode,
            temperature,
            windSpeed,
            windDirection,
            humidity,
          } = item?.values || {};

          return (
            <div
              key={`forecast-one-day-row-${index}`}
              className={styles.forecastDayRow}
            >
              <div className={styles.date}>
                <div className={styles.dateNumber}>
                  {moment(item?.startTime).format("DD")}
                </div>
                <div className={styles.dateShort}>
                  {moment(item?.startTime).format("dd")}
                </div>
              </div>
              <div className={styles.icon}>
                <WeatherIcon
                  code={weatherCode}
                  iconSize="sm"
                  showDescription={false}
                />
              </div>
              <div className={styles.tempInfo}>
                <i className="wi wi-thermometer" />{" "}
                {Math.round(temperature * 10) / 10}{" "}
                <i className="wi wi-celsius" />
              </div>
              <div className={styles.windInfo}>
                <i className="wi wi-strong-wind" /> {Math.round(windSpeed)} m/s{" "}
                <i
                  className={`wi wi-wind towards-${Math.round(
                    (180 + windDirection) % 360
                  )}-deg`}
                />
              </div>
              <div className={styles.humInfo}>
                <i className="wi wi-humidity" /> {Math.round(humidity)}%
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

ForecastOneDayStep.propTypes = {
  weatherData: PropTypes.shape({
    intervals: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.shape({
          weatherCode: PropTypes.number,
          temperature: PropTypes.number,
          temperatureApparent: PropTypes.number,
          windDirection: PropTypes.number,
          windSpeed: PropTypes.number,
          humidity: PropTypes.number,
          pressureSurfaceLevel: PropTypes.number,
          precipitationIntensity: PropTypes.number,
          precipitationProbability: PropTypes.number,
          precipitationType: PropTypes.number,
        }),
      })
    ),
  }),
  className: PropTypes.string,
};

ForecastOneDayStep.defaultProps = {
  weatherData: {},
  className: "",
};
