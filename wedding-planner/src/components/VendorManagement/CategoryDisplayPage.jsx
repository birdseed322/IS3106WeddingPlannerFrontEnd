import React from 'react'
import { useParams } from 'react-router-dom';


const CategoryDisplayPage = () => {
    const { categoryName } = useParams(); //category name assumed to be unique 
    console.log("selected category = " + categoryName);

    return (
        
        <div>CategoryDisplayPage
        
        <h1> categoryname = {categoryName} </h1>

        </div>
        
    )
}

export default CategoryDisplayPage