/* eslint-disable */
import React from "react";
import "../components/app.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/app.css";
import InputGroup from "react-bootstrap/InputGroup";
import AlertContext from "../context/AlertContext";

const timermax = 300; //sec

function ChangePass(props) {


  const { setAlert } = useContext(AlertContext);
  let otp = "";
  const [counterDisp, setCounterDisp] = useState(true);
  const [timer, setTimer] = useState(false);
  const [emailTrack, setEmailTrack] = useState(null);
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });

  const [signUpMessage, setSignUpMessage] = useState("");
  const [rp, srp] = useState("");


  let changepskenable=false;
  if (props.changepsk==null){
    changepskenable=false
  }else{
    changepskenable=true;
  }
  const [signUpEnable, setSignUpEnable] = useState(changepskenable);


  function handleChangePsk(){

    if (signUp.password.length < 8) {
      setSignUpMessage("password length less than 8");
    } else {
      if (signUp.password == rp) {
        axios
          .post(window.serverurl+"/auth/changePassword", {
            password: signUp.password,
          })
          .then((resp) => {
            setAlert(resp.data.status);
            srp("");
            setSignUpMessage("");
            props.onHide();
          })
          .finally(()=>{srp("")});
        
      }else{
        setSignUpMessage("password mismatch");
        setSignUpMessage("");s
        srp("");
      }
    }

  }

  function handleSignUp() {
    if (signUp.email == "" || signUp.password == "") {
      setSignUpMessage("Please fill all fields");
    } else {
      if (!(signUp.email.includes("@") && signUp.email.includes("."))) {
        setSignUpMessage("Invalid email");
      } else {
        if (signUp.password.length < 8) {
          setSignUpMessage("password length less than 8");
        } else {
          if (signUp.password == rp) {
            axios
              .post(window.serverurl + "/auth/resetpassword", {
                email: signUp.email,
                password: signUp.password,
              })
              .then((resp) => {
                setAlert(resp.data.status);
                // navigate("/login");
                // console.log(resp.data)
              });
          } else {
            setSignUpMessage("password mismatch");
          }
        }
      }
    }
  }

  function EmailBoxStatus() {
    const [counter, setCounter] = React.useState(timermax);

    function handleEmailVerify() {
      // console.log("send");
      if (signUp.email === "") {
        setSignUpMessage("Enter email address");
      } else {
        axios
          .post(window.serverurl + "/auth/checkmail", { email: signUp.email })
          .then((d) => {
            if (d.data.count > 0) {
              setSignUpMessage("Email found on DB");
              setSignUpMessage("otp hasbeen send to your mail address");
              axios
                .post(window.serverurl + "/auth/verifyemail", {
                  email: signUp.email,
                })
                .then((resp) => {
                  if (resp.data.status == "ok") {
                    setTimer(true);
                  } else {
                    setTimer(false);
                    setSignUpMessage("Error occured");
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              setSignUpMessage("please signup");
            }
          })
          .catch((e) => {
            setSignUpMessage("error");
            console.log(e);
          });
      }
    }

    function handleOtpClick() {
      // console.log(otp);
      if (otp === "") {
        setTimer(true);
        setSignUpMessage("Enter otp");
      } else {
        setCounterDisp(false);
        axios
          .post(window.serverurl + "/auth/verifyotp", {
            email: signUp.email,
            otp: otp,
          })
          .then((res) => {
            // console.log(res);
            setCounterDisp(true);
            if (res.data.status === "ok") {
              setEmailTrack(signUp.email);
              setSignUpEnable(true);
              setCounter(timermax);
              setTimer(false);
              setSignUpMessage("");
            } else {
              setSignUpMessage(res.data.status);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    const style = {
      height: "58px",
      width: "150px",
      display: "flex",
      flexDirection: "row",
      marginBottom: "14px",
      borderWidth: "1px",
      borderLeft: "0",
      borderStyle: "solid",
      borderColor: "rgb(206,212,218)",
      borderRadius: "0px 7px 7px 0px ",
      alignItems: "centre",
    };
    const style_ = {
      height: "50px",
      marginTop: "9px",
      marginRight: "15px",
    };

    if (counter === 0) {
      setTimer(false);
      setEmailTrack(null); //if not verified
      setCounter(timermax);
      setCounterDisp(true);
    }

    React.useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    if (signUp.email === "") {
      return <></>;
    } else {
      if (signUp.email === emailTrack) {
        return (
          <Button
            className="mb-3"
            size="sm"
            variant="outline-success"
            id="button-addon1"
            disabled
          >
            verified
          </Button>
        );
      } else {
        if (timer === true) {
          return (
            <div style={style}>
              <div style={style_}>
                <InputGroup className="">
                  <InputGroup.Text
                    onClick={handleOtpClick}
                    id="inputGroup-sizing-sm"
                  >
                    OTP
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(x) => {
                      otp = x.target.value;
                    }}
                    placeholder={
                      counterDisp
                        ? `${Math.floor(counter / 60)} : ${
                            counter - Math.floor(counter / 60) * 60
                          }`
                        : `Loading..`
                    }
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
                {/* <Button style={{marginLeft:"70px",marginTop:"3px"}} onClick={handleEmailVerify} className="mb-3" size="sm"  variant="outline-danger" id="button-addon1"> verify </Button> */}
              </div>
            </div>
          );
        } else {
          return (
            <Button
              onClick={handleEmailVerify}
              className="mb-3"
              size="sm"
              variant="outline-danger"
              id="button-addon1"
            >
              {" "}
              verify{" "}
            </Button>
          );
        }
      }
    }
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
          <img
            src="/images/infinity.png"
            style={{ margin: "0 25px 0 0" }}
            alt=""
            height="45px"
          ></img>
          {changepskenable?"Change password": "Forgot password"}
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="signup-form">
          <div className=" d-flex mb-3 mt-2 ">
            {changepskenable?<></>:<h4 className="text-center fs-5">Verify your email</h4>}
          </div>
          {changepskenable?<></>:
          <InputGroup>
            <FloatingLabel
              controlId="email"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                style={{ borderRight: "0px" }}
                onChange={(e) => {
                  setSignUp((x) => {
                    return { ...x, ["email"]: e.target.value };
                  });
                }}
                type="email"
                placeholder="name@example.com"
              />
            </FloatingLabel>
            <EmailBoxStatus />
          </InputGroup>}
          <FloatingLabel controlId="password" label="Password" className="mb-3">
            {" "}
            <Form.Control
              onChange={(e) => {
                setSignUp((x) => {
                  return { ...x, ["password"]: e.target.value };
                });
              }}
              size="sm"
              type="password"
              placeholder="Password"
            />{" "}
          </FloatingLabel>
          <FloatingLabel
            controlId="reEnterPassword"
            label="Re-enter password"
            className="mb-3"
          >
            {" "}
            <Form.Control
              onChange={(e) => {
                srp(e.target.value);
              }}
              type="password"
              placeholder="Password"
              value={rp}
            />{" "}
          </FloatingLabel>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {signUpMessage !== "" && (
          <div className="login-message sign-up-footer">{signUpMessage}</div>
        )}
        {signUpEnable ? (
          <Button size="sm" onClick={()=>{changepskenable?handleChangePsk():handleSignUp()}} variant="outline-primary">
            reset password
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleSignUp}
            variant="outline-primary"
            disabled
          >
            reset password
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePass;
