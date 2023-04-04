import React, { useState, useEffect, useRef, memo, FC, useCallback} from 'react';
import { Button } from 'primereact/button';
import { Handle, Position, NodeResizer } from 'reactflow';
import 'reactflow/dist/style.css';

    const Stage = ({data, selected}) => {
        return (
            <>
                <div className="text-center align-items-center justify-content-center"> 
                    <NodeResizer color="#ff0071" isVisible={selected} minWidth={600} minHeight={100} maxWidth={2000} maxHeight={200}/>
                </div>
           </>
        );
    }

export default memo(Stage);