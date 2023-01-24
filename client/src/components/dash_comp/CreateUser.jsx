import React from "react";
import axios from "axios";
import { useState } from "react";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import UsrContext from "../../context/UsrContext";
import HubContext from "../../context/HubContext";
import AlertContext from "../../context/AlertContext";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

function CreateUser(){
    const {setAlert} = useContext(AlertContext);
    const { user } = useContext(UsrContext);
    const {hubSelect,} = useContext(HubContext);
    const [pass,setPass]=useState("");
    const navigate = useNavigate();
    const [message,setMessage] = useState("");
    const [loading,setLoadig]=useState(false);


     function userCreate(event) {
      if(pass.length < 6){
        setMessage("password length must be > 5");
      }else{
        setMessage("");
        setLoadig(true);
        event.preventDefault();
        axios({
          method: "post",
          url: window.serverurl + "/api/vpn/createuser",
          data: {
            hub_id: hubSelect,
            password: pass,
          },
        })
          .then((res) => {
            //  console.log(res.data);
            if (res.data.redirect) {
              navigate("/login");
            } else {
              if (res.data.error) {
                setAlert("user not created");
              } else {
                setAlert("user created");
                 window.location.reload(false);
                //  navigate("/dashboard/user");
 
              }
            }
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(()=>{
           setLoadig(false);
          })
      }

     }
    
      
    return (
        <div className="card card-style-usr-create">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>username</Form.Label>
              <Form.Control placeholder={user.username} disabled />
              <Form.Text className="text-muted">
                username is set by default
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(event)=>{setPass(event.target.value)}} value={pass} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <div className="d-flex flex-row justify-content-between">
            <Button variant="outline-secondary" size="sm" onClick={userCreate}>
              {loading?<><Spinner as="span" animation="grow" size="sm" role="status"aria-hidden="true"/>&nbsp;Loading...&nbsp;</>:`create`}
            </Button>
            <p className="mb-0 me-3 text-danger">{`${message}`}</p>
            </div>

          </Form>
        </div>
    );
}
export default CreateUser;