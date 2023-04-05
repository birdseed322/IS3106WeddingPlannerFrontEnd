import React from "react";
import { Card } from "primereact/card";
import RequestFooter from "./RequestFooter";
import VendorNavbar from "../VendorNavbar/VendorNavbar";

function VendorRequest() {
  //Implement use effect to make call to api to retrieve vendor requests. Use the id from the session storage to maintain state
  const [vendorPendingRequests, setVendorPendingRequests] = React.useState([]);
  const [vendorConfirmedRequests, setVendorConfirmedRequests] = React.useState(
    []
  );

  React.useEffect(() => {
    //Pull vendorId from the sessionStorage
    const vendorId = 12;
    const apiUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      vendorId;
    fetch(apiUrl).then((res) => {
      res.json().then((data) => {
        let pendingReq = [];
        let acceptedReq = [];
        for (let req in data) {
          if (!Object.keys(data[req]).includes("isAccepted")) {
            pendingReq.push(data[req]);
          } else if (data[req].isAccepted === true) {
            acceptedReq.push(data[req]);
          }
        }

        setVendorPendingRequests(pendingReq);
        setVendorConfirmedRequests(acceptedReq);
      });
    });
  }, []);

  function handleAccept(id) {
    const reqUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      id;
    fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAccepted: true }),
    }).then((response) => {
      if (response.status === 204) {
        let tempReq;
        setVendorPendingRequests((prev) => {
          tempReq = prev.find((req) => req.requestId === id);
          setVendorConfirmedRequests([...vendorConfirmedRequests, tempReq]);
          return prev.filter((req) => req.requestId !== id);
        });
      }
    });
  }

  function handleReject(id) {
    const reqUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      id;
    fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAccepted: false }),
    }).then((response) => {
      if (response.status === 204) {
        let newList = [...vendorPendingRequests];
        newList = newList.filter(req => req.requestId !== id);
        setVendorPendingRequests(newList);
      }
    });
  }
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
        {vendorPendingRequests.length > 0 ? <h1>Pending Requests</h1> : null}
        {vendorPendingRequests.map((request) => (
          <Card
            title={request.requestId}
            className="w-full my-4"
            footer={
              <RequestFooter
                reqId={request.requestId}
                handleAccept={handleAccept}
                handleReject={handleReject}
              />
            }
            key={request.requestId}
          >
            {request.requestDetails}
            <p>
              Created On:{" "}
              {new Date(
                request.requestDate.replace("[UTC]", "")
              ).toDateString()}
            </p>
          </Card>
        ))}

        {vendorConfirmedRequests.length > 0 ? <h1>Accepted Requests</h1> : null}
        {vendorConfirmedRequests.map((request) => (
          <Card
            title={request.requestId}
            className="w-full my-4"
            key={request.requestId}
          >
            {request.requestDetails}
            <p>
              Created On:{" "}
              {new Date(
                request.requestDate.replace("[UTC]", "")
              ).toDateString()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VendorRequest;
