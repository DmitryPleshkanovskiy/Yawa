import React, { useEffect, useState } from "react";

import moment from "moment";
import queryString from "query-string";

import WeatherApiService from "api/weatherApiService";

import { Container } from "components/simple";

import CurrentWeather from "./CurrentWeather";
import ForecastOneDayStep from "./ForecastOneDayStep";
import ForecastOneHourStep from "./ForecastOneHourStep";

import styles from "./forecast.module.scss";

// Default to Amsterdam coordinates
const defaultUserLocation = { lat: 52.379189, lon: 4.899431 };

export default function Forecast() {
  const [userLocation, setUserLocation] = useState(defaultUserLocation);
  const [forecastData, setForecastData] = useState(null);

  const weatherApiService = new WeatherApiService();

  const fetchWeratherData = async () => {
    // TODO: Wrap into service
    const apikey = process.env.REACT_APP_WEATHER_API_KEY;
    const location = [userLocation.lat, userLocation.lon];
    const fields = [
      "precipitationIntensity",
      "precipitationType",
      "humidity",
      "windSpeed",
      "windGust",
      "windDirection",
      "temperature",
      "temperatureApparent",
      "cloudCover",
      "pressureSurfaceLevel",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
    ];
    const units = "metric";
    const timesteps = ["current", "1h", "1d"];
    const now = moment.utc();
    const startTime = moment.utc(now).add(0, "minutes").toISOString();
    const endTime = moment.utc(now).add(7, "days").toISOString();

    const timezone = "UTC";

    const getTimelineParameters = queryString.stringify(
      {
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
      },
      { arrayFormat: "comma" }
    );

    if (!forecastData) {
      const response = await weatherApiService.getTimelines(
        getTimelineParameters
      );

      setForecastData(response);
    }
  };

  useEffect(() => {
    const restoredUserLocation = localStorage.getItem("userLocation");
    if (restoredUserLocation) {
      setUserLocation(restoredUserLocation);
      fetchWeratherData();
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
    fetchWeratherData();
  }, [userLocation]);

  const [weatherData1hStep, weatherData1dStep, weatherDataCurrent] =
    forecastData?.data?.timelines || [{}, {}, {}];

  return (
    <Container>
      <CurrentWeather weatherData={weatherDataCurrent} />
      <ForecastOneHourStep className={styles.forecastOneHourPanel} />
      <ForecastOneDayStep className={styles.forecastOneDayPanel} />
    </Container>
  );
}
