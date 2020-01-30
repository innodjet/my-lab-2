import React from "react";
import PropTypes from "prop-types";

const Message = ({ message }) => {
  const display =
    message.type === 0 || message.type === 1
      ? { display: "block" }
      : { display: "none" };
  const className =
    message.type === 1 ? "alert alert-success" : "alert alert-danger";
  return (
    <div className="Message" style={display}>
      <div className="container">
        <div className={className} role="alert">
          <i className="fas fa-info-circle"></i> {message.desc}
        </div>
      </div>
    </div>
  );
};

Message.protoType = {
  message: PropTypes.string.isRequired
};

export default Message;
