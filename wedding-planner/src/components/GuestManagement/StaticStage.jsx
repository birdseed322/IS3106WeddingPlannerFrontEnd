import React, { useState, useEffect, useRef, memo, FC, useCallback} from 'react';
import { Button } from 'primereact/button';
import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

    const StaticStage = ({data, selected}) => {
        return (
            <>
                <div className="text-center align-items-center justify-content-center h-full w-full"> 
                    <h1 style={{color:"white", fontSize:"5rem", fontFamily: "'Segoe UI', Arial, sans-serif"}}>Stage</h1>
                </div>
           </>
        );
    }

export default memo(StaticStage);