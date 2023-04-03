import React, { useState, useEffect, useRef, memo, FC } from 'react';
import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Button } from 'primereact/button';
import '@reactflow/node-resizer/dist/style.css';
import 'reactflow/dist/style.css';

//{tableNumber, currOccupancy, capacity}
//                    stroke="#FF69B4" stroke-width="1"

    //adapted svg circle from https://codesandbox.io/s/svg-circle-forked-h3p9h6?file=/package.json adapted svg attributes https://www.geeksforgeeks.org/how-to-make-an-svg-scale-with-its-parent-container/
    const Stage = ({data, selected}) => {
        return (
            <>
                <div align='center'> 
                    <NodeResizer color="#ff0071" isVisible={selected} minWidth={300} minHeight={100} maxWidth={1200} maxHeight={400}/>
                    <h1 align='center'> Stage </h1>
                </div>
           </>
        );
    }

export default memo(Stage);