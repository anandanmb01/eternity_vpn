/* eslint-disable */
import React from "react";
import "../components/app.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/app.css";



function SignUpModal(props) {
    const navigate =useNavigate();
  
          const [signUp,setSignUp]=useState({
              'firstName':"",
              'lastName':"",
              'email':"",
              'password':"",
  
          });
          // console.log(signUp)
          const [signUpMessage,setSignUpMessage] = useState("");
          const [rp,srp]=useState("");
          // console.log(rp)


          function handleSignUp(){


            if((signUp.firstName=="") || (signUp.lastName=="") || (signUp.email=="") || (signUp.password=="")){
              setSignUpMessage("Please fill all fields")
            }else{
              if(!((signUp.email.includes('@')) && (signUp.email.includes('.')))){
                setSignUpMessage("Invalid email")
              }else{
              if(signUp.password.length<8){
                  setSignUpMessage("password length less than 8")
                }else{
                if(signUp.password==rp){
                  axios
                    .post(window.serverurl + "/auth/register",{
                      name:signUp.firstName +"_"+ signUp.lastName,
                      email:signUp.email,
                      photo:"images/login.png",
                      password:signUp.password,
                      }).then((resp)=>{
                        alert(resp.data.result);
                        navigate(resp.data.redirect);
                        // console.log(resp.data)
                        });
                }else{
                  setSignUpMessage("password mismatch")
                }}}}                
          }


          return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <img src="/images/infinity.png" style={{margin:"0 25px 0 0"}} alt="" height="45px"></img>Sign UP
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="signup-form">
                <div className="mb-3 mt-2">
                <h4 className="text-center">Please fill up your details</h4>
                </div>
  
                      <div className="row">
                          <div className="col">
                              <FloatingLabel controlId="firstName" label="First Name" className="mb-3"> <Form.Control onChange={e=>{setSignUp((x)=>{return({...x,["firstName"]:e.target.value,})})}} type="text" placeholder="First Name" /> </FloatingLabel>
                          </div>
                          <div className="col">
                              <FloatingLabel controlId="lastName" label="Last Name" className="mb-3"> <Form.Control onChange={e=>{setSignUp((x)=>{return({...x,["lastName"]:e.target.value,})})}} type="text" placeholder="Last Name" /> </FloatingLabel>
                          </div>
                      </div>
                  <FloatingLabel controlId="email" label="Email address" className="mb-3"> <Form.Control onChange={e=>{setSignUp((x)=>{return({...x,["email"]:e.target.value,})})}} type="email" placeholder="name@example.com" /> </FloatingLabel>
                  <FloatingLabel controlId="password" label="Password" className="mb-3"> <Form.Control onChange={e=>{setSignUp((x)=>{return({...x,["password"]:e.target.value,})})}} size="sm" type="password" placeholder="Password" /> </FloatingLabel>
                  <FloatingLabel controlId="reEnterPassword" label="Re-enter password" className="mb-3"> <Form.Control onChange={e=>{srp(e.target.value)}} type="password" placeholder="Password" /> </FloatingLabel>
  
              </div>
              </Modal.Body>
              <Modal.Footer>

              { signUpMessage !=="" && <div className="login-message sign-up-footer">{signUpMessage}</div> }
              <Button size="sm" onClick={handleSignUp} variant="outline-primary" >Sign up</Button>
              
              </Modal.Footer>
            </Modal>
          );
        }

export default SignUpModal;