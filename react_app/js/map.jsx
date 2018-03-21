import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const Map = withScriptjs(withGoogleMap((props) => {
  let defaultPosition = new google.maps.LatLng(30.2849, -97.7341);
  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={ props.position == null ? defaultPosition : props.position }
    >
      {props.isMarkerShown && <Marker position={ props.position } />}
    </GoogleMap>
  )
}
))

export default Map;

window._Map = Map;
