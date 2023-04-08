import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Panel } from "primereact/panel";
import PublicHeartyNavbar from "../HeartyNavbar/PublicHeartyNavbar";
import { Button } from "primereact/button";
import {ref, getDownloadURL, listAll} from "firebase/storage";
import { storage } from "../firebase";
import { Galleria } from "primereact/galleria";
import VendorAPI from './VendorManagementAPI';
import { Toast } from 'primereact/toast';



const VendorDetailPage = () => {
  const { vendorName } = useParams(); //vendor name assumed to be unique for now
  const { projectId } = useParams(); 
  const toast = useRef(null);

  //ensure that the 'vendorName' param is the same as the :vendorName in the endpoint
  //console.log("endpoint extracted = " + vendorName);


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

  const imagesListRef = ref(storage, `Vendor/${vendorName}/Photos/`);

  const [vendor, setVendor] = useState(chosenVendor);
  const [imageUrls, setImageUrls] = useState([]);

  const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";

  useEffect(() => {
    console.log("Triggering get vendor details");
    getVendorDetails();
  }, []);

  useEffect(() => {
    console.log("triggering image retreival from firebase");
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        // console.log(item);
        //setImageUrls((prev) => [...prev, item]);
        getDownloadURL(item).then((url) => {
          console.log(url);
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  //function which searches for vendor details given vendor name
  const getVendorDetails = () => {
    return fetch(`${SERVER_PREFIX}/${vendorName}`)
      .then((response) => response.json())
      .then((data) => setVendor(data));
  };

  const itemTemplate = (item) => {
    return (
      <img src={item} alt={item} style={{ width: "100%", display: "block" }} />
    );
  };

  const addToProject = () => {
    return VendorAPI.fetchWeddingDetails(projectId)
    .then((response) => response.json())
     // .then((data) => console.log(typeof data.weddingDate)); //string
     .then((data) => {
      const request = {
        quotationURL: "testing",
        quotedPrice: 0,
        requestDate: data.weddingDate,
        requestDetails: "Small gig",
      }
      VendorAPI.createRequest(request);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Request Created', life: 3000 });
     })
    }

  return (
    <div>
      <PublicHeartyNavbar />
      <br />
      <Card
        title={vendorName}
        style={{ backgroundColor: "#BABDFF", width: "100%" }}
      >
        <Toast ref={toast} />
        <Button
          style={{ float: "right" }}
          label="Send a Request"
          className="p-button-raised p-button-rounded"
          onClick={() => addToProject()}
        />
        <p className="m-0">Category: {vendor.category.toLowerCase()}</p>
        <p className="m-0">Vendor Name: {vendor.username}</p>
      </Card>
      <Splitter style={{ height: "780px" }}>
        <SplitterPanel size={80} minSize={70}>
          <Panel header={"More about: " + vendor.username}>
            {vendor.description}
          </Panel>
          <br />
          <br />
          <Panel header="Photos and Videos">
            <div className="card">
              <Galleria
                value={imageUrls}
                numVisible={5}
                circular
                style={{ maxWidth: "540px", maxHeight: "400px" }}
                showThumbnails={false}
                showItemNavigators
                item={itemTemplate}
              />
            </div>
          </Panel>
          <br />
          <br />
          <Panel header="Pricing">
            For pricing information, visit the webside on the right
          </Panel>
        </SplitterPanel>
        <SplitterPanel size={20} minSize={15}>
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
    </div>
  );
};

export default VendorDetailPage;
