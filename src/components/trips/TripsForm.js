import React from 'react';

import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';


function TripsForm({ handleSubmit, handleChange, trip, errors, history }) {
  return (
    <div className="row">
      <div className="box col-md-12">
        <div className="tripForm-header">
          <BackButton history={history} />
          <h1>Add your Trip</h1>
        </div>
        <form onSubmit={handleSubmit} className="tripForm">
          <div className="center col-md-8">
            <div className={errors.name ? 'has-error' : 'form-group'}>
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
            <div className={errors.description ? 'form-group has-error' : 'form-group'}>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={trip.description}
                onChange={handleChange}
              />
              {errors.description && <small className="has-error">{errors.description}</small>}
            </div>
            <div className={errors.image ? 'form-group has-error' : 'form-group'}>
              <label className="labelImg" htmlFor="image">Image</label>
              <DragDrop
                onChange={handleChange}
                value={trip.base64 || trip.imageSRC}
              />
              {errors.image && <small className="has-error">{errors.image}</small>}
            </div>
            <div className="form-btn">
              <button className="btn btn-primary btn-sm">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripsForm;
