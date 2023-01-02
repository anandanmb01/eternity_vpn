import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import AlertContext from "../context/AlertContext";

import { useContext } from 'react';


function Alert(props) {

  const {showAlert,toggleShowAlert,alertMessage} = useContext(AlertContext);

  const position = "bottom-end";

  return (
    <>
      <ToastContainer position={position} className="p-3 ">
      <Toast show={showAlert} onClose={toggleShowAlert}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Eternity-vpn</strong>
          <small>notification</small>
        </Toast.Header>
        <Toast.Body>{`${alertMessage}`}</Toast.Body>
      </Toast>     
      </ToastContainer>
    </>

  );
}

export default Alert;