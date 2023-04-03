import { Button } from "primereact/button";
import React from "react";

function RequestFooter(props){

    return (
        <div className="flex felx-wrap justify-content-end gap-3">
            <Button icon="pi pi-check" onClick={() => props.handleAccept(props.reqId)} severity="success" className=""/>
            <Button icon="pi pi-times" onClick={() => props.handleReject(props.reqId)} severity="danger" className=""/>
        </div>
    )
}

export default RequestFooter;