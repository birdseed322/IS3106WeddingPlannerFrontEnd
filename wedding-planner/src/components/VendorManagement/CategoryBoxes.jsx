import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";     
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';



const product = ["Entertainment", "Food", "Lighting", "Decoration", "Clothes", "Venue"];


const GridItem = (product) => {

    const [selectedCategory, setSelectedCategory] = useState("")
    const navigate = useNavigate();

    function handleClick(category){
        setSelectedCategory(category);
        console.log("Selected category: " + category);
        navigate(`Category/${category}`);
    }
    return (
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <div className="text-2xl font-bold" onClick={(e) => handleClick(product)}> {product}</div>
                </div>
            </div>
        </div>
    );
};

const itemTemplate = (product) => {
     return GridItem(product);
};

const CategoryBoxes = () => {

    return(
        <div className="card">
            <DataView value={product} itemTemplate={itemTemplate} />
        </div>
    )

}

export default CategoryBoxes