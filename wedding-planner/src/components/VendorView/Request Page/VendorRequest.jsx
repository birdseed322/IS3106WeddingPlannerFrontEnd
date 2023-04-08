import React from "react";
import { Card } from "primereact/card";
import RequestFooter from "./RequestFooter";
import VendorNavbar from "../VendorNavbar/VendorNavbar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function VendorRequest() {
  //When rendering the data table for the requests, the headers should include: S/N? Request id. Event Date. View button. Quoted price. W.O?

  //Implement use effect to make call to api to retrieve vendor requests. Use the id from the session storage to maintain state
  const [vendorPendingRequests, setVendorPendingRequests] = React.useState([]);
  const [vendorConfirmedRequests, setVendorConfirmedRequests] = React.useState(
    []
  );
  //Pull vendorId from the sessionStorage
  const vendorId = 2;
  React.useEffect(() => {
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
        console.log(acceptedReq)
      });
    });
  }, []);

  function handleAccept(id) {
    const checkUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/checkSchedule?requestId=" +
      id +
      "&vendorId=" +
      vendorId;
    const reqUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      id;

    fetch(checkUrl).then((response) => {
      response.json().then((res) => {
        if (res.clashes > 0) {
          //Open acknowledgement dialog box pop up
          console.log("There is a clash. opening up dialog box");
          confirmDialog({
            message:
              "Do you want to accept this request? You currently have " +
              res.clashes +
              " event(s) on that day.",
            header: "Acceptance Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-success",
            accept: () => {
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
                    setVendorConfirmedRequests([
                      ...vendorConfirmedRequests,
                      tempReq,
                    ]);
                    return prev.filter((req) => req.requestId !== id);
                  });
                }
              });
            },
          });
        } else {
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
                setVendorConfirmedRequests([
                  ...vendorConfirmedRequests,
                  tempReq,
                ]);
                return prev.filter((req) => req.requestId !== id);
              });
            }
          });
        }
      });
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
        newList = newList.filter((req) => req.requestId !== id);
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

  //Data table formatting
  const dateBodyTemplate = (rowData) => {
    return new Date(
      rowData.requestDate.replace("[UTC]", "")
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const quotedPriceTemplate = (rowData) => {
    if (rowData.quotedPrice) {
      return rowData.quotedPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "SGD",
      });
    } else {
      return <Tag value="Unconfirmed" severity="danger" />;
    }
  };

  const paymentStatusTemplate = (rowData) => {
    if (rowData.transaction && rowData.transaction.isPaid) {
      return <Tag value="Paid" severity="success" />;
    } else {
      return <Tag value="Unpaid" severity="danger" />;
    }
  };

  const confirmedActionTemplate = (rowData) => {
    return (
      <Link
        className="no-underline"
        to={"/vendor/request/" + rowData.requestId}
      >
        <Button label="View" severity="secondary" />
      </Link>
    );
  };

  const pendingActionTemplate = (rowData) => {
    return (
      <RequestFooter
        reqId={rowData.requestId}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
    );
  };

  return (
    <div>
      <VendorNavbar />
      <TabView>
        <TabPanel header="Pending Requests">
          <DataTable
            value={vendorPendingRequests}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="No requests found."
          >
            <Column
              field="requestId"
              header="Request ID"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="requestDate"
              header="Event Date"
              sortable
              body={dateBodyTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field=""
              header="Action"
              style={{ width: "25%" }}
              body={pendingActionTemplate}
            ></Column>
          </DataTable>

          <ConfirmDialog />
        </TabPanel>
        <TabPanel header="Accepted Requests">
          <DataTable
            value={vendorConfirmedRequests}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="No requests found."
          >
            <Column
              field="requestId"
              header="Request ID"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="quotedPrice"
              header="Quoted Price"
              body={quotedPriceTemplate}
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="isPaid"
              header="Payment status"
              sortable
              body={paymentStatusTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="requestDate"
              header="Event Date"
              sortable
              body={dateBodyTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field=""
              header="Action"
              style={{ width: "25%" }}
              body={confirmedActionTemplate}
            ></Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
}

export default VendorRequest;
