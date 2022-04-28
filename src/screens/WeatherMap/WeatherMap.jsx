import React from "react";

// Custom hooks
import { useUserLocation } from "hooks";

// Components
import { Map } from "components/complex";
import { ErrorBoundary, Loader } from "components/simple";

// Styles
import styles from "./weather-map.module.scss";

export default function WeatherMap() {
  const { userLocation, isUserLocationLoading } = useUserLocation();

  const API_URL = process.env.REACT_APP_WEATHER_API_URL;
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Current date
  const TIMESTAMP = new Date().toISOString();

  // Zoom for weather tyles is locked to reduce api usage rate
  const LOCKED_ZOOM = 3;

  // Used weather data layers types list
  const weatherLayersTypes = {
    cloudCover: "cloudCover",
    precipitationIntensity: "precipitationIntensity",
  };

  // Used weather data layers config
  const weatherDataLayers = [
    {
      // Clouds
      url: `${API_URL}/map/tile/${LOCKED_ZOOM}/{x}/{y}/${weatherLayersTypes.cloudCover}/${TIMESTAMP}.png?apikey=${API_KEY}`,
      attribution:
        '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
    },
    {
      // Precipitation intensity
      url: `${API_URL}/map/tile/${LOCKED_ZOOM}/{x}/{y}/${weatherLayersTypes.precipitationIntensity}/${TIMESTAMP}.png?apikey=${API_KEY}`,
    },
  ];

  return (
    <div className={styles.weatherMapScreenContainer}>
      <ErrorBoundary>
        {!userLocation || isUserLocationLoading ? (
          <div className={styles.loadingContainer}>
            <Loader variant="dark" />
          </div>
        ) : (
          <Map
            layers={weatherDataLayers}
            center={userLocation ? { ...userLocation } : null}
            legend={
              <>
                Current weather conditions map. It represents{" "}
                <span className={styles.clouds}>clouds</span> and{" "}
                <span className={styles.precipitation}>
                  precipitation intensity
                </span>{" "}
                data.
              </>
            }
            moveMapDisable
            initialZoom={6}
            minZoom={6}
            maxZoom={10}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}
