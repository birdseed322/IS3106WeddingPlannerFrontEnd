
import React, { useState, useEffect, useRef, memo, FC } from 'react';
import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Button } from 'primereact/button';
import '@reactflow/node-resizer/dist/style.css';
//{tableNumber, currOccupancy, capacity}
//                    stroke="#FF69B4" stroke-width="1"

    //adapted svg circle from https://codesandbox.io/s/svg-circle-forked-h3p9h6?file=/package.json
    //adapted svg attributes https://www.geeksforgeeks.org/how-to-make-an-svg-scale-with-its-parent-container/
    const Table = ({data, selected}) => {
        return (
            <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={200} minHeight={200} keepAspectRatio={true} />
            <div className="tableNode">
`                <svg width="100%" height="auto" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="#FBE3E8"
                        />
                        <text class="label1" x="65" y="80" fill="black" font-family="Optima" font-size="20px" font-weight="bold" > Table {data.tableNumber}</text>
                        <text class="label1" x="80" y="125" fill="black" font-family="Optima" font-size="20px">{data.currOccupancy}/{data.capacity} </text>
                        <text class="label1" x="73" y="150" fill="black" font-family="Optima" font-size="15px"> occupied </text>

                </svg>`
            </div>

            </>
        );
    }

export default memo(Table);