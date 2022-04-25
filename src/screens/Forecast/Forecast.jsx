import React, { useEffect, useState } from "react";

// Global store
import { useStore } from "store";

// Service
import WeatherApiService from "api/weatherApiService";

// Components
import { Container } from "components/simple";

import CurrentWeather from "./CurrentWeather";
import ForecastOneDayStep from "./ForecastOneDayStep";
import ForecastOneHourStep from "./ForecastOneHourStep";

// Styles
import styles from "./forecast.module.scss";

// Default to Amsterdam coordinates
const defaultUserLocation = { lat: 52.379189, lon: 4.899431 };

const weatherApiService = new WeatherApiService();

export default function Forecast() {
  const {
    state: { forecastData, isForecastDataLoading, forecastDataError },
    actions,
  } = useStore();

  const [userLocation, setUserLocation] = useState(null);

  const fetchForecastDataRequest = () => {
    actions.fetchForecastDataRequest();

    weatherApiService
      .getTimelines(userLocation)
      .then((res) => actions.fetchForecastDataSuccess(res))
      .catch((err) => {
        // TODO: Replace with notification
        alert(err);
        actions.fetchForecastDataFailure(err);
      });
  };

  useEffect(() => {
    const restoredUserLocation = localStorage.getItem("userLocation");
    if (restoredUserLocation) {
      setUserLocation(restoredUserLocation);
      fetchForecastDataRequest(restoredUserLocation);
    } else {
      window?.navigator?.geolocation?.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data?.coords || {};
          setUserLocation({
            lat: latitude,
            lon: longitude,
          });
        },
        (error) => {
          setUserLocation(defaultUserLocation);
          // TODO: show message/notification to enable geolocation
          console.log(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchForecastDataRequest(userLocation);
    }
  }, [userLocation]);

  // TODO: Need better way to destructure data in case of order change
  const [weatherData1hStep, weatherData1dStep, weatherDataCurrent] =
    forecastData?.data?.timelines || [{}, {}, {}];

  const isLoading =
    isForecastDataLoading || (!forecastData && !forecastDataError);

  return (
    <>
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
        <div>Alert {JSON.stringify(forecastDataError)}</div>
      )}
    </>
  );
}
