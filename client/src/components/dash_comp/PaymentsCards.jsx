import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState ,useContext} from 'react';
import AlertContext from '../../context/AlertContext';
import { useNavigate} from 'react-router-dom';
import HubContext from '../../context/HubContext';


function PaymentsCards(props) {
  const [loading, setLoading] = useState(false);
  const {setAlert} = useContext(AlertContext);
  const {hubSelect} = useContext(HubContext);

  ////////////////////////////

  function loadRazorpay() {
   

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      setAlert('Razorpay SDK failed to load. Are you online?');
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
        } = await axios.post(window.serverurl +'/payments/getRazorpayKey');

        const options = {
          key: razorpayKey,
          amount: props.data.amount,
          currency: currency,
          name: 'Eternity VPN',
          description: 'eternity vpn plan purchase powered by razopay',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(window.serverurl +'/payments/payOrder', {
              amount: amount,
              planId:props.data.planId,
              hub:hubSelect,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            setAlert(result.data.msg);
            props.setPaymentPlan(false);
            window.location.reload(false);


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
        setAlert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  ///////////////////////////


  // console.log(props.data)
  return (
    <Card className="my-4 mx-3 " style={{ width: '15rem' }}>
      <Card.Img className="m-1 mt-3 w-auto h-auto rounded mb-4" variant="top" src={props.data.photoUrl} />
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
            <Button disabled={loading} onClick={loadRazorpay} className="mb-2 mx-auto" size="sm" variant="outline-primary">{loading ? <div>Loading...</div> : <div>Buy now</div>}</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PaymentsCards;

