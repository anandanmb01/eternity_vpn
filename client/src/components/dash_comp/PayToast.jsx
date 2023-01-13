
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Button } from 'react-bootstrap';
import PlaymentPlans from './PlaymentPlans';

function PayToast(props) {
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
              <small>{props.status}</small>
            </Toast.Header>
            <Toast.Body>    
              <marquee width="95%" direction="left" height="30px">
              {props.message}
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
                setPaymentPlan={setPaymentPlan}

              />);
}
}
export default PayToast;