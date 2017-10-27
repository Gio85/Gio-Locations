import React from 'react';

import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';
import Autocomplete from '../utility/Autocomplete';

function TripsForm({ handleSubmit, handleChange, trip, errors, history, getAutocompleteInfo }) {
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton history={history} />
      </div>
      <form onSubmit={handleSubmit} className="col-md-6">
        <Autocomplete getAutocompleteInfo={getAutocompleteInfo}/>
        <div className={errors.title ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="name">Location</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={trip.name}
            onChange={handleChange}
          />
          {errors.title && <small className="has-error">{errors.title}</small>}
        </div>
        <div className={errors.title ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={trip.description}
            onChange={handleChange}
          />
          {errors.title && <small className="has-error">{errors.title}</small>}
        </div>
        <div className={errors.image ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="image">Image</label>
          <DragDrop
            onChange={handleChange}
            value={trip.base64 || trip.imageSRC}
          />
          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>

        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default TripsForm;
