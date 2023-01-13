import React from "react";
import Modal from 'react-bootstrap/Modal';
import PaymentsCards from "./PaymentsCards";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


function PlaymentPlans(props){

  const [paymentsPlans,setPaymentsPlans] =useState([]);

  useEffect(()=>{
    axios.post(window.serverurl + "/payments/plans")
    .then((res)=>{
      setPaymentsPlans(res.data);
    }
    )
  },[]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Premium Plans
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="container horizontal-scrollable">
                <div className="row">
                {paymentsPlans.map((x)=>{return(<PaymentsCards data={x} setPaymentPlan={props.setPaymentPlan}/>)})}
                </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <h6>Secured payments by Razopay</h6>
      </Modal.Footer>
    </Modal>
  );
}

export default PlaymentPlans