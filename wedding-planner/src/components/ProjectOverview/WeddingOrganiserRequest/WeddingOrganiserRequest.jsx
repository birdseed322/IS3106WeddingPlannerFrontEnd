import React, { useContext, useState } from "react";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Link, useParams } from "react-router-dom";
import { LoginTokenContext } from "../../../context/LoginTokenContext";
import HeartyNavbar from "../../HeartyNavbar/HeartyNavbar";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

function WeddingOrganiserRequest() {
  const [token, setToken] = useContext(LoginTokenContext);
  const [requests, setRequests] = useState([]);
  let { projectId } = useParams();
  const [filters, setFilters] = useState({
    "vendor.username": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    requestId: { value: null, matchMode: FilterMatchMode.EQUALS },
    "transaction.isPaid": { value: null, matchMode: FilterMatchMode.EQUALS },
    isAccepted: { value: null, matchMode: FilterMatchMode.EQUALS },
    "vendor.category": { value: null, matchMode: FilterMatchMode.IN },
  });
  const [paymentStatuses] = useState(["Unpaid", "Paid"]);
  React.useEffect(() => {
    const apiUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/weddingProjectRequests/" +
      projectId;
    fetch(apiUrl).then((res) => {
      res.json().then((data) => {
        data.forEach((e) => {
          console.log(e);
          e.weddingProject.weddingDate = new Date(
            e.weddingProject.weddingDate.replace("[UTC]", "")
          );
          e.requestDate = new Date(e.requestDate.replace("[UTC]", ""));
        });
        setRequests(data);
      });
    });
  }, []);

  //Data table formatting
  const dateBodyTemplate = (rowData) => {
    //may need to change
    return rowData.requestDate.toLocaleDateString("en-SG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const quotedPriceTemplate = (rowData) => {
    if (!rowData.isAccepted) {
      return null;
    } else if (rowData.quotedPrice) {
      return rowData.quotedPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "SGD",
      });
    } else {
      return <Tag value="Unconfirmed" severity="danger" />;
    }
  };

  const paymentStatusTemplate = (rowData) => {
    if (!rowData.isAccepted) {
      return null;
    } else if (rowData.transaction && rowData.transaction.isPaid) {
      return <Tag value="Paid" severity="success" />;
    } else {
      return <Tag value="Unpaid" severity="danger" />;
    }
  };
  const approvalStatus = (rowData) => {
    console.log(rowData.isAccepted);
    if (rowData.isAccepted == null) {
      return <Tag value="Pending" severity="info" />;
    } else if (!rowData.isAccepted) {
      return <Tag value="Rejected" severity="danger" />;
    } else {
      return <Tag value="Approved" severity="success" />;
    }
  };

  const vendorNameTemplate = (rowData) => {
    return rowData.vendor.username;
  };

  const categoryTemplate = (rowData) => {
    return rowData.vendor.category;
  };

  const pendingActionTemplate = (rowData) => {
    return (
      <Link
        className="no-underline"
        to={"/" + projectId + "/requests/" + rowData.requestId}
      >
        <Button severity="secondary"> View </Button>
      </Link>
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
        style={{ minWidth: "6rem" }}
      />
    );
  };

  const approvalStatusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={
          options.value ? "Approved" : options.value === null ? "" : "Rejected"
        }
        options={["Approved", "Rejected"]}
        onChange={(e) =>
          options.filterApplyCallback(e.value === "Approved" ? true : false)
        }
        itemTemplate={approvalStatusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "6rem" }}
      />
    );
  };

  const approvalStatusItemTemplate = (option) => {
    return (
      <Tag
        value={option}
        severity={option === "Approved" ? "success" : "danger"}
      />
    );
  };

  const vendorUsernameRowFilterTemplate = (options) => {
    return (
      <InputText
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Search name"
        className="p-column-filter"
        style={{ minWidth: "14rem" }}
      />
    );
  };
  const categoryItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option}</span>
      </div>
    );
  };

  const categoryRowFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={[
          "ENTERTAINMENT",
          "FOOD",
          "LIGHTING",
          "DECORATION",
          "CLOTHES",
          "VENUE",
          "UNTITLED",
        ]}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        itemTemplate={categoryItemTemplate}
        optionLabel="Category"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={0}
        style={{ minWidth: "10rem" }}
      />
    );
  };

  const requestIdRowFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Id"
        className="p-column-filter"
        style={{ minWidth: "3rem" }}
      />
    );
  };

  return (
    <div>
      <HeartyNavbar />
      <DataTable
        paginator
        rows={10}
        value={requests}
        filterDisplay="row"
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No requests found."
        filters={filters}
      >
        <Column
          field="vendorUsername"
          header="Vendor Name"
          sortable
          style={{ width: "20%" }}
          body={vendorNameTemplate}
          filterField="vendor.username"
          filter
          filterPlaceholder="Search by name"
        ></Column>
        <Column
          field="requestId"
          header="Request ID"
          sortable
          style={{width:"10%"}}
          filter
          filterElement={requestIdRowFilterTemplate}
          filterPlaceholder="Search by request Id"
        ></Column>
        <Column
          field="isAccepted"
          header="Approval Status"
          body={approvalStatus}
          sortable
          style={{ width: "10%" }}
          filter
          filterField="isAccepted"
          filterElement={approvalStatusRowFilterTemplate}
        ></Column>
        <Column
          field="quotedPrice"
          header="Quoted Price"
          body={quotedPriceTemplate}
          sortable
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="transaction.isPaid"
          header="Payment status"
          sortable
          body={paymentStatusTemplate}
          filterField="transaction.isPaid"
          filter
          filterElement={paymentRowFilterTemplate}
          showFilterMenu={false}
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="requestDate"
          header="Creation Date"
          sortable
          body={dateBodyTemplate}
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="category"
          header="Category"
          sortable
          body={categoryTemplate}
          filterField="vendor.category"
          filter
          showFilterMenu={false}
          filterElement={categoryRowFilterTemplate}
          style={{ width: "10%" }}
        ></Column>
        <Column
          field=""
          header="Action"
          style={{ width: "10%" }}
          body={pendingActionTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}

export default WeddingOrganiserRequest;
