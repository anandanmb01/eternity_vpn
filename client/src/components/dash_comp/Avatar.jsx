import React from "react";
import Popover from "react-bootstrap/Popover";
import UsrContext from "../../context/UsrContext";
import { useContext,useNavigate } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import PaymentList from "../PaymentList";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ChangePass from "../ChangePass";
import { useState } from "react";
import ImageUploaderModal from "../../ImageUploaderModal";
import PayToastEnableContext from "../../context/PayToastEnableContext";


function Avatar() {
  let {PayToastEnable_,setPayToastEnable_}  = useContext(PayToastEnableContext);
  const [modalPayListShow, setModalPayListShow] = React.useState(false);
  const [modalPicShow, setModalPicShow] = React.useState(false);

  const [changePsk, setChangePsk] = React.useState(false);
  const [data,setData] = useState([]);


//   const navigate =useNavigate();
  const { user, setUser } = useContext(UsrContext);


function  handleChangePsk(){
  setChangePsk(!changePsk);
}

function handlePayList(){

    axios
    .post(window.serverurl + "/payments/listOrders", {
      id: user.id,
    })
    .then((d) => {
      d = Object.values(d.data);
      setData(d);
      setModalPayListShow(true);
      // console.log(d);
    });

}

function handlePicUpload(){
  setModalPicShow(!modalPicShow);
}

  function handleLogout(event){
    event.preventDefault();
    axios.post(window.serverurl+"/auth/logout", { withCredentials: true })
    .then((res) => {
      if(res.data.status){
        setUser(null);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      
    }); 

    window.location.reload(false);

  }

  return (
    <div className="avatar">
      <span>{user.name}</span>
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        overlay={
          
            <Popover id="Popover">
              <Popover.Header as="h3">
                <div className="text-center">{"profile settings"}</div>
              </Popover.Header>
              <Popover.Body>
                <ListGroup>
                  <ListGroup.Item action onClick={handlePayList}>
                    Payment history
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={handleChangePsk}>
                    change password
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={handlePicUpload}>
                    change avatar
                  </ListGroup.Item>
                </ListGroup>
              </Popover.Body>
            </Popover>

          
        }
      >
        <img
          src={user.photo ? user.photo : "images/login.png"}
          alt=""
          width="35px"
          height="35px"
          onClick={()=>{
            setPayToastEnable_(!PayToastEnable_);
          }}
        />
      </OverlayTrigger>
      <span id="logout" onClick={handleLogout}>
        Logout
      </span>
      <PaymentList
              show={modalPayListShow}
              onHide={()=>{setModalPayListShow(false);}}
              data={data}
            /> 
      <ChangePass
          show={changePsk}
          onHide={() => {setChangePsk(false);
          }}
          changepsk={{}}
      />
      <ImageUploaderModal
                  show={modalPicShow}
          onHide={() => {setModalPicShow(false);
          }}
      />
    </div>
  );
}


export default Avatar;
