import React, { useEffect, useState } from "react";

// Constants
import { notificationsMessages } from "config/notificationsMessages";

// Global store
import { useStore } from "store";

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

// TODO: Pevent closing the window when data is changed
export default function Settings() {
  const { actions } = useStore();

  const {
    userLocation,
    isUserLocationLoading,
    setUserLocation,
    getLocationFromNavigator,
  } = useUserLocation({
    onError: () => {
      actions.addNotification({
        type: "danger",
        msg: notificationsMessages.getNavigatorLocationError,
      });
    },
  });

  const initialState = userLocation ? { ...userLocation } : { lat: 0, lon: 0 };

  const [state, setState] = useState({
    ...initialState,
    isDataChanged: false,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      lat: userLocation?.lat,
      lon: userLocation?.lon,
    }));
  }, [userLocation]);

  const { lat, lon, isLocalLocationLoading, isDataChanged } = state;

  const validators = {
    isLatitude: (latValue) =>
      Number.isFinite(latValue) && Math.abs(latValue) <= 90,
    isLongitude: (lonValue) =>
      Number.isFinite(lonValue) && Math.abs(lonValue) <= 180,
  };

  const mapCenter = {
    lat: validators.isLatitude(+lat) ? +lat : 0,
    lon: validators.isLongitude(+lon) ? +lon : 0,
  };

  const isLongitudeInvalid =
    !validators.isLongitude(+lon) || lon === ""
      ? "Longitude should be a number between -180 and 180"
      : "";

  const isLatitudeInvalid =
    !validators.isLatitude(+lat) || lat === ""
      ? "Latitude should be a number between -90 and 90"
      : "";

  const isSubmitButtonDisabled =
    !!isLatitudeInvalid || !!isLongitudeInvalid || !isDataChanged;

  const handleInputChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      isDataChanged: true,
    }));
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
          isDataChanged: true,
        }))
      )
      .catch(() => {
        actions.addNotification({
          type: "danger",
          msg: notificationsMessages.getNavigatorLocationShortError,
        });

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
      isDataChanged: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLatitudeInvalid && !isLongitudeInvalid) {
      const newUserLocation = { lat, lon };

      setUserLocation(newUserLocation);
      setState((prevState) => ({ ...prevState, isDataChanged: false }));

      actions.addNotification({
        type: "success",
        msg: notificationsMessages.saveSettingsSuccess,
      });
    }
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
                center={mapCenter}
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
                error={isLatitudeInvalid}
              />
              <Input
                type="number"
                label="Longitude"
                placeholder="Longitude"
                name="lon"
                value={lon}
                onChange={handleInputChange}
                error={isLongitudeInvalid}
              />
              <Button
                className={styles.saveButton}
                variant="primary"
                type="submit"
                disabled={isSubmitButtonDisabled}
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
