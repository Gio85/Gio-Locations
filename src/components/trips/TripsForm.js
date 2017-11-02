import React from 'react';

import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';


function TripsForm({ handleSubmit, handleChange, trip, errors, history }) {
  return (
    <div className="row">
      <div className="box col-md-12">
        <div className="tripForm col-md-12">
          <BackButton history={history} />
          <h1>Add your Trip</h1>
        </div>
        <form onSubmit={handleSubmit} className="col-md-12">
          <div className={errors.name ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="name">Location</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={trip.name}
              onChange={handleChange}
            />
            {errors.name && <small className="has-error">{errors.name}</small>}
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
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripsForm;
