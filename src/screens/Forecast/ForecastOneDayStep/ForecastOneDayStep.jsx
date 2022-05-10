import React from "react";
import PropTypes from "prop-types";

// Libraries
import moment from "moment";

// Components
import { Panel, WeatherIcon } from "components/simple";
import {
  HumidityWidget,
  PrecipitationProbabilityWidget,
  PrecipitationTypeWidget,
  PressureWidget,
  TemperatureWidget,
  WindWidget,
} from "components/simple/WeatherWidgets";

// Styles
import styles from "./forecast-one-day-step.module.scss";

export default function ForecastOneDayStep({
  className,
  weatherData,
  isLoading,
}) {
  return (
    <Panel className={className}>
      <Panel.Title>Next 7 days:</Panel.Title>
      {!isLoading ? (
        <div className={styles.forecastListContainer}>
          {weatherData?.intervals?.map((item, index) => {
            const {
              weatherCode,
              temperature,
              windSpeed,
              windDirection,
              humidity,
              pressureSurfaceLevel,
              precipitationType,
              precipitationProbability,
            } = item?.values || {};

            const dateNumber = moment(item?.startTime).format("DD");
            const dateShort = moment(item?.startTime).format("dd");

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`forecast-one-day-row-${index}`}
                className={styles.forecastDayRow}
              >
                <div className={styles.date}>
                  <div className={styles.dateNumber}>{dateNumber}</div>
                  <div className={styles.dateShort}>{dateShort}</div>
                </div>
                <div className={styles.icon}>
                  <WeatherIcon
                    code={weatherCode}
                    iconSize="sm"
                    showDescription={false}
                  />
                </div>
                <div className={styles.forecastDetails}>
                  <div className={styles.tempInfo}>
                    <TemperatureWidget temperature={temperature} />
                  </div>
                  <div className={styles.windInfo}>
                    <WindWidget
                      windSpeed={windSpeed}
                      windDirection={windDirection}
                    />
                  </div>
                  <div className={styles.humInfo}>
                    <HumidityWidget humidity={humidity} />
                  </div>
                  <div>
                    <PressureWidget pressure={pressureSurfaceLevel} />
                  </div>
                  <div className={styles.precipitation}>
                    <div>
                      <PrecipitationTypeWidget
                        precipitationType={precipitationType}
                      />
                    </div>

                    {precipitationType === 0 ? null : (
                      <div style={{ marginLeft: 10 }}>
                        <PrecipitationProbabilityWidget
                          precipitationProbability={precipitationProbability}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Panel.Body isLoading={isLoading} />
      )}
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
          precipitationProbability: PropTypes.number,
          precipitationType: PropTypes.number,
        }),
      })
    ),
  }),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

ForecastOneDayStep.defaultProps = {
  weatherData: {},
  className: "",
  isLoading: "",
};
