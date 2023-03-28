import React, { useState, useEffect, useRef } from 'react';
export default function Email(props) {
    //credits to stripo for image
    return (
        
        <div id = "email" style={{justifyContent: "center", alignItems : "center", margin : "auto", textAlign: "center", fontFamily: "Garamond, serif", maxWidth: "60%"}}>
            <img src ="https://mrhliu.stripocdn.email/content/guids/CABINET_248d9830df6756962072d95163984b52/images/pngegg_12_1_2n2.png"></img>
            <h1>Wedding Invitation</h1>
            <h2> {props.bride} and {props.groom} </h2>
            <h2> Venue : {props.venue} </h2>
            <h2> Date : {props.date} </h2>
            <h2> RSVP: {props.rsvp} </h2>
        </div>
        );
    
}


