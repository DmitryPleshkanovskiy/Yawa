import React from "react";
import PropTypes from "prop-types";

// Libraries
import moment from "moment";

// Helpers
import { isNowDayOrNight } from "helpers";

// Components
import { Panel, WeatherIcon } from "components/simple";
import {
  TemperatureWidget,
  WindWidget,
  HumidityWidget,
  PressureWidget,
  PrecipitationTypeWidget,
  PrecipitationProbabilityWidget,
  PrecipitationIntensityWidget,
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

  return (
    <Panel>
      <Panel.Title>Current:</Panel.Title>
      <Panel.Body className={styles.panelBody} isLoading={isLoading}>
        <div className={styles.layout}>
          <div className={`${styles.column} ${styles.columnLeft}`}>
            <div className={`${styles.cell} ${styles.temp}`}>
              <TemperatureWidget temperature={temperature} />
            </div>
            <div className={`${styles.cell} ${styles.tempApparent}`}>
              Feels like:{" "}
              <div>
                <TemperatureWidget temperature={temperatureApparent} />
              </div>
            </div>
            <div className={styles.cell}>
              <WindWidget windSpeed={windSpeed} windDirection={windDirection} />
            </div>
          </div>

          <div className={`${styles.column} ${styles.mainValue}`}>
            <div className={styles.cell}>
              <WeatherIcon
                code={weatherCode}
                iconSize="lg"
                time={isNowDayOrNight(sunriseTime, sunsetTime)}
              />
            </div>
          </div>
          <div className={`${styles.column} ${styles.columnRight}`}>
            <div className={styles.humidity}>
              <HumidityWidget humidity={humidity} />
            </div>

            <div className={`${styles.cell} ${styles.precipitaion}`}>
              <div>
                <PrecipitationTypeWidget
                  precipitationType={precipitationType}
                />
              </div>
              {precipitationType !== 0 ? (
                <>
                  <PrecipitationProbabilityWidget
                    precipitationProbability={precipitationProbability}
                  />

                  <div>
                    <PrecipitationIntensityWidget
                      precipitationIntensity={precipitationIntensity}
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className={styles.cell}>
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
