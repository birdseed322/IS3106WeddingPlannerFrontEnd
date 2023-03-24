import React from 'react'
import { useParams } from 'react-router-dom';


const VendorDetailPage = () => {
    const { vendorName } = useParams(); //vendor name assumed to be unique for now 
    //ensure that the 'vendorName' param is the same as the :vendorName in the endpoint
    console.log("endpoint extracted = " + vendorName);

    //function which searches for vendor details given vendor name 
    function searchVendorDetails(){

    }

    return (
        <div>
            <h1> VendorDetailPage </h1>
            
            <h3> vendor name = {vendorName} </h3>
        </div>
    )
}

export default VendorDetailPage