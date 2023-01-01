import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Alert(props) {
  const position = "bottom-end";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="bg-dark position-relative"
      style={{ minHeight: '240px' }}
    >
      <ToastContainer position={position} className="p-3">
        <Toast>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Eternity-vpn</strong>
            <small className="text-muted">alert</small>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Alert;