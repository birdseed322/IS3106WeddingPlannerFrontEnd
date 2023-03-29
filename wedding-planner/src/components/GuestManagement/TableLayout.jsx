import React, { useState, useEffect, useRef, useCallback, useMemo, memo, FC} from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar.jsx";
import ReactFlow, { MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges } from "reactflow";
import 'reactflow/dist/style.css';
import Table from './Table.jsx';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import OptionsPanel from "./OptionsPanel.jsx";
import {Button} from 'primereact/button';
import GuestListPanel from './GuestListPanel.jsx';
export default function TableLayout() {
    const [nodeID, setSelectedNodeID] = useState(null);
    const [guestList, setGuestList] = useState([]);
    const initialNodes = [
        { id: 'node-1', type: 'table', position: { x: 0, y: 0 },  selected: true,
        style: { width: 200, height: 200 }, data: { tableNumber: 10, currOccupancy : 9,  capacity : 10} },
      ];
    const [nodes, setNodes] = useState(initialNodes);
    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const nodeTypes = useMemo(() => ({ table: Table }), []);
    const onNodeClick = (event, node) => {
        setSelectedNodeID(node.id);
        console.log(node.id);
    };
    return (
        <>
            <HeartyNavbar></HeartyNavbar>
            <OptionsPanel></OptionsPanel>
            <span><GuestListPanel guests={guestList}></GuestListPanel></span>
            <div style={{ height: '90%', width: '100%', position: "absolute", top:"10%", zIndex:"-1"}}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    minZoom={0.3}
                    maxZoom={2}
                    onNodeClick={onNodeClick}
                    fitView
                >                    
                <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}
