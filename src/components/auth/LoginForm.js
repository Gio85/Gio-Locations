import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, credentials, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="center col-md-6">
        <div className="form-group">
          {error && <p className="has-error">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={credentials.email}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={credentials.password}
            className="form-control"
          />
        </div>
        <div className="form-btn">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>OR</p>
      </div>
    </form>
  );
};

export default LoginForm;
