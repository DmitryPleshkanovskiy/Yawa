import React, { useEffect } from "react";

// Constants
import { notificationsMessages } from "config/notificationsMessages";

// Global store
import { useStore } from "store";

// Custom hooks
import { useUserLocation } from "hooks";

// Service
import WeatherApiService from "api/weatherApiService";

// Components
import { Container, ErrorBoundary } from "components/simple";

import CurrentWeather from "./CurrentWeather";
import ForecastOneDayStep from "./ForecastOneDayStep";
import ForecastOneHourStep from "./ForecastOneHourStep";

// Styles
import styles from "./forecast.module.scss";

const weatherApiService = new WeatherApiService();

export default function Forecast() {
  const {
    state: {
      // Forecast data
      forecastData,
      isForecastDataLoading,
      forecastDataError,
    },
    actions,
  } = useStore();

  const { userLocation } = useUserLocation({
    onError: () => {
      actions.addNotification({
        type: "danger",
        msg: notificationsMessages.getNavigatorLocationError,
      });
    },
  });

  const fetchForecastDataRequest = () => {
    actions.fetchForecastDataRequest();

    weatherApiService
      .getTimelines(userLocation)
      .then((res) => actions.fetchForecastDataSuccess(res))
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error(err);
        }

        actions.addNotification({
          type: "danger",
          msg: notificationsMessages.getForecastDataError,
        });

        actions.fetchForecastDataFailure(err);
      });
  };

  useEffect(() => {
    if (userLocation) {
      fetchForecastDataRequest();
    }
  }, [userLocation]);

  // TODO: Need better way to destructure data in case of order change
  const [weatherData1hStep, weatherData1dStep, weatherDataCurrent] =
    forecastData?.data?.timelines || [{}, {}, {}];

  const isLoading =
    isForecastDataLoading || (!forecastData && !forecastDataError);

  return (
    <ErrorBoundary>
      {!forecastDataError ? (
        <Container className={styles.layout}>
          <CurrentWeather
            weatherData={weatherDataCurrent}
            isLoading={isLoading}
          />
          <ForecastOneHourStep
            className={styles.forecastOneHourPanel}
            weatherData={weatherData1hStep}
            isLoading={isLoading}
          />
          <ForecastOneDayStep
            className={styles.forecastOneDayPanel}
            weatherData={weatherData1dStep}
            isLoading={isLoading}
          />
        </Container>
      ) : (
        // TODO: Add Alert component
        <div className={styles.alert}>
          Alert {JSON.stringify(forecastDataError)}
        </div>
      )}
    </ErrorBoundary>
  );
}
