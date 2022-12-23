import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PaymentsCards(props) {
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
            <li><h6>{`@ ${props.data.price}/month`}</h6></li>
        </ul>
        </Card.Text>
        <div className="row">
            <Button className="mb-2 mx-auto" variant="primary">Buy now</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PaymentsCards;