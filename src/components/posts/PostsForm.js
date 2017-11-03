import React from 'react';
import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';
import Location from '../utility/Location';

function PostsForm({ handleSubmit, handleChange, handleLocationChange, getAutocompleteInfo, data, addLocation, errors, history }) {
  return (
    <div className="row">
      <div className="box col-md-12">
        <div className="tripForm-header">
          <BackButton history={history} />
          <h1>New post</h1>
        </div>
        <form onSubmit={handleSubmit} className="tripForm">
          <div className="center col-md-8">
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <DragDrop
                onChange={handleChange}
                value={data.base64 || data.imageSRC}
              />
              {errors.image && <small className="has-error">{errors.image}</small>}
            </div>
            <div className="form-group">
              {data.locations.map((location, i) =>
                <Location
                  key={i}
                  {...location}
                  index={i}
                  handleLocationChange={handleLocationChange}
                  getAutocompleteInfo={getAutocompleteInfo}
                />)}
              <div className="more-locations">
                <button type="button" onClick={addLocation} className="btn btn-info">Add more locations</button>
              </div>
            </div>
            <div className="form-btn">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostsForm;
