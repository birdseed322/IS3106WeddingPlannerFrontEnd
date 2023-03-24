import React from 'react'
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';



const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("")
    const navigate = useNavigate();
    const options = ["Vendor Name", "Categories"]

    function checkIfVendorExists(){

    }
    //handles the search and will redirect to the vendor's profile should 
    function HandleSearch(){
        console.log("handling search! = " + search);
        navigate(search); //adds on to the current endpoint
    }

    return (
        <span className="p-input-icon-left">
            <Dropdown placeholder="Search Criteria" 
                onChange={(e) => setSearchCriteria(e.value)}
                options= {options}
            />
            <InputText value={search} onChange={(e) => setSearch(e.target.value)} />
            <i className="pi pi-search" />
            {console.log("Search is = " + search)}
            <Button label="Search" onClick={HandleSearch}/>
        </span>      
    )
}

export default SearchBar