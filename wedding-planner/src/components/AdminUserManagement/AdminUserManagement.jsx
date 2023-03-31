import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import React, { useEffect, useState, useRef } from "react";
// import { ProductService } from "./service/ProductService";
import { Button } from "primereact/button";
// import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import WeddingOrganisersDataTable from "./WeddingOrganisersDataTable";
import WeddingVendorsDataTable from "./WeddingVendorsDataTable";
import userApi from "./AdminUserManagementAPI";

export default function AdminUserManagement() {
    // empty array so useEffect to set doc title only runs once
    useEffect(() => {
        document.title = "Admin: User Management";
        return;
    }, []);

    const [visibleTable, setVisibleTable] = useState("organisers");
    const organisersData = useRef();
    const vendorsData = useRef();

    // fetches organisers & vendors data
    useEffect(() => {
        
        userApi.getAllWeddingOrganisers()
        .then((response) => response.json()) // convert json string into obj
        .then((organisers) => organisersData.current = organisers);
        
        userApi.getAllVendors()
        .then((response) => response.json())
        .then((vendors) => vendorsData.current = vendors);
    }, []);
    

    const toolbarButtons = (
        <>
            <Button
                label="Wedding Organisers"
                onClick={() => setVisibleTable("organisers")}
            ></Button>
            <Button label="Wedding Vendors" onClick={() => setVisibleTable("vendors")}></Button>
        </>
    );
    // note that HeartyNavbar has an id specified in its component jsx file

    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <p>
                        Click on the corresponding button to view the corresponding group of users.
                    </p>
                    <div>
                        <Toolbar start={toolbarButtons} />
                    </div>
                </div>
                <>
                    {visibleTable === "organisers" && (
                        <WeddingOrganisersDataTable fetchedData={organisersData.current}></WeddingOrganisersDataTable>
                    )}
                    {visibleTable === "vendors" && (
                        <WeddingVendorsDataTable fetchedData={vendorsData.current}></WeddingVendorsDataTable>
                    )}
                </>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>
        </div>
    );
}
