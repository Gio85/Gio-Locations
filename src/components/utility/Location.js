import React from 'react';
import AutoComplete from './Autocomplete';

const Location = ({ index, handleLocationChange, getAutocompleteInfo, name, cost, address, location }) => {

  return (
    <div className="location-form">
      <label htmlFor="location">Location</label>
      <AutoComplete getAutocompleteInfo={getAutocompleteInfo} value={location} index={index} />
      <label htmlFor="location">Name</label>
      <input
        placeholder="Name"
        className="form-control"
        value={name}
        onChange={(e) => handleLocationChange(index, 'name', e.target.value)}
        name="name"
      />
      <label htmlFor="location">Address</label>
      <input
        placeholder="Address"
        className="form-control"
        value={address}
        onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
        name="cost"
      />
      <label htmlFor="location">Cost</label>
      <input
        placeholder="£"
        className="form-control"
        value={cost}
        onChange={(e) => handleLocationChange(index, 'cost', e.target.value)}
        name="cost"
      />
    </div>
  );
};

export default Location;
