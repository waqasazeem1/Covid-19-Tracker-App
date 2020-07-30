import React from "react";
import { Map as LeadletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./utils";
import "./Map.css";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeadletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=' &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop through countries and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
      </LeadletMap>
    </div>
  );
}

export default Map;
