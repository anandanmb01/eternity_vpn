import React, { useContext } from "react";
import vpnLocation from "../db/vpnLocation.json";
import vpnHubs from "../db/vpnHubs.json";
import Card from "../components/card";
// import { useState } from "react";
// import axios from "axios";
import {useNavigate } from "react-router-dom";
import HubContext from "../context/HubContext";
import UsrContext from "../context/UsrContext";

function Dashboard(props) {

  const { user } = useContext(UsrContext);
  const navigate = useNavigate();
  const {
    hubSelection,
    setHubSelection,
    locSelection,
    setLocSelection,
    hubSelect,
    setHubSelect,
  } = useContext(HubContext);

  // console.log(user);  
  function connect_to_hub() {
    navigate(`/dashboard/${user.id}`);
  }

  function Hub(props) {
    return (
      <>
        <h3>Hubs</h3>

        <div className="dash-hub col-md-12 ">
          {props.vpnHubs.map((hub, h) => {
            return (
              <Card
                key={h}
                id={h}
                img={hub.img}
                name={hub.name}
                check={hubSelection}
                focous={(x) => {
                  setHubSelection(x);
                  setHubSelect(`${locSelection}__${hub.name}`);
                }}
              />
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>Eternity-VPN Dashboard</h1>
      <h3>Places</h3>
      <div className="dash-loc col-md-12">
        {vpnLocation.map((loc, l) => {
          return (
            <Card
              key={l}
              id={l}
              img={loc.img}
              name={loc.place}
              check={locSelection}
              focous={(x) => {
                setLocSelection(x);
              }}
            />
          );
        })}
      </div>

      {locSelection ? <Hub vpnHubs={vpnHubs[locSelection]} /> : <></>}

      <div className="hub-connect">
        {hubSelect ? (<button className="btn btn-outline-secondary" name={hubSelect} onClick={() => { connect_to_hub(hubSelect);}}>connect to hub{" "}<img src="/images/send_arrow.png" alt="" height="30px" /></button>) : (<></>)}
      </div>
      <div>
        <p className="card dashboard-note">
          Excepteur voluptate dolor ad proident aute exercitation. Occaecat
          dolor nostrud eu qui adipisicing magna voluptate est eiusmod ea mollit
          amet. Voluptate dolor in nulla dolor laborum ea pariatur ea et
          voluptate Lorem. Deserunt tempor elit eiusmod mollit et ad commodo
          dolor veniam nostrud sit laboris. Commodo id laborum sunt in excepteur
          esse ullamco Lorem culpa mollit sint sunt. Velit Lorem qui Lorem
          incididunt. Ut in tempor irure amet in voluptate exercitation duis
          nisi do consectetur incididunt.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
