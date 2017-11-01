/* global google */
import React from 'react';


class GoogleMap extends React.Component {
  componentDidMount() {


    this.bounds = new google.maps.LatLngBounds();

    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 6,
      center: this.props.center || { lat: 51.515276, lng: -0.072328}
    });


    this.props.post.locations.forEach((location) => {
      const latLng = { lat: location.location.lat, lng: location.location.lng };
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });

      this.bounds.extend(latLng);
    });

    this.map.fitBounds(this.bounds);
  }

  componentDidUpdate() {
    if(!this.props.post.locations.find(location => location === this.props.selectedLocation)) return false;
    this.map.setCenter(this.props.selectedLocation.location);
  }

  componentWillUnmount() {
    // all of this to clean the memory
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div
        className="google-map"
        ref={element => this.mapCanvas = element}
      ></div>
    );
  }
}

export default GoogleMap;
