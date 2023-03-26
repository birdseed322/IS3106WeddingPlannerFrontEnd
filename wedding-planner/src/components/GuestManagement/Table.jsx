
import React, { useState, useEffect, useRef } from 'react';


//{tableNumber, currOccupancy, capacity}
//                    stroke="#FF69B4" stroke-width="1"
export default function Table() {
    const tableNumber = 1;
    const currOccupancy = 9;
    const capacity = 10;
    //adapted svg circle from https://codesandbox.io/s/svg-circle-forked-h3p9h6?file=/package.json
    return (
        <div className="tableNode">
            <svg height="200" width="200">
                <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="#FBE3E8"
                />
                <text class="label1" x="65" y="90" fill="black" font-family="Optima" font-size="20px" font-weight="bold" > Table {tableNumber}</text>
                <text class="label1" x="77" y="130" fill="black" font-family="Optima" font-size="20px">{currOccupancy}/{capacity}</text>
            </svg>
        </div>
    );
}