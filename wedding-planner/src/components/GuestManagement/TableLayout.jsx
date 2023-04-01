import React, { useState, useEffect, useRef, useCallback, useMemo, memo, FC} from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar.jsx";
import ReactFlow, { MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useReactFlow} from "reactflow";
import 'reactflow/dist/style.css';
import Table from './Table.jsx';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import OptionsPanel from "./OptionsPanel.jsx";
import {Button} from 'primereact/button';
import GuestListPanel from './GuestListPanel.jsx';
import Api from './GuestListAPI.jsx';
import { Toast } from 'primereact/toast';
import TableApi from './TableApi.jsx';


export default function TableLayout() {
    const toast = useRef(null);
    const changeFocus = () => {
    };
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [tableID, setTableID] = useState(null);
    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
    }, []);
    const nodeTypes = useMemo(() => ({ table: Table }), []);
    const onNodeClick = (event, node) => {
        setSelectedNode(node);
        setSelectedGuests(node.data.guests);
        console.log(node.data.guests);
    };
    const [r, setRerender] = useState(false);
    const rerender= () => {
        setRerender(true);
    }
    const weddingId = 1;
    useEffect(() => {     
        TableApi.getTables(weddingId).then((response) => {
            return response.json();
        }).then((t) => {
            const temp = [];
            for (const unit of t) {
                const {capacity, currOccupancy, guests, id, locationX, locationY, tableNumber, tableSize} = unit;
                
                temp.push({
                    id : '' + id,
                    type : 'table',
                    position: { x: locationX, y: locationY },
                    selected : false,
                    style: { width: tableSize, height: tableSize }, 
                    data: { tableNumber: tableNumber, currOccupancy : currOccupancy,  capacity : capacity, guests : guests}
                })
            }
           setNodes((nodes) => nodes.concat(temp));
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to load tables ' , life: 3000 });
            console.log(error);
        });
        
    }, []); 
    return (
        <>
            <HeartyNavbar></HeartyNavbar>
            <ReactFlowProvider>
                <OptionsPanel nodes={nodes} setTables={setNodes} changeFocus={changeFocus}></OptionsPanel>
                <GuestListPanel guests={selectedGuests} setParentGuests={setSelectedGuests} tables={nodes} setTables={setNodes} selectedTable={selectedNode}></GuestListPanel>
                <div style={{ height: '90%', width: '100%', position: "absolute", top:"10%", zIndex:"-1"}}>
                    <Toast ref={toast} />
                        <ReactFlow
                            nodeTypes={nodeTypes}
                            nodes={nodes}
                            onNodesChange={onNodesChange}
                            minZoom={0.3}
                            maxZoom={2}
                            onNodeClick={onNodeClick}
                            onNodeDragStart={onNodeClick}      
                            onSelectionDrag={onNodeClick}
                            onMouseMove={rerender}
                            fitView
                        >                    
                        <Background />
                            <Controls />
                        </ReactFlow>
                    </div>

            </ReactFlowProvider>
        </>
    );
}
