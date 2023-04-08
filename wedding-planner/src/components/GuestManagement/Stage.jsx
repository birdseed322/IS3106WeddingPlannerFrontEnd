import React, { useState, useEffect, useRef, memo, FC, useCallback} from 'react';
import { Button } from 'primereact/button';
import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import stage from './src/stage.png';
    const Stage = ({data, selected}) => {
        return (
            <>
                <div className="text-center align-items-center justify-content-center h-full w-full"> 
                    <h1 style={{color:"white", fontSize:"5rem"}}>Stage</h1>
                </div>
           </>
        );
    }

export default memo(Stage);