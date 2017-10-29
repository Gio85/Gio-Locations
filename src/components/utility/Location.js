import React from 'react';
import AutoComplete from './Autocomplete';

const Location = ({ index, handleLocationChange, handleAutocomplete, name, cost, address, location }) => {

  return (
    <div>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => handleLocationChange(index, 'name', e.target.value)}
        name="name"
      />
      <input
        placeholder="cost"
        value={cost}
        onChange={(e) => handleLocationChange(index, 'cost', e.target.value)}
        name="cost"
      />
      <input
        placeholder="address"
        value={address}
        onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
        name="cost"
      />
      <AutoComplete handleAutocomplete={handleAutocomplete} value={location} index={index} />
    </div>
  );
};

export default Location;
