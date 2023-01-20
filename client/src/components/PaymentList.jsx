import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import moment from "moment/moment";


function PaymentList(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Payment history
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>no</th>
          <th>payment Id</th>
          <th>Plan Id</th>
          <th>Date</th>
          <th>Is paid</th>
        </tr>
      </thead>
      <tbody>
      {
        props.data.map((d,index)=>{
          return(
            <tr key={index}>
          <td>{index+1}</td>
          <td>{d.razorpay.paymentId}</td>
          <td>{d.planId}</td>
          <td>{moment(d.date).toDate().toString()}</td>
          <td>{d.isPaid.toString()}</td>
        </tr>
          )
        })
      }

      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


export default PaymentList;