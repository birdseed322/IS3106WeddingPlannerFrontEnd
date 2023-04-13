import React, { useContext, useRef } from "react";
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
import { LoginTokenContext } from "../../../context/LoginTokenContext";
import { FilterMatchMode } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

function VendorRequest() {
  //When rendering the data table for the requests, the headers should include: S/N? Request id. Event Date. View button. Quoted price. W.O?

  //Implement use effect to make call to api to retrieve vendor requests. Use the id from the session storage to maintain state
  const toast = useRef(null);
  const [vendorPendingRequests, setVendorPendingRequests] = React.useState([]);
  const [vendorConfirmedRequests, setVendorConfirmedRequests] = React.useState(
    []
  );
  const [filters, setFilters] = React.useState({
    requestId: { value: null, matchMode: FilterMatchMode.EQUALS },
    "transaction.isPaid": { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [token, setToken] = useContext(LoginTokenContext);
  React.useEffect(() => {
    const apiUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      token.userId;
    fetch(apiUrl).then((res) => {
      res.json().then((data) => {
        data = data.filter((e) => {
          return (new Date(e.weddingProject.weddingDate.replace("[UTC]", "")) > new Date());
        });
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
        console.log(acceptedReq);
      });
    });
  }, []);

  function handleAccept(id) {
    const checkUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/checkSchedule?requestId=" +
      id +
      "&vendorId=" +
      token.userId;
    const reqUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/" +
      id;

    fetch(checkUrl).then((response) => {
      response.json().then((res) => {
        if (res.clashes > 0) {
          //Open acknowledgement dialog box pop up
          console.log("There is a clash. opening up dialog box");
          confirmDialog({
            message: (
              <>
                <div>
                  Do you want to accept this request? You currently have{" "}
                  {res.clashes} event(s) on that
                </div>
                <Link to={"/schedule?date=" + res.clashDate}>day</Link>.
              </>
            ),
            header: "Acceptance Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-success",
            draggable: false,
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
                  toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Request has been successfully approved.",
                    life: 3000,
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
              toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Request has been successfully approved.",
                life: 3000,
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
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Request has been successfully rejected.",
          life: 3000,
        });
      }
    });
  }

  //Data table formatting
  const dateBodyTemplate = (rowData) => {
    //may need to change
    return new Date(
      rowData.weddingProject.weddingDate.replace("[UTC]", "")
    ).toLocaleDateString("en-SG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const creationDateBodyTemplate = (rowData) => {
    //may need to change
    return new Date(
      rowData.requestDate.replace("[UTC]", "")
    ).toLocaleDateString("en-SG", {
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
      <Link className="no-underline" to={"/requests/" + rowData.requestId}>
        <Button label="View" severity="secondary" />
      </Link>
    );
  };

  const pendingActionTemplate = (rowData) => {
    return (
      <>
        <RequestFooter
          reqId={rowData.requestId}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      </>
    );
  };

  const requestIdRowFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Search requestId"
        className="p-column-filter"
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const paymentItemTemplate = (option) => {
    return (
      <Tag value={option} severity={option === "Paid" ? "success" : "danger"} />
    );
  };

  const paymentRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value ? "Paid" : options.value === null ? "" : "Unpaid"}
        options={["Paid", "Unpaid"]}
        onChange={(e) =>
          options.filterApplyCallback(e.value === "Paid" ? true : false)
        }
        itemTemplate={paymentItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <VendorNavbar />
      <TabView>
        <TabPanel header="Pending Requests">
          <DataTable
            paginator
            rows={10}
            filters={filters}
            filterDisplay="row"
            value={vendorPendingRequests}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="No requests found."
          >
            <Column
              field="requestId"
              header="Request ID"
              sortable
              filter
              filterElement={requestIdRowFilterTemplate}
              filterPlaceholder="Search by request Id"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="weddingProject.weddingDate"
              header="Event Date"
              sortable
              body={dateBodyTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="requestDate"
              header="Creation Date"
              sortable
              body={creationDateBodyTemplate}
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
            paginator
            rows={10}
            filters={filters}
            filterDisplay="row"
          >
            <Column
              field="requestId"
              header="Request ID"
              sortable
              style={{ width: "25%" }}
              filter
              filterElement={requestIdRowFilterTemplate}
              filterPlaceholder="Search by request Id"
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
              filterField="transaction.isPaid"
              filter
              filterElement={paymentRowFilterTemplate}
              showFilterMenu={false}
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
