import React from 'react'
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';



const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("categories")
    const navigate = useNavigate();

    const searchCriteriaOptions = ["Categories","Vendor Name"]

    function checkIfVendorExists(){
        return true;
    }
    function checkIfCategoryExists(){
        return true;
    }
    //handles the search and will redirect to the vendor's profile should 
    function HandleSearch(){
        console.log("Criteria length = "+ searchCriteria.length);

        //search shouldnt be 0 cos by default it will have 'categories' selected
        if(searchCriteria.length == 0 ){
            alert("Please select");
        }
        //handles 'vendor name' selection
        if(searchCriteria.toLowerCase() == "vendor name"){
            console.log("handling search for vendor! = " + search);
            navigate(`VendorName/${search}`); //adds on to the current endpoint
        }
        //handles 'categories' selection 
        else if(searchCriteria.toLowerCase() == "categories"){
            console.log("handling search for categories! = " + search);
            if(checkIfCategoryExists()){
                navigate(`Category/${search}`);
            }
            //navigate(search); //adds on to the current endpoint eg http://localhost:3000/VendorSearchPage/search
        }else{
            console.log("search criteria failed");
        }
    }

    return (
        <span className="p-input-icon-left">
            <Dropdown placeholder="Search Criteria" 
                value={searchCriteria}
                defaultValue="Categories"
                onChange={(e) => setSearchCriteria(e.value)}
                options= {searchCriteriaOptions}
                className="w-full md:w-14rem"
                filter   
            />
            <span className="p-input-icon-left">
                <InputText value={search} onChange={(e) => setSearch(e.target.value)} />
                <i className="pi pi-search" />
            </span>
            {console.log("Search is = " + search)}
            <Button label="Search" onClick={HandleSearch}/>
        </span>      
    )
}

export default SearchBar