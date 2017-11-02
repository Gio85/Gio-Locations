import React from 'react';

const ConversationsForm = ({ handleChange, handleSubmit, message }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <form className="col-md-12" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="message"
              placeholder="type your message"
              onChange={handleChange}
              value={message}
              className="form-control"
            />
            <button id="hidden" className="btn btn-primary col-md-2">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationsForm;
