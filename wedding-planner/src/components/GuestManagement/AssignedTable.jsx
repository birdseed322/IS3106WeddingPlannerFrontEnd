
import React, { useState, useEffect, useRef, memo, FC } from 'react';
import { Button } from 'primereact/button';
import { Handle, Position, NodeResizer } from 'reactflow';
import 'reactflow/dist/style.css';
import table from './src/table.png';
//{tableNumber, currOccupancy, capacity}
//                    stroke="#FF69B4" stroke-width="1"

    //adapted svg circle from https://codesandbox.io/s/svg-circle-forked-h3p9h6?file=/package.json adapted svg attributes https://www.geeksforgeeks.org/how-to-make-an-svg-scale-with-its-parent-container/
    const AssignedTable = ({data, selected}) => {
        return (
            <>
            <div className="inline-block text-center">
                <img className="z-1" src={table} height="200px" width="200px"></img>
                <h2 className="inline-block mt-8 z-5 absolute m-auto left-0 right-0">Table {data.tableNumber}</h2>
                <h3 style={{marginTop:"7.5rem"}} className="absolute inline-block z-5 left-0 right-0">{data.currOccupancy} / {data.capacity}</h3>
                <h3 style={{marginTop:"1rem"}}>YOUR TABLE</h3>
            </div>
            </>
        );
    }

export default memo(AssignedTable);