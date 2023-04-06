
import React, { useState, useEffect, useRef, memo, FC } from 'react';
import { Button } from 'primereact/button';
import { Handle, Position, NodeResizer } from 'reactflow';
import 'reactflow/dist/style.css';

//{tableNumber, currOccupancy, capacity}
//                    stroke="#FF69B4" stroke-width="1"

    //adapted svg circle from https://codesandbox.io/s/svg-circle-forked-h3p9h6?file=/package.json adapted svg attributes https://www.geeksforgeeks.org/how-to-make-an-svg-scale-with-its-parent-container/
    const Table = ({data, selected}) => {
        return (
            <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={200} minHeight={200} maxHeight={200} maxWidth={200}  />
            <div className="tableNode">
`                <svg width="100%" height="100%" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r="100"
                            fill="#f794b6"
                        />
                        <text text-anchor="middle" x="50%" y="40%" fill="white" fontFamily="Montserrat" fontSize="2.3rem" fontWeight="bold" > Table {data.tableNumber}</text>
                        <text text-anchor="middle" x="50%" y="62%" fill="white" fontFamily="Montserrat" fontSize="1.5rem">{data.currOccupancy}/{data.capacity} </text> {/*center alignment credits to chatgpt*/}
                        <text text-anchor="middle" x="50%" y="80%" fill="white" fontFamily="Montserrat" fontSize="1.25rem"> occupied </text>
                </svg>`
            </div>

            </>
        );
    }

export default memo(Table);