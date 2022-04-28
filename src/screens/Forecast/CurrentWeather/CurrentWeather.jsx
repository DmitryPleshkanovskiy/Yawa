import React from "react";
import PropTypes from "prop-types";

// Helpers
import { precipitationTypes } from "../forecast.helpers";

// Components
import { Panel, WeatherIcon } from "components/simple";

// Styles
import styles from "./current-weather.module.scss";
import moment from "moment";

export default function CurrentWeather({ weatherData, isLoading }) {
  const {
    weatherCode,
    temperature,
    temperatureApparent,
    windDirection,
    windSpeed,
    humidity,
    pressureSurfaceLevel,
    precipitationIntensity,
    precipitationProbability,
    precipitationType,
    sunriseTime,
    sunsetTime,
  } = weatherData?.intervals?.length
    ? weatherData?.intervals[0]?.values
    : {
        weatherCode: 0,
        temperature: 0,
        temperatureApparent: 0,
        windDirection: 0,
        windSpeed: 0,
        humidity: 0,
        pressureSurfaceLevel: 0,
        sunriseTime: moment().toISOString(),
        sunsetTime: moment().toISOString(),
      };

  return (
    <Panel>
      <Panel.Title>Current:</Panel.Title>
      <Panel.Body className={styles.panelBody} isLoading={isLoading}>
        <div className={styles.layout}>
          <div className={styles.columnLeft}>
            <div className={styles.temp}>
              <i className="wi wi-thermometer" />{" "}
              {Math.round(temperature * 10) / 10}{" "}
              <i className="wi wi-celsius" />
            </div>
            <div className={styles.tempApparent}>
              Feels like:{" "}
              <div>
                <i className="wi wi-thermometer" />{" "}
                {Math.round(temperatureApparent * 10) / 10}{" "}
                <i className="wi wi-celsius" />
              </div>
            </div>
            <div>
              <div>
                <i className="wi wi-strong-wind" />{" "}
                {Math.round(windSpeed * 10) / 10} m/s{" "}
                <i
                  className={`wi wi-wind towards-${Math.round(
                    (180 + windDirection) % 360
                  )}-deg`}
                />
              </div>
            </div>
          </div>

          <div className={styles.mainValue}>
            <div>
              <WeatherIcon
                code={weatherCode}
                iconSize="lg"
                time={
                  moment().isBetween(moment(sunriseTime), moment(sunsetTime))
                    ? "day"
                    : "night"
                }
              />
            </div>
          </div>
          <div className={styles.columnRight}>
            <div className={styles.humidity}>
              <i className="wi wi-humidity" /> {humidity}%
            </div>

            <div className={styles.precipitation}>
              <div>
                {precipitationType === 0
                  ? "No precipitation"
                  : precipitationTypes[precipitationType]}
              </div>
              <i className="wi wi-raindrop" /> {precipitationProbability}%
              <div>
                <i className="wi wi-raindrop" /> {precipitationIntensity}
                mm/hr
              </div>
            </div>

            <div>
              <i className="wi wi-barometer" />{" "}
              {Math.round(pressureSurfaceLevel)}
              hPa
            </div>
          </div>
        </div>
      </Panel.Body>
    </Panel>
  );
}

CurrentWeather.propTypes = {
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
          sunriseTime: PropTypes.string,
          sunsetTime: PropTypes.string,
        }),
      })
    ),
  }),
  isLoading: PropTypes.bool,
};

CurrentWeather.defaultProps = {
  weatherData: {},
  isLoading: false,
};
