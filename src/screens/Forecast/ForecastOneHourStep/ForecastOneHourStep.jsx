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
} from "components/simple/WeatherWidgets";

// Styles
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
            {/* First 24 hours from forecast */}
            {weatherData?.intervals?.slice(0, 24).map((item, index) => {
              const {
                startTime,
                values: {
                  weatherCode,
                  temperature,
                  windSpeed,
                  windDirection,
                  sunriseTime,
                  sunsetTime,
                } = {},
              } = item || {};

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`forecast-one-hour-step-item-${index}`}
                  className={styles.hourForecastItem}
                >
                  <div>
                    <div>{moment(startTime).format("HH:mm")}</div>
                    <WeatherIcon
                      code={weatherCode}
                      iconSize="sm"
                      time={isNowDayOrNight(sunriseTime, sunsetTime, startTime)}
                    />
                  </div>
                  <div>
                    <div>
                      <TemperatureWidget temperature={temperature} />
                    </div>
                    <div className={styles.windWidgetContainer}>
                      <WindWidget
                        windSpeed={windSpeed}
                        windDirection={windDirection}
                      />
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
