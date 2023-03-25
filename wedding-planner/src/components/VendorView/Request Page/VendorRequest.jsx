import React from "react";
import { Card } from "primereact/card";
import RequestFooter from "./RequestFooter";

function VendorRequest() {
  const pendingRequests = [
    {
      requestId: 19,
      isAccepted: false,
      quotationURL: "www.someurl.com",
      quotedPrice: null,
      requestDate: new Date("2/3/23"),
      requestDetails: "Lorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuff",
    },
    {
      requestId: 20,
      isAccepted: false,
      quotationURL: "www.someotherurl.com",
      quotedPrice: null,
      requestDate: new Date("2/3/23"),
      requestDetails: "Lorem ipsum and some other stuff",
    },{
        requestId: 21,
        isAccepted: false,
        quotationURL: "www.someurl.com",
        quotedPrice: null,
        requestDate: new Date("2/3/23"),
        requestDetails: "Lorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuff",
      },
      {
        requestId: 22,
        isAccepted: false,
        quotationURL: "www.someotherurl.com",
        quotedPrice: null,
        requestDate: new Date("2/3/23"),
        requestDetails: "Lorem ipsum and some other stuff",
      }
  ];

  return (
    <div>
      <div className="w-8 mx-auto">
        {pendingRequests.length > 0 ? (
          <h1>Pending Requests</h1>
        ) : null}
        {pendingRequests.map((request) => (
          <Card title={request.requestId} className="w-full my-4" footer={<RequestFooter reqId={request.requestId} />}>
            {request.requestDetails}
            <p>Created On: {request.requestDate.toDateString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VendorRequest;
