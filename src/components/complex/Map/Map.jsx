import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Libraries
import L from "leaflet";

// Components
import { Button } from "components/simple";

// Styles
import "leaflet/dist/leaflet.css";
import styles from "./map.module.scss";

// Icons
import markerIcon from "assets/icons/marker.png";

// Basic openstreetmaps layer
const OSMlayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSMattribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

let map = null;
let markers = null;

const icon = L.icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
});

const Map = ({
  className,
  layers,
  center,
  isCenterButtonShow,
  initialZoom,
  minZoom,
  maxZoom,
  zoomControl,
  legend,
  moveMapDisable,
  onSetCoordinates,
}) => {
  const ref = useRef({});

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line
      map = L.map(ref.current, {
        zoomControl,
        initialZoom,
        minZoom,
        maxZoom,
      });

      map.setView([center?.lat || 0, center?.lon || 0], initialZoom);
    }

    // Basic OSM layer
    L.tileLayer(OSMlayer, {
      attribution: OSMattribution,
    }).addTo(map);

    // Markers layer
    markers = L.layerGroup();
    markers.addTo(map);

    if (layers?.length) {
      layers.forEach((layer) => {
        if (layer?.attribution) {
          const layerToAdd = L.tileLayer(
            layer?.url,
            layer?.attribution
              ? {
                  attribution: layer.attribution,
                }
              : {}
          );

          // TODO: Refactor options setup
          layerToAdd.options.maxNativeZoom = 3;
          layerToAdd.options.opacity = 0.5;

          layerToAdd.addTo(map);
        }
      });
    }

    if (onSetCoordinates) {
      // Disable zoom on double click
      map.doubleClickZoom.disable();

      map.on("dblclick", (e) => {
        onSetCoordinates({ ...e.latlng });
      });
    }

    if (moveMapDisable) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
    }

    return () => {
      map.remove();
    };
  }, [0]);

  useEffect(() => {
    if (map && center?.lat && center?.lon) {
      map.panTo([center?.lat, center?.lon]);

      if (markers) {
        markers.clearLayers();
      }

      const marker = L.marker([center?.lat, center?.lon], { icon });
      markers.addLayer(marker);
    }
  }, [center, center?.lat, center?.lon, map]);

  const handlePanToCenter = () => {
    if (map && center?.lat && center?.lon) {
      map.panTo([center?.lat, center?.lon]);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {isCenterButtonShow ? (
        <Button
          className={styles.centerButton}
          variant="secondary"
          title="Center on marker"
          type="button"
          onClick={handlePanToCenter}
        >
          <img src={markerIcon} alt="center" />
        </Button>
      ) : null}

      {legend ? <div className={styles.description}>{legend}</div> : null}
      <div ref={ref} className={`${styles.container} ${className}`} />
    </div>
  );
};

Map.propTypes = {
  className: PropTypes.string,
  layers: PropTypes.arrayOf(PropTypes.shape({})),
  legend: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.number,
  ]),
  moveMapDisable: PropTypes.bool,
  center: PropTypes.shape({ lat: PropTypes.number, lon: PropTypes.number }),
  isCenterButtonShow: PropTypes.bool,
  zoomControl: PropTypes.bool,
  initialZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  onSetCoordinates: PropTypes.func,
};

Map.defaultProps = {
  className: "",
  layers: [],
  legend: null,
  moveMapDisable: false,
  center: null,
  isCenterButtonShow: false,
  zoomControl: true,
  initialZoom: 6,
  minZoom: 1,
  maxZoom: 19,
  onSetCoordinates: null,
};

export default Map;
