import React, { useEffect, useState } from "react";

// Hooks
import { useUserLocation } from "hooks";

// Components
import {
  Container,
  Panel,
  ErrorBoundary,
  Button,
  Input,
} from "components/simple";
import { Map } from "components/complex";

// Styles
import styles from "./settings.module.scss";

export default function Settings() {
  const {
    userLocation,
    isUserLocationLoading,
    setUserLocation,
    getLocationFromNavigator,
  } = useUserLocation();

  const [state, setState] = useState({
    ...(userLocation ? { ...userLocation } : { lat: 0, lon: 0 }),
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      lat: userLocation?.lat,
      lon: userLocation?.lon,
    }));
  }, [userLocation]);

  const { lat, lon, isLocalLocationLoading } = state;

  const validators = {
    isLatitude: (latValue) =>
      Number.isFinite(latValue) && Math.abs(latValue) <= 90,
    isLongitude: (lonValue) =>
      Number.isFinite(lonValue) && Math.abs(lonValue) <= 180,
  };

  const handleInputChange = (name, value) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGetDeviceLocation = () => {
    setState((prevState) => ({ ...prevState, isLocalLocationLoading: true }));
    getLocationFromNavigator()
      // eslint-disable-next-line no-shadow
      .then(({ lat, lon }) =>
        setState((prevState) => ({
          ...prevState,
          lat,
          lon,
          isLocalLocationLoading: false,
        }))
      )
      .catch(() => {
        console.log("Can't get navigator location");
        setState((prevState) => ({
          ...prevState,
          isLocalLocationLoading: false,
        }));
      });
  };

  const handleSetCoordinates = (coord) => {
    setState((prevState) => ({
      ...prevState,
      lat: coord.lat,
      lon: coord.lng,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Move validation here
    // if valid
    const newUserLocation = { lat, lon };
    setUserLocation(newUserLocation);
  };

  return (
    <ErrorBoundary>
      <Container className={styles.settingsContainer}>
        <Panel className={styles.settingsPanel}>
          <Panel.Title>Location settings</Panel.Title>

          <Panel.Body>
            {/* TODO: Geocoding - translate place name to coordinates, autosuggest with debounce, no time for this =( */}
            {/* <div>
              <Input placeholder="Start typing to search location..." />
            </div> */}
            <div className={styles.deviceLocationButtonWrapper}>
              <Button
                variant="primary"
                className={styles.deviceLocationButton}
                onClick={handleGetDeviceLocation}
                isLoading={isUserLocationLoading || isLocalLocationLoading}
              >
                Use my device location
              </Button>
            </div>
          </Panel.Body>

          <div className={styles.mapWrapper}>
            <ErrorBoundary>
              <Map
                center={{ lat, lon }}
                initialZoom={6}
                minZoom={1}
                maxZoom={19}
                isCenterButtonShow
                onSetCoordinates={handleSetCoordinates}
              />
            </ErrorBoundary>
          </div>
          <div className={styles.mapHint}>
            Double-click on map to set coordinates manually
          </div>

          <Panel.Body>
            <form onSubmit={handleSubmit}>
              <Input
                type="number"
                label="Latitude"
                placeholder="Latitude"
                name="lat"
                value={lat}
                onChange={handleInputChange}
                error={
                  !validators.isLatitude(+lat) || lat === ""
                    ? "Latitude should be a number between -90 and 90"
                    : ""
                }
              />
              <Input
                type="number"
                label="Longitude"
                placeholder="Longitude"
                name="lon"
                value={lon}
                onChange={handleInputChange}
                error={
                  !validators.isLongitude(+lon) || lon === ""
                    ? "Longitude should be a number between -180 and 180"
                    : ""
                }
              />
              <Button
                className={styles.saveButton}
                variant="primary"
                type="submit"
              >
                Save
              </Button>
            </form>
          </Panel.Body>
        </Panel>
      </Container>
    </ErrorBoundary>
  );
}
