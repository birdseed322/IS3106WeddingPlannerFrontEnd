import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("categories");
  const [allVendors, setAllVendors] = useState([]);
  const navigate = useNavigate();
  const toast = useRef(null);
  const categories = ["Entertainment", "Food", "Lighting", "Decoration", "Clothes", "Venue"];
  const { projectId } = useParams();

  const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";
  const searchCriteriaOptions = ["Categories", "Vendor Name"];

  useEffect(() => {
    getAllVendors();
  }, []);

  //get all vendors in db
  const getAllVendors = () => {
    return (
      fetch(SERVER_PREFIX)
        .then(response => response.json())
        //then((data)=>console.log(data))
        .then(data => setAllVendors(data))
        .then(() => console.log("displaying vendors = " + allVendors))
    );
  };

  function checkIfVendorExists() {
    for(let index = 0; index < allVendors.length; index++){
       // console.log(allVendors[index]);
       if(allVendors[index].username == search){
        return true;
       }
    }
    return false;
  }

  //handles the search and will redirect to the vendor's profile should
  function HandleSearch() {
    console.log("Project ID = " + projectId);
    if (search.length == 0) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please input a search",
        life: 3000,
      });
    } else {
      //handles 'vendor name' selection
      if (searchCriteria.toLowerCase() == "vendor name") {
        if (checkIfVendorExists()) {
          console.log("handling search for vendor! = " + search);
          //navigate(`${projectId}/VendorSearchPage/VendorName/${search}`); //adds on to the current endpoint
          navigate(`/${projectId}/VendorSearchPage/VendorId/${search}`);
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Warning",
            detail: "Vendor Name does not exist",
            life: 3000,
          });
        }
      }
      //handles 'categories' selection
      else if (searchCriteria.toLowerCase() == "categories") {
        console.log("handling search for categories! = " + search);
        if(categories.map(str => str.toLowerCase()).includes(search.toLowerCase())){
        //navigate(`${projectId}/VendorSearchPage/Category/${search}`);
        navigate(`/${projectId}/VendorSearchPage/Category/${search}`);
        //navigate(search); //adds on to the current endpoint eg http://localhost:3000/VendorSearchPage/search
        }else{
            toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "category name does not exist",
                life: 3000,
              });
        }
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "An error has occurred",
          life: 3000,
        });
      }
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      <div class="card">
        <div class="flex flex-wrap align-items-center justify-content-center card-container blue-container">
          <span className="p-input-icon-left">
            <Dropdown
              placeholder="Search Criteria"
              value={searchCriteria}
              defaultValue="Categories"
              onChange={(e) => setSearchCriteria(e.value)}
              options={searchCriteriaOptions}
              className="w-full md:w-14rem"
              filter
            />
            <span className="p-input-icon-left">
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="pi pi-search" />
            </span>
            {console.log("Search is = " + search)}
            <Button label="Search" onClick={HandleSearch} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
