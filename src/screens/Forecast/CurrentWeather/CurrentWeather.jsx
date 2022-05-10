import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

// Components
import { Panel, WeatherIcon } from "components/simple";
import {
  TemperatureWidget,
  WindWidget,
  HumidityWidget,
  PressureWidget,
  PrecipitationTypeWidget,
} from "components/simple/WeatherWidgets";

// Styles
import styles from "./current-weather.module.scss";

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

  // TODO: Move to helpers
  const isNowDayOrNight = () =>
    moment().isBetween(moment(sunriseTime), moment(sunsetTime))
      ? "day"
      : "night";

  return (
    <Panel>
      <Panel.Title>Current:</Panel.Title>
      <Panel.Body className={styles.panelBody} isLoading={isLoading}>
        <div className={styles.layout}>
          <div className={styles.columnLeft}>
            <div className={styles.temp}>
              <TemperatureWidget temperature={temperature} />
            </div>
            <div className={styles.tempApparent}>
              Feels like:{" "}
              <div>
                <TemperatureWidget temperature={temperatureApparent} />
              </div>
            </div>
            <div>
              <WindWidget windSpeed={windSpeed} windDirection={windDirection} />
            </div>
          </div>

          <div className={styles.mainValue}>
            <div>
              <WeatherIcon
                code={weatherCode}
                iconSize="lg"
                time={isNowDayOrNight()}
              />
            </div>
          </div>
          <div className={styles.columnRight}>
            <div className={styles.humidity}>
              <HumidityWidget humidity={humidity} />
            </div>

            <div className={styles.precipitation}>
              {/* TODO: Replace with widget */}
              <div>
                <PrecipitationTypeWidget
                  precipitationType={precipitationType}
                />
                {/* {precipitationType === 0
                  ? "No precipitation"
                  : precipitationTypes[precipitationType]} */}
              </div>
              <i className="wi wi-raindrop" /> {precipitationProbability}%
              <div>
                <i className="wi wi-raindrop" />{" "}
                {Math.round(precipitationIntensity * 100) / 100}
                mm/hr
              </div>
            </div>

            <div>
              <PressureWidget pressure={pressureSurfaceLevel} />
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
