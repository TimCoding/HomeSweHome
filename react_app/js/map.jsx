import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 31.9686, lng: -99.9018 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 31.9686, lng: -99.9018 }} />}
    </GoogleMap>
  )
}
))

export default Map;

window._Map = Map;
