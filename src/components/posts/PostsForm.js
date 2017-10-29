import React from 'react';

import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';
import Autocomplete from '../utility/Autocomplete';

function PostsForm({ handleSubmit, handleChange, post, errors, history, getAutocompleteInfo }) {
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
            value={post.title}
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
            value={post.body}
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
            value={post.date}
            onChange={handleChange}
          />
          {errors.date && <small
            className="has-error">{errors.date}</small>}
        </div>
        <div className={errors.image ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="image">Image</label>
          <DragDrop
            onChange={handleChange}
            value={post.base64 || post.imageSRC}
          />
          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <div className={errors.location ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={post.locations.name}
              onChange={handleChange}
            />
            {errors.location && <small className="has-error">{errors.location}</small>}
          </div>
          <div className={errors.location ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="name">Location</label>
            <Autocomplete
              value={post.locations.location}
              onChange={handleChange}
              getAutocompleteInfo={getAutocompleteInfo}
            />
            {errors.location && <small className="has-error">{errors.location}</small>}
          </div>
          <div className={errors.location ? 'form-group has-error' : 'form-group'}>
            <label htmlFor="cost">Cost</label>
            <input
              type="number"
              className="form-control"
              id="cost"
              name="cost"
              value={post.locations.cost}
              onChange={handleChange}
            />
            {errors.location && <small className="has-error">{errors.location}</small>}
          </div>
        </div>

        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PostsForm;
