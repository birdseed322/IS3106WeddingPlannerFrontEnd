import React, { useEffect, useState, useRef } from "react";
import { useParams,useLocation } from "react-router-dom";
import { Card } from "primereact/card";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Panel } from "primereact/panel";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { Button } from "primereact/button";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { Galleria } from "primereact/galleria";
import VendorAPI from "./VendorManagementAPI";
import { Toast } from "primereact/toast";
import { Tree } from "primereact/tree";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { BreadCrumb } from 'primereact/breadcrumb';

const VendorDetailPage = () => {
  const { vendorName } = useParams(); //vendor name assumed to be unique for now
  const { projectId } = useParams();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);

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
  const [selectedNodeKey, setSelectedNodeKey] = useState("");
  const [details, setDetails] = useState("");

  const nodes = [
    {
      label: "Visit Website",
      icon: "pi pi-link",
      url: "weddingmusic.com.sg/",
    },
    {
      label: "Instagram",
      icon: "pi pi-camera",
      url: "www.instagram.com/weddingentertainment/?hl=en",
    },
    {
      label: "Facebook",
      icon: "pi pi-facebook",
      url: "www.facebook.com/TheWeddingMusicCompany/",
    },
    {
      label: "Whatsapp",
      icon: "pi pi-whatsapp",
      url: "wa.me/6593360639",
    },
  ];

  const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";
  

  useEffect(() => {
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
    return (
      VendorAPI.fetchWeddingDetails(projectId)
        .then((response) => response.json())
        // .then((data) => console.log(typeof data.weddingDate)); //string
        .then((data) => {
          const request = {
            quotationURL: "testing",
            quotedPrice: 0,
            requestDate: data.weddingDate,
            requestDetails: details,
          };
          VendorAPI.createRequest(request, projectId, vendor.userId);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Request Created",
            life: 3000,
          });
          setVisible(false);
          setDetails("");
        })
    );
  };

  const onSelect = (event) => {
    let externalSite = "https://" + event.node.url;
    window.open(externalSite);
    toast.current.show({
      severity: "info",
      summary: "Opening New Tab:",
      detail: event.node.url,
    });
  };

  function checkIfCanCreateReq() {
    return VendorAPI.checkIfRequestExists(projectId, vendor.userId)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Does request with pId = ${projectId} and vId = ${vendor.userId} exist = ${data}`)
      if(data == false){ //req doesnt exist, can create
        setVisible(true);
      }else{ //cannot create
        setVisible(false);
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "You already have a pending request with this vendor",
        });
      }
    })
    }
  
    const homePath = `http://localhost:3000/${projectId}/VendorSearchPage/`;
    const categoryPath = homePath + `Category/${vendor.category}`
    const location = useLocation();
    const currPath = location.pathname
    const home = { icon: 'pi pi-search', url: homePath}
    const items = [
        {label: 'Category', url: categoryPath},
        {label: 'Vendor Details', url: currPath}
    ];
  return (
    <div>
      <HeartyNavbar />
      <BreadCrumb model={items} home={home}/>
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
          onClick={() => checkIfCanCreateReq()}
        />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Enter Request Details"
          icon="pi pi-exclamation-triangle"
        >
          <label> Details: </label>
          <br/>
          <InputTextarea
            value={details}
            rows={5} cols={30}
            onChange={(e) => setDetails(e.target.value)}
          >
            {" "}
          </InputTextarea>
          <br/>
          <Button
            label="Submit"
            style={{ backgroundColor: "#f561b0", border: "#f561b0", float:"right" }}
            onClick={() => addToProject()}
          />
        </Dialog>
        <p className="m-0">Category: {vendor.category.toLowerCase()}</p>
        <p className="m-0">Vendor Name: {vendor.username}</p>
      </Card>
      <Splitter style={{ height: "780px" }}>
        <SplitterPanel size={80} minSize={70}>
          <Panel header={"About Me: " }>
            {vendor.description}
          </Panel>
          <br />
          <br />
          <Panel header="Photos:">
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
          <Panel header="Pricing Information:">
            For pricing information, visit the webside on the right
          </Panel>
        </SplitterPanel>
        <SplitterPanel size={20} minSize={15}>
          <Panel header="Contacts:">
            <div className="card flex justify-content-center">
              <Tree
                value={nodes}
                selectionMode="single"
                selectionKeys={selectedNodeKey}
                onSelectionChange={(e) => setSelectedNodeKey(e.label)}
                onSelect={onSelect}
                className="w-full md:w-25rem"
              />
            </div>
          </Panel>
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default VendorDetailPage;
