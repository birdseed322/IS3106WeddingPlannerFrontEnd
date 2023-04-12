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
import { TabPanel, TabView } from "primereact/tabview";

export default function AdminUserManagement() {
    // empty array so useEffect to set doc title only runs once
    useEffect(() => {
        document.title = "Admin: User Management";
        return;
    }, []);

    const [token, setToken] = useContext(LoginTokenContext);
    const [organisersData, setOrganisersData] = useState([]);
    const [vendorsData, setVendorsData] = useState([]);

    // fetches organisers & vendors data
    useEffect(() => {
        const orgFutureFunction = async () => {
            const response = await userApi
                .getAllWeddingOrganisers();
            const organisers = await response.json();
            return setOrganisersData(organisers);
        };

        const vendorFutureFunction = async () => {
            const response = await userApi
                .getAllVendors();
            const vendors = await response.json();
            return setVendorsData(vendors);
        };

        orgFutureFunction();
        vendorFutureFunction();
        // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
        // waits for both fetch to finish, and then triggers rerender
        // Promise.all([orgFutureFunction(), vendorFutureFunction()]).then(() =>
        //     setVisibleTable("organisers")
        // );
        // used the "cheap" way to rerender, no idea how else to do it
    }, []);


    // note that HeartyNavbar has an id specified in its component jsx file

    return (
        <div id="appContainer">
            <AdminHeartyNavbar />
            <div id="bodyContainer">
                {/* <div className="grid">
                    <Card className="col-10 col-offset-1">
                        Click on the corresponding button to view the corresponding group of users.
                        LOGGED IN ADMIN IS {token.username}
                    </Card>
                </div> */}
                <div className="grid">
                    <div className="col-12">
                        <TabView>
                            <TabPanel header="Wedding Organisers">
                            <WeddingOrganisersDataTable
                                fetchedData={organisersData}
                            ></WeddingOrganisersDataTable>
                            </TabPanel>
                            <TabPanel header="Vendors">
                            <WeddingVendorsDataTable
                                fetchedData={vendorsData}
                            ></WeddingVendorsDataTable>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </div>

            {/* <div id="footer">
                <h2> some text</h2>
            </div> */}
        </div>
    );
}
