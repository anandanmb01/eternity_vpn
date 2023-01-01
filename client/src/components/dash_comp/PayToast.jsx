
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Button } from 'react-bootstrap';
import PlaymentPlans from './PlaymentPlans';

function PayToast() {
  const [position, setPosition] = useState('top-start');
  const [paymentPlan, setPaymentPlan] = React.useState(false);
  if(!paymentPlan){
  return (
    <>
        <ToastContainer className="p-3 pt-4 mt-5 me-5" style={{width:"650px"}} position={`top-end`}>
          <Toast style={{width:"500px"}}>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Credit status</strong>
              <small>Free tier</small>
            </Toast.Header>
            <Toast.Body>
              <marquee width="95%" direction="left" height="30px">
              You are using the free tier version of eternity vpn valid for 10days purchase paid plans for premium experience
              </marquee>
              <div className="text-end">
              <Button size="sm" variant="light" onClick={() => setPaymentPlan(true)} >buy plans</Button>

              </div>
              
            </Toast.Body>
          </Toast>
        </ToastContainer>
    </>
  );
}
else{
  return(
  <PlaymentPlans
                show={paymentPlan}
                onHide={() => setPaymentPlan(false)}
              />);
}
}
export default PayToast;