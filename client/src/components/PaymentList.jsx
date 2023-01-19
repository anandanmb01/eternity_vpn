import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import moment from "moment/moment";
import { useEffect } from "react";
import UsrContext from "../context/UsrContext";
import { useContext } from "react";


function PaymentList(props) {
  const [data,setData] = useState([]);
  const { user, setUser } = useContext(UsrContext);

  useEffect(()=>{
    axios
    .post(window.serverurl + "/payments/listOrders", {
      id: user.id,
    })
    .then((d) => {
      d = Object.values(d.data);
      setData(d);
      console.log(d);
    });
    
  },[])

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
        data.map((d,index)=>{
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