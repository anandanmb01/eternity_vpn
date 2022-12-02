import React from "react";
import { useState } from "react";
import { useEffect } from "react";


function Card(props){

    const [cardStyle,setCardStyle]=useState({borderColor:null});

    useEffect(()=>{
        if(props.check===props.name){
            setCardStyle({borderColor:"crimson"})
        }else{
            setCardStyle({borderColor:null})
        }

    },[props.check])
    
    function handleClick(){
        props.focous(props.name);
    }

    return(
        <div className="card card-style" style={cardStyle} onClick={handleClick}>
            <img src={props.img} alt="" height="50px"/>
            <p className="card-title">{props.name}</p>
        </div>
    )
}

export default Card;