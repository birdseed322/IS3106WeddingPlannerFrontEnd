import React from 'react'
import { useParams } from 'react-router-dom';


const CategoryDisplayPage = () => {
    const { vendorCategory } = useParams(); //category name assumed to be unique 
    console.log("selected category = " + vendorCategory);

    //get all vendors in a category for display 
    function getAllVendorsInCategory(){

    }

    return (
        
        <div>CategoryDisplayPage
        
        <h1> vendor category name = {vendorCategory} </h1>

        </div>
        
    )
}

export default CategoryDisplayPage