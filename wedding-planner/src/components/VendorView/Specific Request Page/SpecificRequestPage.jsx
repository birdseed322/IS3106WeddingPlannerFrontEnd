import { Card } from "primereact/card";
import { Timeline } from "primereact/timeline";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import VendorNavbar from "../VendorNavbar/VendorNavbar";
import FinalisePriceAction from "./FinalisePriceAction";
import PendingApprovalButtons from "./PendingApprovalButtons";
import { Message } from "primereact/message";
import PaymentAction from "./PaymentAction";
import { LoginTokenContext } from "../../../context/LoginTokenContext";
import HeartyNavbar from "../../HeartyNavbar/HeartyNavbar";
import { Toast } from "primereact/toast";

function SpecificRequestPage() {
  //Should only be accessible by the vendor and the wedding organiser that posted
  //Based on relationship with the request render diff button options
  //Venue name how? is it predetermined or through finding a venue vendor
  //Some check to see status of the transaction (Purpose of the status)
  //Still need render buttons based on identity of the user (WO or vendor)
  let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useRef(null);
  const [request, setRequest] = useState({});
  let actionToBeTaken = "";
  const [token, setToken] = useContext(LoginTokenContext);
  const sampleRequest = {
    requestId: id,
    isAccepted: true,
    quotationURL: "Someurl.com",
    // quotedPrice: 100,
    isPaid: false,
    requestStartDate: "2023-07-04 13:03:12.000",
    requestDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ante purus, vulputate at nisl id, congue feugiat augue. Phasellus pellentesque lacus ante, eu scelerisque tortor cursus id. Aliquam erat volutpat. Sed nec dolor gravida tortor viverra cursus. In pulvinar massa erat, in pellentesque libero fringilla eget. Donec justo diam, pulvinar ut porta et, sollicitudin vel sapien. Nulla nibh arcu, gravida quis eros nec, pretium suscipit odio. Etiam vel enim id libero facilisis mattis. Aenean dignissim tempor magna, quis volutpat lectus luctus id. Nunc et porttitor urna.",
    weddingName: "Jane and John's wedding",
    weddingOrganiserName: "Peter Ong",
  };

  useEffect(() => {
    const apiUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/request/" +
      id;
    fetch(apiUrl).then((res) => {
      res.json().then((data) => {
        const wedDate = new Date(Date.parse(data.requestDate));
        if (data.requestStart) {
          const start = new Date(Date.parse(data.requestStart));
          data.requestStart = new Date(
            wedDate.getFullYear(),
            wedDate.getMonth(),
            wedDate.getDate(),
            start.getHours(),
            start.getMinutes()
          ).toLocaleString("en-SG", { hour: "2-digit", minute: "2-digit" });
        }

        if (data.requestEnd) {
          const end = new Date(Date.parse(data.requestEnd));
          data.requestEnd = new Date(
            wedDate.getFullYear(),
            wedDate.getMonth(),
            wedDate.getDate(),
            end.getHours(),
            end.getMinutes()
          ).toLocaleString("en-SG", { hour: "2-digit", minute: "2-digit" });
        }
        data.requestDate = new Date(
          Date.parse(data.requestDate)
        ).toLocaleString("en-SG", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        console.log(data);
        setRequest(data);

        if (searchParams.get("successfulPayment") == 1) {
          toast.current.show({
            severity: "success",
            summary: "Successful Payment",
            detail: "Request has been paid.",
            life: 3000,
          });
        } else if (searchParams.get("successfulApproval") == 1) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Request has been successfully approved.",
            life: 3000,
          });
        } else if (searchParams.get("successfulRejection") == 1) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Request has been successfully rejected.",
            life: 3000,
          });
        } else if (searchParams.get("successfulPriceSet") == 1) {
          toast.current.show({
            severity: "success",
            summary: "Price Set Successfully",
            detail: "Price for request has been set.",
            life: 3000,
          });
        }
      });
    });
  }, []);

  //If statements to construct the statuses that should be displayed on timeline
  let statuses = [];
  if (!Object.keys(request).includes("isAccepted")) {
    statuses.push({
      statusEventName: "Pending Approval",
      color: "#929695",
    });
    actionToBeTaken = "Pending Approval";
  } else if (request.isAccepted) {
    statuses.push({
      statusEventName: "Request Approved",
      color: "#039643",
    });
    if (!Object.keys(request).includes("quotedPrice")) {
      statuses.push({
        statusEventName: "Finalising Price",
        color: "#929695",
      });
      actionToBeTaken = "Finalising Price";
    } else {
      statuses.push({
        statusEventName: "Price Set",
        color: "#039643",
      });
      const today = new Date();
      if (request.isPaid) {
        statuses.push({
          statusEventName: "Paid",
          color: "#039643",
        });
        if (today > new Date(request.requestDate)) {
          statuses.push({
            statusEventName: "Event Completed",
            color: "#039643",
          });
          actionToBeTaken = "Event Completed";
        } else {
          statuses.push({
            statusEventName: "Event pending completion",
            color: "#929695",
          });
          actionToBeTaken = "Event Pending Completion";
        }
      } else {
        statuses.push({
          statusEventName: "Awaiting Payment",
          color: "#929695",
        });
        actionToBeTaken = "Awaiting Payment";
      }
    }
  } else {
    statuses.push({
      statusEventName: "Request Rejected",
      color: "#D11114",
    });
  }

  const customizedMarker = (item) => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
        style={{ backgroundColor: item.color }}
      ></span>
    );
  };

  function handleSetPrice(price) {
    const reqUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/setPrice/" +
      id;
    fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    }).then((response) => {
      if (response.status === 204) {
        window.location.href =
          window.location.pathname + "?successfulPriceSet=1";
      }
    });
  }

  function handleRequestResponse(response) {
    const reqUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      id;
    fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAccepted: response }),
    }).then((res) => {
      if (res.status === 204) {
        if (response) {
          window.location.href =
            window.location.pathname + "?successfulApproval=1";
        } else {
          window.location.href =
            window.location.pathname + "?successfulRejection=1";
        }
      }
    });
  }

  function handlePayment(payment) {
    if (payment == request.quotedPrice) {
      const reqUrl =
        "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/payRequest/" +
        id;
      fetch(reqUrl).then((response) => {
        if (response.status === 204) {
          window.location.href =
            window.location.pathname + "?successfulPayment=1";
        }
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Payment Failed",
        detail: "Invalid payment amount entered. Please try again.",
        life: 3000,
      });
      console.log("payment failed");
    }
  }

  return (
    <>
      <Toast ref={toast} />
      {token.userType === "VENDOR" ? <VendorNavbar /> : <HeartyNavbar />}
      <Card className="h-full">
        <div className="grid">
          <div className="col">
            <h1>{request.weddingName}</h1>
            <p className="mb-4">Organised By: {request.weddingOrganiserName}</p>
            <hr className="w-11" />
            <h2>Description</h2>
            <p className="mb-4"> {request.requestDetails}</p>
            <hr className="w-11" />
            <h2>Status</h2>
            <Timeline
              value={statuses}
              content={(item) => item.statusEventName}
              marker={customizedMarker}
            />
          </div>
          <div className="col bg-cyan">
            <TabView className="my-4">
              <TabPanel header="Details">
                {request.quotedPrice ? (
                  <>
                    <h3>Price</h3>
                    <p className="text-2xl font-semibold">
                      ${request.quotedPrice}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                <h3>Request Id</h3>
                <p>{id}</p>
                <h3>Event Date</h3>
                <p>
                  <i className="pi pi-calendar mr-2"></i>
                  {request.requestDate}
                </p>
                {request.requestStart ? (
                  <>
                    <h3>Start Time</h3>
                    <p>
                      <i className="pi pi-clock mr-2"></i>
                      {request.requestStart}
                    </p>
                  </>
                ) : null}
                {request.requestEnd ? (
                  <>
                    <h3>End Time</h3>
                    <p>
                      <i className="pi pi-clock  mr-2"></i>
                      {request.requestEnd}
                    </p>
                  </>
                ) : null}
                {request.venue ? (
                  <>
                    <h3>Venue</h3>
                    <p>
                      <i className="pi pi-map-marker mr-2"></i>
                      {request.venue}
                    </p>
                  </>
                ) : null}
              </TabPanel>
              <TabPanel header="Actions">
                {<h3>Status: {actionToBeTaken}</h3>}
                {actionToBeTaken == "Pending Approval" &&
                token.userType === "VENDOR" ? (
                  <PendingApprovalButtons
                    handleRequestResponse={handleRequestResponse}
                  />
                ) : actionToBeTaken == "Pending Approval" ? (
                  <>Waiting for vendor's response</>
                ) : (
                  <></>
                )}
                {actionToBeTaken == "Finalising Price" &&
                token.userType === "VENDOR" ? (
                  <FinalisePriceAction handleSetPrice={handleSetPrice} />
                ) : actionToBeTaken == "Finalising Price" ? (
                  <>Waiting for vendor's response</>
                ) : (
                  <></>
                )}
                {actionToBeTaken == "Awaiting Payment" &&
                token.userType === "WEDDING-ORGANISER" ? (
                  <PaymentAction handlePayment={handlePayment} />
                ) : actionToBeTaken == "Awaiting Payment" ? (
                  <>Waiting for wedding organiser's response</>
                ) : (
                  <></>
                )}
              </TabPanel>
            </TabView>
          </div>
        </div>
      </Card>
    </>
  );
}

export default SpecificRequestPage;
