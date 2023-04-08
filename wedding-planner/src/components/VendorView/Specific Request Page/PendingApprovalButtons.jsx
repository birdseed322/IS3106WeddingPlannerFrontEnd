import { Button } from "primereact/button";
import React, { useState } from "react";

function PendingApprovalButtons(props) {

  return (
    <>
      <div className="grid">
        <Button icon="pi pi-check" label="Approve" severity="success" className="w-2 m-2" onClick={() => props.handleRequestResponse(true)}/> 
        <Button icon="pi pi-times" label="Reject" severity="danger" className="w-2 m-2" onClick={() => props.handleRequestResponse(false)}/>
      </div>
    </>
  );
}

export default PendingApprovalButtons;
