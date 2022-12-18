import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import "../components/app.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";




function handleGoogle(){
    window.open(window.serverurl+"/auth/google","_self");
}

function handleGitHub(){
    window.open(window.serverurl+"/auth/github","_self");
}
function handleFacebook(){
    window.open(window.serverurl+"/auth/facebook","_self");
}

function SignUpModal(props) {
  const navigate =useNavigate();

        const [signUp,setSignUp]=useState({
            firstName:"",
            lastName:"",
            email:"",
            password:"",

        });
        console.log(signUp)
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
                <FloatingLabel controlId="reEnterPassword" label="Re-enter password" className="mb-3"> <Form.Control onChange={e=>{setSignUp((x)=>{return({...x,["password"]:e.target.value,})})}} type="password" placeholder="Password" /> </FloatingLabel>

            </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button onClick={props.onHide}>Close</Button> */}
              <Button onClick={()=>{
                axios
                    .post(window.serverurl + "/auth/register",{
                      name:signUp.firstName +"_"+ signUp.lastName,
                      email:signUp.email,
                      photo:"images/login.png",
                      password:signUp.password,
                      }).then((resp)=>{
                        alert(resp.data.result);
                        navigate(resp.data.redirect);
                        console.log(resp.data)
                        });
              }} variant="outline-primary" >Sign up</Button>
            </Modal.Footer>
          </Modal>
        );
      }


function Login(){

    const [modalShow, setModalShow] = React.useState(false);
    const navigate =useNavigate();

    function Inp() {

const [login,setLogin] = React.useState({
    username:"",
    password:"",
  });
  console.log(login); 
  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          value={login.username}
          onChange={(e) => {
            setLogin((x) => {
              return { ...x, ["username"]: e.target.value };
            });
          }}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          value={login.password}
          onChange={(e) => {
            setLogin((x) => {
              return { ...x, ["password"]: e.target.value };
            });
          }}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div className="local-dignup-btn-gp">
        <button
          onClick={(e) => {
            e.preventDefault();
            axios
              .post(window.serverurl + "/auth/login",{...login,["username"]:(login.username.split("@")[0]+"_eternity")})
              .then((r)=>{console.log(r)});
          }}
          className="btn btn-outline-primary"
        >
          Login
        </button>
        <span onClick={() => setModalShow(true)}>Signup</span>
      </div>
    </>
  );
}

    return(
        <div className="login">
            <div className=" login-content shadow">
                <div className="social-login">
                    <GoogleLoginButton onClick={handleGoogle}><span>Google</span></GoogleLoginButton>
                    <FacebookLoginButton onClick={handleFacebook}><span>Facebook</span></FacebookLoginButton>
                    <GithubLoginButton onClick={handleGitHub}><span>GitHub</span></GithubLoginButton>
                    
                </div>
                <div className="login-seperator">
                    <div className="login-seperator-or-line shadow"></div>
                    <div className="login-seperator-or shadow">
                        <span>OR</span>
                    </div>
                </div>
                <div className="local-login">
                    <form className="local-login-form">
                        <h5><img src="/images/infinity.png" alt="" height="35px"></img>Local login</h5>
                        <Inp/>  
                        <SignUpModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;