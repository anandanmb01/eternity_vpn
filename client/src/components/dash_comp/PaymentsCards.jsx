import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState } from 'react';
import UsrContext from '../../context/UsrContext';
import AlertContext from '../../context/AlertContext';
import { useContext } from 'react';

function PaymentsCards(props) {
  const [loading, setLoading] = useState(false);
  // const [orderAmount, setOrderAmount] = useState(0);
  const [message,setMessage] = useState(null);
  const {showAlert,toggleShowAlert,setAlert,setShowAlert} = useContext(AlertContext);


  ////////////////////////////

  function loadRazorpay() {

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      setMessage('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(window.serverurl +'/payments/createOrder', {
          planId:props.data.planId,
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(window.serverurl +'/payments/getRazorpayKey');

        const options = {
          key: razorpayKey,
          amount: props.data.amount,
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(window.serverurl +'/payments/payOrder', {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            setMessage(result.data.msg);
            // fetchOrders();
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        setMessage(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  ///////////////////////////


  console.log(props.data)
  return (
    <Card className="my-4 mx-3 " style={{ width: '15rem' }}>
      {/* <Card.Img className="m-1 mt-3 w-auto h-auto" variant="top" src={props.data.photoUrl} /> */}
      <Card.Body>
        <Card.Title><h4>{props.data.name}</h4></Card.Title>
        <Card.Text>
        <ul className='m-1 mb-4'>
            <li><h6>Unlimited data</h6></li>
            <li><h6>{`${props.data.noOfHub} hub acess`}</h6></li>
            <li><h6>{`${props.data.noOfDays} days validity`}</h6></li>
            <li><h6>{`@ ${props.data.amount}/month`}</h6></li>
        </ul>
        </Card.Text>
        <div className="row">
            <Button disabled={loading} onClick={loadRazorpay} className="mb-2 mx-auto" variant="primary">{loading ? <div>Loading...</div> : <div>Buy now</div>}</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PaymentsCards;

