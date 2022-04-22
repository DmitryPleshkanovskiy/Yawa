import React, { useEffect } from "react";

import { Container } from "components/simple";

import CurrentWeather from "./CurrentWeather";
import ForecastOneDayStep from "./ForecastOneDayStep";
import ForecastOneHourStep from "./ForecastOneHourStep";

import styles from "./forecast.module.scss";

export default function Forecast() {
  useEffect(() => {
    window?.navigator?.geolocation?.getCurrentPosition(
      (data) => {
        // TODO: fetch forecast data with coordinates
        console.log(data);
      },
      (error) => {
        // TODO: show message to enable geolocation
        console.log(error);
      }
    );
  }, []);

  // TODO: Remove mocked data
  const weatherData = {
    startTime: "2022-04-22T03:39:00-04:00",
    values: {
      cloudBase: 0.81,
      cloudCeiling: null,
      cloudCover: 46,
      precipitationIntensity: 0,
      precipitationType: 0,
      temperature: 6,
      temperatureApparent: 6,
      weatherCode: 1101,
      windDirection: 309,
      windGust: 5.81,
      windSpeed: 2.19,
    },
  };

  return (
    <Container>
      <CurrentWeather weatherData={weatherData} />
      <ForecastOneHourStep className={styles.forecastOneHourPanel} />
      <ForecastOneDayStep className={styles.forecastOneDayPanel} />
    </Container>
  );
}
