import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicHeartyNavbar from "../HeartyNavbar/PublicHeartyNavbar";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import SearchBar from './SearchBar';

//import Api from './VendorAPI';

const CategoryDisplayPage = () => {
  const { vendorCategory } = useParams(); //category name assumed to be unique
  console.log("selected category = " + vendorCategory);
  const [vendors, setVendors] = useState([]);

  const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";

  useEffect(() => {
    console.log("Triggering useeffect");
    getAllVendorsInCategory();
  }, []);

  //get all vendors in a category for display
  const getAllVendorsInCategory = () => {
    return fetch(`${SERVER_PREFIX}/allCategories/${vendorCategory}`)
      .then((response) => response.json())
      .then((data) => setVendors(data));
  };

  function handleClick() {
    console.log("click");
  }

  const GridItem = (vendors) => {

    return(
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{vendors.username}</span>
            </div>
            </div>
            <div className="flex flex-column align-items-center gap-3 py-5">
            <div className="text-2xl font-bold" onClick={(e) => handleClick()}>
                {" "}
                {vendors.username}
            </div>
            </div>
        </div>
        </div>
    )
  };

  const itemTemplate = (product) => {
    return GridItem(product);
  };

  return (
    <div>
      <PublicHeartyNavbar />
      <br/>
      <br/>
      <SearchBar/>
      <div className="card">
        <h1> CategoryDisplayPage, category name = {vendorCategory} </h1>

        <DataView value={vendors} itemTemplate={itemTemplate} />
        </div>
      
    </div>
  );
};

export default CategoryDisplayPage;
