import React, { useState, useEffect, useRef, memo, FC, useCallback} from 'react';
import { Button } from 'primereact/button';
import { Handle, Position, NodeResizer } from 'reactflow';
import 'reactflow/dist/style.css';
import stage from './src/stage.png';
    const Stage = ({data, selected}) => {
        return (
            <>
                <div className="text-center align-items-center justify-content-center"> 
                </div>
           </>
        );
    }

export default memo(Stage);