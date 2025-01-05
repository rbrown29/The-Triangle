import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Map, { Source, Layer, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { incidentsGeoJSON } from "./incidents";

const MapComponent = ({ selectedLocation }) => {
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);

  const triangleGeoJSON = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-80.1918, 25.7617], // Miami
          [-66.1057, 18.4655], // San Juan
          [-64.7505, 32.3078], // Bermuda
          [-80.1918, 25.7617], // Close the triangle
        ],
      ],
    },
  };

  const weatherTileUrl = import.meta.env.VITE_WEATHER_TILE_URL;

  useEffect(() => {

    const map = mapRef.current?.getMap();
    if (map) {
      map.on("load", () => {
        // Add fog layer
        map.setFog({
          range: [0.5, 10],
          color: "rgba(200, 200, 255, 0.8)",
          "horizon-blend": 0.3,
          "high-color": "#ffffff",
          "space-color": "#3f3d3d",
          "star-intensity": 0.5,
        });

        // Add weather pattern source
        if (!map.getSource("weather-pattern")) {
          map.addSource("weather-pattern", {
            type: "raster",
            tiles: [weatherTileUrl],
            tileSize: 256,
          });

          // Add weather pattern layer
          map.addLayer({
            id: "weather-pattern",
            type: "raster",
            source: "weather-pattern",
            paint: {
              "raster-opacity": 0.8,
            },
          });
        }
      });
    }
  }, [weatherTileUrl]);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 6,
        speed: 1.2,
        curve: 1.5,
      });

      setPopupInfo({
        coordinates: [selectedLocation.longitude, selectedLocation.latitude],
        description: selectedLocation.description,
      });
    }
  }, [selectedLocation]);

  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  return (
    <div className="map-container">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -73.0,
          latitude: 25.0,
          zoom: 4.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={mapboxToken}
      >
        {/* Bermuda Triangle */}
        <Source id="bermuda-triangle" type="geojson" data={triangleGeoJSON}>
          <Layer
            id="triangle-fill"
            type="fill"
            paint={{
              "fill-color": "rgba(255, 0, 0, 0.3)",
              "fill-outline-color": "#FF0000",
              "fill-opacity": 0.6,
            }}
          />
        </Source>

        {/* Incidents */}
        <Source id="incidents" type="geojson" data={incidentsGeoJSON}>
          <Layer
            id="incident-circles"
            type="circle"
            paint={{
              "circle-color": "#0485f6",
              "circle-radius": 6,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            }}
          />
        </Source>

        {/* Popup */}
        {popupInfo && (
          <Popup
            className="custom-popup"
            longitude={popupInfo.coordinates[0]}
            latitude={popupInfo.coordinates[1]}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div className="popup-container">
              <img src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcropper.watch.aetnd.com%2Fpublic-content-aetn.video.aetnd.com%2Fvideo-thumbnails%2FAETN-History_VMS%2F401%2F247%2FBRAND_THC_UNXP_258701_NLM_423796_2398_60_20221116_01_1116785_NoOB_HD.jpg&f=1&nofb=1&ipt=147a823b7368817cf51692fe7607635ed23146d144a3c25e4a10c32ed1a4cfd4&ipo=images"}
              style={{ width: "100%", height: "auto" }}
              alt="" />
              <strong>Description:</strong>
              <p>{popupInfo.description}</p>
              <strong>Coordinates:</strong>
              <p className="coordinates">
                {popupInfo.coordinates[1].toFixed(2)},{" "}
                {popupInfo.coordinates[0].toFixed(2)}
              </p>
            </div>
          </Popup>
        )}

        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
};

MapComponent.propTypes = {
  selectedLocation: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default MapComponent;

