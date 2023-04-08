import AdminHeartyNavbar from "../../HeartyNavbar/AdminHeartyNavbar";
import React, { useEffect, useState, useRef, useContext } from "react";
// import { ProductService } from "./service/ProductService";
import { Button } from "primereact/button";
// import { FileUpload } from "primereact/fileupload";
import { LoginTokenContext } from "../../../context/LoginTokenContext";
import { Card } from "primereact/card";
import AdminUserManagementAPI from "../AdminUserManagementAPI";
import { Chart } from "primereact/chart";
import { generateVendorCategoryData, generateUserCountData } from "./UseEffectsForData";

export default function AdminStatistics() {
    // empty array so useEffect to set doc title only runs once
    useEffect(() => {
        document.title = "Admin: Statistics";
        return;
    }, []);

    const [token, setToken] = useContext(LoginTokenContext);
    const [weddingOrganisersData, setWeddingOrganisersData] = useState([]);
    const [vendorsData, setVendorsData] = useState([]);

    const [vendorsCategoryData, setVendorsCategoryData] = useState();
    const [usersCountData, setUsersCountData] = useState();

    // fetch organsiers and vendors data and set their state
    useEffect(() => {
        AdminUserManagementAPI.getAllVendors()
            .then((res) => res.json())
            .then((vendors) => setVendorsData(vendors));

        AdminUserManagementAPI.getAllWeddingOrganisers()
            .then((res) => res.json())
            .then((wOrgs) => setWeddingOrganisersData(wOrgs));
    }, []);

    // computes the relevant info of vendorsdata that some tables need
    useEffect(() => generateVendorCategoryData(vendorsData, setVendorsCategoryData), [vendorsData]);

    useEffect(() => generateUserCountData(weddingOrganisersData, vendorsData, setUsersCountData), [weddingOrganisersData, vendorsData]);
    
    const vendorsCategoryChartOptions = {
        animation: true,
    };

    return (
        <div id="appContainer">
            <AdminHeartyNavbar />
            <div id="bodyContainer">
                {/* <div className="bodyTextColumn">  */}
                <div className="dataVisualisation">
                    <div className="grid grid-nogutter">
                        {" "}
                        <Card className="col-4 col-offset-4">test</Card>
                    </div>
                    <div className="grid grid-nogutter">
                        <Card title="User Quantity Information" className="col-4">
                            <Chart
                                type="pie"
                                data={usersCountData}
                                options={vendorsCategoryChartOptions}
                                className="w-full"
                            />
                        </Card>
                        <Card title="Transactions Information" className="col-4"></Card>
                        <Card title="Vendor Category Breakdown" className="col-4">
                            <Chart
                                type="doughnut"
                                data={vendorsCategoryData}
                                options={vendorsCategoryChartOptions}
                                className="w-full"
                            />
                        </Card>
                    </div>
                </div>
            </div>

            {/* <div id="footer">
                <h2> some text</h2>
            </div> */}
        </div>
    );
}
