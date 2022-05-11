import { useEffect, useState } from "react";

import { defaultUserLocation } from "config/index";

export const useUserLocation = () => {
  const [state, setState] = useState({
    userLocation: null,
    isUserLocationLoading: false,
  });

  const { userLocation, isUserLocationLoading } = state;

  const setUserLocation = ({ lat, lon }) => {
    setState((prevState) => ({ ...prevState, userLocation: { lat, lon } }));

    localStorage.setItem(
      "userLocation",
      JSON.stringify({
        lat,
        lon,
      })
    );
  };

  const getLocationFromNavigator = () =>
    new Promise((resolve, reject) => {
      window?.navigator?.geolocation?.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data?.coords || {};
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });

  const setLocationFromNavigator = () => {
    setState((prevState) => ({
      ...prevState,
      isUserLocationLoading: true,
    }));

    getLocationFromNavigator()
      .then(({ lat, lon }) => {
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            lat,
            lon,
          })
        );

        setState((prevState) => ({
          ...prevState,
          isUserLocationLoading: false,
          userLocation: { lat, lon },
        }));
      })
      .catch((error) => {
        localStorage.setItem(
          "userLocation",
          JSON.stringify({ ...defaultUserLocation })
        );

        setState((prevState) => ({
          ...prevState,
          userLocation: {
            lat: defaultUserLocation.lat,
            lon: defaultUserLocation.lon,
          },
          isUserLocationLoading: false,
          userLocationError: error,
        }));

        // TODO: show message/notification to enable geolocation
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  useEffect(() => {
    if (!userLocation) {
      let parsedUserLocation;

      const storedUserLocation = localStorage.getItem("userLocation");

      if (storedUserLocation) {
        try {
          parsedUserLocation = JSON.parse(storedUserLocation);
        } catch (error) {
          setLocationFromNavigator();
        }

        setState((prevState) => ({
          ...prevState,
          userLocation: parsedUserLocation,
        }));
      } else {
        setLocationFromNavigator();
      }
    }
  }, []);

  return {
    userLocation,
    setUserLocation,
    isUserLocationLoading,
    getLocationFromNavigator,
  };
};
