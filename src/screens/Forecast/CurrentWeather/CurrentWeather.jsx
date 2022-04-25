import React from "react";
import PropTypes from "prop-types";

import { Panel, WeatherIcon } from "components/simple";

import styles from "./current-weather.module.scss";

const precipitationTypes = {
  0: "N/A",
  1: "Rain",
  2: "Snow",
  3: "Freezing Rain",
  4: "Ice Pellets",
};

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
                <i className="wi wi-strong-wind" /> {windSpeed} m/s{" "}
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
              <WeatherIcon code={weatherCode} iconSize="lg" />
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
