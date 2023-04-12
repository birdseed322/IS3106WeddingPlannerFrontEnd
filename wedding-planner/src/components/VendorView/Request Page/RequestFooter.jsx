import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

function RequestFooter(props) {
  return (
    <div className="flex felx-wrap justify-content-start gap-3">
      <Button
        icon="pi pi-check"
        onClick={() => props.handleAccept(props.reqId)}
        severity="success"
        className=""
      />
      <Button
        icon="pi pi-times"
        onClick={() => props.handleReject(props.reqId)}
        severity="danger"
        className=""
      />
      <Link className="no-underline" to={"/requests/" + props.reqId}>
        <Button label="View" severity="secondary" />
      </Link>
    </div>
  );
}

export default RequestFooter;
