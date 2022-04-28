import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import { Panel, WeatherIcon } from "components/simple";

import styles from "./forecast-one-hour-step.module.scss";

export default function ForecastOneHourStep({
  className,
  weatherData,
  isLoading,
}) {
  return (
    <Panel className={`${className} ${styles.panel}`}>
      <Panel.Title>Next 24h:</Panel.Title>
      {!isLoading ? (
        <div className={styles.stepsWrapper}>
          <div className={styles.steps}>
            {weatherData?.intervals?.slice(0, 24).map((item, index) => {
              const {
                weatherCode,
                temperature,
                windSpeed,
                windDirection,
                sunriseTime,
                sunsetTime,
              } = item?.values || {};

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`forecast-one-hour-step-item-${index}`}
                  className={styles.hourForecastItem}
                >
                  <div>
                    <div>{moment(item?.startTime).format("HH:mm")}</div>
                    <WeatherIcon
                      code={weatherCode}
                      iconSize="sm"
                      time={
                        moment(item?.startTime).isBetween(
                          moment(sunriseTime),
                          moment(sunsetTime)
                        )
                          ? "day"
                          : "night"
                      }
                    />
                  </div>
                  <div>
                    <div>
                      <i className="wi wi-thermometer" />{" "}
                      {Math.round(temperature * 10) / 10}{" "}
                      <i className="wi wi-celsius" />
                    </div>
                    <div>
                      <div>
                        <i className="wi wi-strong-wind" />{" "}
                        {Math.round(windSpeed)} m/s{" "}
                        <i
                          className={`wi wi-wind towards-${Math.round(
                            (180 + windDirection) % 360
                          )}-deg`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.shadow} />
        </div>
      ) : (
        <Panel.Body isLoading={isLoading} />
      )}
    </Panel>
  );
}

ForecastOneHourStep.propTypes = {
  className: PropTypes.string,
  weatherData: PropTypes.shape({
    intervals: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.shape({
          weatherCode: PropTypes.number,
          temperature: PropTypes.number,
          windDirection: PropTypes.number,
          windSpeed: PropTypes.number,
        }),
      })
    ),
  }),
  isLoading: PropTypes.bool,
};

ForecastOneHourStep.defaultProps = {
  className: "",
  weatherData: {},
  isLoading: false,
};
