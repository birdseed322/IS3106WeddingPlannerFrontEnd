import React, { useState, useEffect, useRef, memo, FC, useCallback} from 'react';
import { Button } from 'primereact/button';
import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import stage from './src/stage.png';
import {NodeResizer} from 'reactflow';

    const Stage = ({data, selected}) => {
        return (
            <>
                  <NodeResizer minWidth={500} minHeight={150} maxWidth={2000} maxHeight={1000}/>
                <div className="text-center align-items-center justify-content-center h-full w-full"> 
                    <h1 style={{color:"white", fontSize:"5rem", fontFamily: "'Segoe UI', Arial, sans-serif"}}>Stage</h1>
                </div>
           </>
        );
    }

export default memo(Stage);