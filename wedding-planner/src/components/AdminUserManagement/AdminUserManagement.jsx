import AdminHeartyNavbar from "../HeartyNavbar/AdminHeartyNavbar";
import React, { useEffect, useState, useRef, useContext } from "react";
// import { ProductService } from "./service/ProductService";
import { Button } from "primereact/button";
// import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import WeddingOrganisersDataTable from "./WeddingOrganisersDataTable";
import WeddingVendorsDataTable from "./WeddingVendorsDataTable";
import userApi from "./AdminUserManagementAPI";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import { Card } from "primereact/card";

export default function AdminUserManagement() {
    // empty array so useEffect to set doc title only runs once
    useEffect(() => {
        document.title = "Admin: User Management";
        return;
    }, []);

    const [token, setToken] = useContext(LoginTokenContext);

    const [visibleTable, setVisibleTable] = useState("vendors");
    const [organisersData, setOrganisersData] = useState([]);
    const [vendorsData, setVendorsData] = useState([]);

    // fetches organisers & vendors data
    useEffect(() => {
        const orgFutureFunction = () => {
            return userApi
                .getAllWeddingOrganisers()
                .then((response) => response.json()) // convert json string into obj
                .then((organisers) => setOrganisersData(organisers));
        };

        const vendorFutureFunction = () => {
            return userApi
                .getAllVendors()
                .then((response) => response.json())
                .then((vendors) => setVendorsData(vendors));
        };

        // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
        // waits for both fetch to finish, and then triggers rerender
        Promise.all([orgFutureFunction(), vendorFutureFunction()]).then(() =>
            setVisibleTable("organisers")
        );
        // used the "cheap" way to rerender, no idea how else to do it
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
            <AdminHeartyNavbar />
            <div id="bodyContainer">
                <div className="grid">
                    <Card className="col-10 col-offset-1">
                        Click on the corresponding button to view the corresponding group of users.
                        LOGGED IN ADMIN IS {token.username}
                        <div>
                            <Toolbar start={toolbarButtons} />
                        </div>
                    </Card>
                </div>
                <div className="grid">
                    <div className="col-12">
                        {visibleTable === "organisers" && (
                            <WeddingOrganisersDataTable
                                fetchedData={organisersData}
                            ></WeddingOrganisersDataTable>
                        )}
                        {visibleTable === "vendors" && (
                            <WeddingVendorsDataTable
                                fetchedData={vendorsData}
                            ></WeddingVendorsDataTable>
                        )}
                    </div>
                </div>
            </div>

            {/* <div id="footer">
                <h2> some text</h2>
            </div> */}
        </div>
    );
}
