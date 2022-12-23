import React from "react";
import Popover from 'react-bootstrap/Popover';
import UsrContext from "../../context/UsrContext";
import { useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';


  const alertClicked = () => {
    alert('clicked');
  };


function AvatarDropDown(props){
    const { user } = useContext(UsrContext);
    return(
    <Popover id="" {...props}>
        <Popover.Header as="h3"><div className="text-center">{user.name}</div></Popover.Header>
            <Popover.Body>
                <ListGroup >
                <ListGroup.Item action onClick={alertClicked}>
                        User settings
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        Payment settings
                    </ListGroup.Item>
                </ListGroup>

            </Popover.Body>
            
    </Popover>
    )
}


export  default AvatarDropDown;
