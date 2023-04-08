import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const RequestsDataTable = ({ requestsInfo }) => {
    const [formattedInfo, setFormattedInfo] = useState([]);

    useEffect(() => {

        const {pending, rejected, accepted, total} = requestsInfo;

        const rowObject = {id: "Requests", pending, rejected, accepted, total};
        console.log(rowObject);

        // return list containing only this 1 row object
        setFormattedInfo([rowObject]);
    }, []);

    const idTemplate = (rowData) => {
        return <b>{rowData.id}</b>;
    };

    const headerText = (
        <div style={{ textAlign: "center" }}>
            <b>Requests Status</b>
        </div>
    );
    return (
        <div>
            <div className="card">
                <DataTable value={formattedInfo} header={headerText} responsiveLayout="scroll">
                    <Column field="id" header="" body={idTemplate}></Column>
                    <Column field="pending" header="Pending"></Column>
                    <Column field="rejected" header="Rejected"></Column>
                    <Column field="accepted" header="Accepted"></Column>
                    <Column field="total" header="Total"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default RequestsDataTable;
