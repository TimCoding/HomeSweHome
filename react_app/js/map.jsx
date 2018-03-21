import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
  )
}
))

export default Map;

window._Map = Map;
