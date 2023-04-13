import React, {useState, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';
import TableLayout from './TableLayout.jsx';
import Table from './Table.jsx';
import ReactFlow, { MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useStoreApi, useReactFlow} from "reactflow";
export default function MainTable() {

    return (
        <ErrorBoundary>
            <ReactFlowProvider>    
                <TableLayout></TableLayout>
            </ReactFlowProvider>
        </ErrorBoundary>
    )
}
