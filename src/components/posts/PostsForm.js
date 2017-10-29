import React from 'react';
import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';
import Location from '../utility/Location';

function PostsForm({ handleSubmit, handleChange, handleLocationChange, getAutocompleteInfo, data, addLocation, errors }) {
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton history={history} />
      </div>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className={errors.title ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="title"
            value={data.title}
            onChange={handleChange}
          />
          {errors.title && <small className="has-error">{errors.title}</small>}
        </div>
        <div className={errors.body ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="body">Description</label>
          <textarea
            type="textarea"
            className="form-control"
            id="body"
            name="body"
            placeholder="description"
            value={data.body}
            onChange={handleChange}
          ></textarea>
          {errors.body && <small className="has-error">{errors.body}</small>}
        </div>
        <div className={errors.date ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={data.date}
            onChange={handleChange}
          />
          {errors.date && <small
            className="has-error">{errors.date}</small>}
        </div>
        <div className={errors.image ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="image">Image</label>
          <DragDrop
            onChange={handleChange}
            value={data.base64 || data.imageSRC}
          />
          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            className="form-control"
            name="nameLocation"
            value={data.locations.nameLocation}
            placeholder="name location"
            onChange={handleChange}
          />
          {data.locations.map((location, i) =>
            <Location
              key={i}
              {...location}
              index={i}
              handleLocationChange={handleLocationChange}
              getAutocompleteInfo={getAutocompleteInfo}
            />)}
          <button type="button" onClick={addLocation}>+</button>
        </div>
        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PostsForm;
