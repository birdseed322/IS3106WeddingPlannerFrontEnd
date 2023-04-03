import React, { useState, useEffect, useRef, memo, FC } from 'react';
import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Button } from 'primereact/button';
import '@reactflow/node-resizer/dist/style.css';
import 'reactflow/dist/style.css';
    const Stage = ({data, selected}) => {
        return (
            <>
                <div className="text-center align-items-center justify-content-center"> 
                    <NodeResizer color="#ff0071" isVisible={selected} minWidth={300} minHeight={100} maxWidth={2000} maxHeight={400}/>
                </div>
           </>
        );
    }

export default memo(Stage);