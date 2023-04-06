import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PublicHeartyNavbar from "../HeartyNavbar/PublicHeartyNavbar";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import SearchBar from './SearchBar';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { useEventListener } from 'primereact/hooks';


//import Api from './VendorAPI';

const CategoryDisplayPage = () => {

  const { vendorCategory } = useParams(); //category name assumed to be unique
  const [vendors, setVendors] = useState([]);

  console.log("selected category = " + vendorCategory);
  const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";

  useEffect(() => {
    console.log("Triggering useeffect");
    getAllVendorsInCategory();
  }, []);

  //get all vendors in a category for display
  const getAllVendorsInCategory = () => {
    return fetch(`${SERVER_PREFIX}/allCategories/${vendorCategory}`)
      .then(response => response.json()
      )
      //then((data)=>console.log(data))
      .then((data) => setVendors(data))
      .then(()=>console.log("displaying vendors = "+vendors))
  };

  const GridItem = (vendors) => {
    console.log("the vendor is = " + vendors)
    const navigate = useNavigate();
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
    //const [selectedVendor, setSelectedVendor] = useState(chosenVendor);
  
    function redirectTo(vendor) {
      //console.log("step 0 = " + vendor.username);
      //console.log("step 1 = " + JSON.stringify(vendor));
      //console.log("Step 1 type = " + typeof JSON.stringify(vendor));
      //console.log(" step 2 = " + JSON.parse(JSON.stringify(vendor)).username);
      //setSelectedVendor()
      //setSelectedVendor(JSON.stringify(vendor));
      //const vendorJson = JSON.parse(selectedVendor);

      //console.log("CLICKED THE BUTTON > " + vendorJson.username);
      navigate(`/VendorSearchPage/VendorName/${vendor.username}`);
      //navigate(`/VendorSearchPage/VendorName/${vendorName}`); 
    }
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
            <div className="text-2xl font-bold">
                {vendors.username}
            </div>
            </div>
            <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => redirectTo(vendors)} />  
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
        <div className="card flex justify-content-center">

        </div>
          <DataView value={vendors} itemTemplate={itemTemplate} />
        </div>
      
    </div>
  );
};

export default CategoryDisplayPage;
