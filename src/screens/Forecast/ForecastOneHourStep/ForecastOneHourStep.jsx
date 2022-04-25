import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import { Panel, WeatherIcon } from "components/simple";

import styles from "./forecast-one-hour-step.module.scss";

export default function ForecastOneHourStep({ className, weatherData }) {
  return (
    <Panel className={`${className} ${styles.panel}`}>
      <Panel.Title>Next 24h:</Panel.Title>
      <div className={styles.stepsWrapper}>
        <div className={styles.steps}>
          {
            // eslint-disable-next-line react/prop-types
            weatherData?.intervals?.slice(0, 24).map((item, index) => {
              const { weatherCode, temperature, windSpeed, windDirection } =
                item?.values || {};

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`forecast-one-hour-step-item-${index}`}
                  className={styles.hourForecastItem}
                >
                  <div>
                    <div>{moment(item?.startTime).format("HH:mm")}</div>
                    <WeatherIcon code={weatherCode} iconSize="sm" />
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
            })
          }
        </div>
        <div className={styles.shadow} />
      </div>
    </Panel>
  );
}

ForecastOneHourStep.propTypes = {
  className: PropTypes.string,
  weatherData: PropTypes.shape({}),
};

ForecastOneHourStep.defaultProps = {
  className: "",
  weatherData: {},
};
