import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";        



const CategoryBoxes = () => {

    const [selectedCategory, setSelectedCategory] = useState("")
    const navigate = useNavigate();

    function handleClick(category){
        setSelectedCategory(category);
        console.log("Selected category: " + category);
        navigate(`Category/${category}`);
    }
    // use https://primereact.org/dataview/
    return (
        <div>
            <h2>Click a box to go to a different page:</h2>
        <div>
            <div className="box" onClick={(e) => handleClick("Entertainment")}> Entertainment </div>

            <div className="box" onClick={(e) => handleClick("Food")}> Food </div>
            
            <div className="box" onClick={(e) => handleClick("Lighting")}> Lighting </div>
            
            <div className="box" onClick={(e) => handleClick("Decoration")}> Decoration </div>

            <div className="box" onClick={(e) => handleClick("Dresses&Suits")}> Dresses & Suits </div>

            <div className="box" onClick={(e) => handleClick("Venue")}> Venue </div>
        </div>
        </div>
    )
}

export default CategoryBoxes