import React, { useState, useEffect, useRef, useCallback, useMemo, memo, FC} from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar.jsx";
import ReactFlow, { MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges } from "reactflow";
import 'reactflow/dist/style.css';
import Table from './Table.jsx';
import GuestListPanel from './OptionsPanel.jsx';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import OptionsPanel from "./OptionsPanel.jsx";
import {Button} from 'primereact/button';
export default function TableLayout() {
    const initialNodes = [
        { id: 'node-1', type: 'table', position: { x: 0, y: 0 }, data: { tableNumber: 10, currOccupancy : 9,  capacity : 10} },
      ];
    const [nodes, setNodes] = useState(initialNodes);
    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const nodeTypes = useMemo(() => ({ table: Table }), []);
    
    return (
        <>
            <HeartyNavbar></HeartyNavbar>
            <OptionsPanel></OptionsPanel>
            <div style={{ height: '675px', width: '100%', position: "fixed" }}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    minZoom={0.3}
                    maxZoom={2}
                    fitView
                >                    
                <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
