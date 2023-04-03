import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Panel } from "primereact/panel";
import PublicHeartyNavbar from "../HeartyNavbar/PublicHeartyNavbar";
import { Button } from 'primereact/button';


const VendorDetailPage = () => {
  const { vendorName } = useParams(); //vendor name assumed to be unique for now
  //ensure that the 'vendorName' param is the same as the :vendorName in the endpoint
  console.log("endpoint extracted = " + vendorName);

  let chosenVendor = {
    email: "",
    isBanned: null,
    password: "",
    userId: null,
    username: "",
    banner: "",
    category: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    websiteUrl: "",
    whatsappUrl: "",
  };

  const [vendor, setVendor] = useState(chosenVendor);

  const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";

  useEffect(() => {
    console.log("Triggering useeffect");
    getVendorDetails();
  }, []);

  //function which searches for vendor details given vendor name
  const getVendorDetails = () => {
    return fetch(`${SERVER_PREFIX}/${vendorName}`)
      .then((response) => response.json())
      .then((data) => setVendor(data));
  };

  return (
    <div>
      <PublicHeartyNavbar />
      <br />
      <Card title={vendorName} style={{backgroundColor: "#BABDFF"}}>
        <p className="m-0">Category: {vendor.category.toLowerCase()}</p>
        <p className="m-0">Vendor Name: {vendor.username}</p>
      </Card>
      <Splitter style={{ height: "500px" }}>
        <SplitterPanel size={65} minSize={40}>
          <Panel header={"More about: " + vendor.username}>
            {vendor.description}
          </Panel>
          <br />
          <br />
          <Panel header="Photos and Videos">images go here</Panel>
          <br />
          <br />
          <Panel header="Pricing">pricing goes here</Panel>
        </SplitterPanel>
        <SplitterPanel size={35} minSize={20}>
          <Panel header="Contacts">
            <p className="m-0">
              <i className="pi pi-link" />
              <a href={vendor.websiteUrl}> Visit Website </a>
            </p>

            <p className="m-0">
              <i className="pi pi-camera" />
              <a href={vendor.instagramUrl}> Instagram </a>
            </p>

            <p className="m-0">
              <i className="pi pi-facebook" />
              <a href={vendor.facebookUrl}> Facebook </a>
            </p>

            <p className="m-0">
              <i className="pi pi-whatsapp" />
              <a href={vendor.whatsappUrl}> Whatsapp </a>
            </p>
          </Panel>
        </SplitterPanel>
      </Splitter>
      <Button label="Add to Wedding" className="p-button-raised p-button-rounded" />

    </div>
  );
};

export default VendorDetailPage;
