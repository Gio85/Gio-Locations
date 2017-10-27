/* global google */

import React from 'react';
import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {
  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 14,
      center: this.props.center || { lat: 51.515276, lng: -0.072328},
      styles: mapStyles
    });
    this.marker = new google.maps.Marker({
      position: this.props.center || { lat: 51.515276, lng: -0.072328},
      map: this.map
    });
  }

  componentWillUnmount() {
    // all of this to clean the memory
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element }></div>
    );
  }
}

export default GoogleMap;
