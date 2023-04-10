import React from 'react';
import CategoryBoxes from './CategoryBoxes';
import SearchBar from './SearchBar';
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation } from "react-router-dom"


const items = [
];


//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page. 
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function SearchPage(){
    const location = useLocation();
    const home = { icon: 'pi pi-search', url: location.pathname}
    return (
        <div>
            <HeartyNavbar />
            <BreadCrumb model={items} home={home}/>
            <br/>
            <br/>
            <SearchBar/>
            <br/>
            <br/>
            <CategoryBoxes/>
        </div>
    )
}

export default SearchPage;