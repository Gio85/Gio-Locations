/* global google */
import React from 'react';

class Autocomplete extends React.Component {
  componentDidMount() {
    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      // getAutocompleteInfo is a method that we pass in as props
      this.props.getAutocompleteInfo(place);
    });

  }

  render() {
    return (
      <input
        ref={element => this.autocompleteInput = element}
      />
    );
  }
}

export default Autocomplete;
