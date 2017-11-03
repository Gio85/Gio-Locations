import React from 'react';

const ConversationsForm = ({ handleChange, handleSubmit, message }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <form className="col-md-12" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="message"
              placeholder="type your message"
              onChange={handleChange}
              value={message}
              className="form-control"
              required="required"
            />
            <span className="input-group-btn">
              <button id="hidden" className="btn btn-primary">Send</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationsForm;
