import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
var auth = require('../../auth.json');

export class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map
        initialCenter={ this.props.initialCenter }
        google={ this.props.google }
        zoom={ this.props.zoom }
        >
        <Marker position={ this.props.marker } />
      </Map>
    )
  }
};

window._GoogleMap = GoogleMap

export default GoogleApiWrapper({
  apiKey: auth["maps"]["key"],
  libraries: ['places']
}) (GoogleMap)
