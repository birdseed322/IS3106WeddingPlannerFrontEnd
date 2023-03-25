import { Button } from "primereact/button";
import React from "react";

function RequestFooter(props){
    function handleAccept(){
        console.log("Send POST req to backend api with status ACCEPT for ID:" + props.reqId);
    }

    function handleReject(){
        console.log("Send POST req to backend api with status REJECT for ID:" + props.reqId);
    }

    return (
        <div className="flex felx-wrap justify-content-end gap-3">
            <Button icon="pi pi-check" onClick={handleAccept} severity="success" className=""/>
            <Button icon="pi pi-times" onClick={handleReject} severity="danger" className=""/>
        </div>
    )
}

export default RequestFooter;