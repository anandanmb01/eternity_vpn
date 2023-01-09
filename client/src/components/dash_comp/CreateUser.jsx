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

function CreateUser(){
    const {setAlert} = useContext(AlertContext);
    const { user } = useContext(UsrContext);
    const {hubSelect,} = useContext(HubContext);
    const [pass,setPass]=useState("");
    const navigate = useNavigate();

     function userCreate(event) {
       event.preventDefault();
         axios({
          method: 'post',
          url: window.serverurl + "/api/vpn/createuser",
          timeout: 8000,
          data: {
            hub_id: hubSelect,
            password: pass
          }
        })
         .then((res) => {
          //  console.log(res.data);
           if (res.data.redirect) {
             navigate("/login");
           } else {
             if (res.data.error) {
               setAlert("user not created");
               navigate("/dashboard");
             } else {
               setAlert("user created");
               navigate("/dashboard/user");
             }
           }
         })
         .catch((e)=>{
          console.log(e);
         })
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
            <Button variant="outline-secondary" size="sm" onClick={userCreate}>
              create
            </Button>
          </Form>
        </div>
    );
}
export default CreateUser;