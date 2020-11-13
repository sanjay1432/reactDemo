import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Modal.css";
const Modal = ({ children, closeModal, modalState, title }) => {
  if (!modalState) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        {/* <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={closeModal} />
        </header> */}
        <section className="modal-card-body">
          <div className="content">{children}</div>
        </section>
        {/* <footer className="modal-card-foot">
          <a className="button" onClick={closeModal}>
            Cancel
          </a>
        </footer> */}
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  title: PropTypes.string,
};
export default Modal;
