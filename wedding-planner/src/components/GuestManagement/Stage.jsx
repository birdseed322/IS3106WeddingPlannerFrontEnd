import React, { useState, useEffect, useRef, memo, FC, useCallback} from 'react';
import { Button } from 'primereact/button';
import { Handle, Position, NodeResizer } from 'reactflow';
import 'reactflow/dist/style.css';

    const Stage = ({data, selected}) => {
        return (
            <>
                <div className="text-center align-items-center justify-content-center"> 
                    {/*<NodeResizer color="#ff0071" isVisible={selected} minWidth={225} minHeight={1500} maxWidth={225} maxHeight={1500}/>*/}
                </div>
           </>
        );
    }

export default memo(Stage);