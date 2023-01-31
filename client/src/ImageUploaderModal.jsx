import React, { useState } from "react";
import ImageUploader from "react-images-upload";
// import Dropzone from "react-dropzone";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { useContext } from "react";
import UsrContext from "./context/UsrContext";
import AlertContext from "./context/AlertContext";

function ImageUploaderModal(props) {
  const {setAlert} = useContext(AlertContext);
  const { user } = useContext(UsrContext);
  const [state, setState] = React.useState(null);
  const [loading,setLoading]= useState(false);
  const [url,setUrl] = useState(null);


  const onDrop = (picture) => {
    if(picture.length > 0){
      const temp=picture[picture.length - 1];
      const temp0 = new File([temp],user.id+"."+temp.name.split(".")[temp.name.split(".").length -1]);
      setUrl(URL.createObjectURL(temp0));
      setState(temp0);
      
    }
  };
  // console.log(state);

  function upload() {
    setLoading(true);
    if (state) {
        const formData = new FormData();
        formData.append('image', state);
          axios.post(window.serverurl + "/api/avatarimage",formData,{ headers: { 'Content-Type': 'multipart/form-data' }})
          .then(response => {setAlert(response.data.message);
            setLoading(false);
            props.onHide();
            setTimeout(()=>{window.location.reload(false);},1000);
            

          })
          .catch(error => {console.log(error);
                          setAlert("Error");
                        setLoading(false)});
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Profile Photo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className={{
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          <h1> </h1>
          {state? (
            <div className="d-flex w-100 flex-row justify-content-center rounded ">
            <Card className="shadow-sm" style={{ width: "300px" }}>
              <Card.Img
                variant="top"
                src={url}
                style={{ width: "300px" }}
              />
              <Card.Body>
                <div className="d-flex justify-content-end">
                  <Button variant="outline-secondary" size="sm" onClick={upload}>
                    {loading?<><Spinner as="span"animation="grow"size="sm"role="status"aria-hidden="true"/>&nbsp;Loading...&nbsp;</>:`upload `}
                  </Button>
                </div>
              </Card.Body>
            </Card>
            </div>
          ) : (
            <></>
          )}
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" size="sm" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageUploaderModal;