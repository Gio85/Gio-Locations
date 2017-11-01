import React from 'react';
import DragDrop from '../utility/DragDrop';


const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={errors.username ? 'form-group has-error' : 'form-group'}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={user.username}
            className="form-control"
          />
          {errors.username && <small className="has-error">{errors.username}</small>}
        </div>
      </div>
      <div className={errors.homeLocation ? 'form-group has-error' : 'form-group'}>
        <div className="form-group">
          <input
            type="text"
            name="homeLocation"
            placeholder="Location"
            onChange={handleChange}
            value={user.homeLocation}
            className="form-control"
          />
          {errors.homeLocation && <small className="has-error">{errors.homeLocation}</small>}
        </div>
      </div>
      <div className={errors.image ? 'form-group has-error' : 'form-group'}>
        <label htmlFor="image">Image</label>
        <DragDrop
          onChange={handleChange}
          value={user.base64 || user.imageSRC}
        />
        {errors.image && <small className="has-error">{errors.image}</small>}
      </div>
      <div className={errors.email ? 'form-group has-error' : 'form-group'}>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
            className="form-control"
          />
          {errors.email && <small className="has-error">{errors.email}</small>}
        </div>
      </div>
      <div className={errors.password ? 'form-group has-error' : 'form-group'}>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
            className="form-control"
          />
          {errors.password && <small className="has-error">{errors.password}</small>}
        </div>
      </div>
      <div className={errors.passwordConfirmation ? 'form-group has-error' : 'form-group'}>
        <div className="form-group">
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={user.passwordConfirmation}
            className="form-control"
          />
          {errors.passwordConfirmation && <small className="has-error">{errors.passwordConfirmation}</small>}
        </div>
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default RegisterForm;
