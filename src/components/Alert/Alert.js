import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Alert.css";
const Alert = ({ children, closeAlert, alertState, title, alertClass }) => {
  console.log(alertState);
  if (!alertState) {
    return null;
  }

  return (
    <div className={`notification ${alertClass}`}>
      <button className="delete" onClick={closeAlert}></button>
      <strong>{title}</strong>
    </div>
  );
};

Alert.propTypes = {
  closeAlert: PropTypes.func.isRequired,
  alertState: PropTypes.bool.isRequired,
  title: PropTypes.string,
  alertClass: PropTypes.string,
};
export default Alert;
