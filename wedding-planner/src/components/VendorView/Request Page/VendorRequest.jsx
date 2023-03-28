import React from "react";
import { Card } from "primereact/card";
import RequestFooter from "./RequestFooter";
import VendorNavbar from "../VendorNavbar/VendorNavbar";

function VendorRequest() {
  //Implement use effect to make call to api to retrieve vendor requests. Use the id from the session storage to maintain state
  const [vendorRequests, setVendorRequests] = React.useState([]);

  React.useEffect(() => {
    //Pull vendorId from the sessionStorage
    const vendorId = 3;
    const apiUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      vendorId;
    fetch(apiUrl).then((res) => {
      res.json().then(
        (data) => setVendorRequests(data))
    });
  }, []);
  // const pendingRequests = [
  //   {
  //     requestId: 19,
  //     isAccepted: false,
  //     quotationURL: "www.someurl.com",
  //     quotedPrice: null,
  //     requestDate: new Date("2/3/23"),
  //     requestDetails:
  //       "Lorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuff",
  //   },
  //   {
  //     requestId: 20,
  //     isAccepted: false,
  //     quotationURL: "www.someotherurl.com",
  //     quotedPrice: null,
  //     requestDate: new Date("2/3/23"),
  //     requestDetails: "Lorem ipsum and some other stuff",
  //   },
  //   {
  //     requestId: 21,
  //     isAccepted: false,
  //     quotationURL: "www.someurl.com",
  //     quotedPrice: null,
  //     requestDate: new Date("2/3/23"),
  //     requestDetails:
  //       "Lorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuffLorem ipsum and some stuff",
  //   },
  //   {
  //     requestId: 22,
  //     isAccepted: false,
  //     quotationURL: "www.someotherurl.com",
  //     quotedPrice: null,
  //     requestDate: new Date("2/3/23"),
  //     requestDetails: "Lorem ipsum and some other stuff",
  //   },
  // ];

  return (
    <div>
      <VendorNavbar />
      <div className="w-8 mx-auto">
        {vendorRequests.length > 0 ? <h1>Pending Requests</h1> : null}
        {vendorRequests.map((request) => (
          <Card
            title={request.requestId}
            className="w-full my-4"
            footer={<RequestFooter reqId={request.requestId} />}
          >
            {request.requestDetails}
            <p>Created On: {new Date(request.requestDate.replace('[UTC]', '')).toDateString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VendorRequest;
