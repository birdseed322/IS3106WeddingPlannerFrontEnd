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
import Stage from './Stage.jsx';

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
    const nodeTypes = useMemo(() => ({ table: Table, stage : Stage }), []);
    const onNodeClick = (event, node) => {
        if (node.type === 'table') {
            setSelectedNode(node);
            setSelectedGuests(node.data.guests);
        }
    };
    const [r, setRerender] = useState(false);
    const rerender= () => {
        setRerender(true);
    }
    const weddingId = 1;
    const deleteNodesAction = (deletedNodes) => {
        const _nodes = [];
        for (const node of nodes) {
            if (!deletedNodes.includes(node)) {
                _nodes.push(node);
            }
        }
        setNodes((nds) => _nodes);
        setSelectedNode(null);
    };
    const saveTables = () => {
        const toSaveTables = [];
        const toSaveStages = [];
        for (const node of nodes) {
            if (node.type === 'table') {
                toSaveTables.push({
                    capacity : node.data.capacity,
                    id : node.id,
                    currOccupancy : (node.data.guests.length > 0 ? node.data.guests.map(x => x.numPax).reduce((x,y) => x + y) : 0),
                    guests : node.data.guests,
                    locationX : node.position.x,
                    locationY : node.position.y,
                    tableNumber : node.data.tableNumber,
                    tableSize : node.style.height
                });
            } else if (node.type === 'stage') {
                toSaveStages.push({
                    id : parseInt(node.id.substring(1)),
                    locationX : node.position.x,
                    locationY : node.position.y,
                    tableNumber : node.data.tableNumber,
                    stageHeight : node.style.height,
                    stageWidth : node.style.width
                });
            }
        }
        TableApi.updateTables(toSaveTables, weddingId).then(response => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tables saved ' , life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to save tables ' , life: 3000 });
        }); 

        TableApi.updateStages(toSaveStages, weddingId).then(response => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stages saved ' , life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to save stages ' , life: 3000 });
        }); 
    }
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
        TableApi.getStages(weddingId).then((response) => {
            return response.json();
        }).then((t) => {
            const temp = [];
            for (const unit of t) {
                const {id, locationX, locationY, tableNumber, stageHeight, stageWidth} = unit;
                temp.push({
                    id : '' + id,
                    type : 'stage',
                    position: { x: locationX, y: locationY },
                    selected : false,
                    style: { width: stageWidth, height: stageHeight, backgroundImage : "linear-gradient(to right, rgb(242, 112, 156), rgb(255, 182, 193))"}, 
                    data: { tableNumber: tableNumber}
                })
            }
           setNodes((nodes) => nodes.concat(temp));
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to load stages ' , life: 3000 });
            console.log(error);
        });
        
    }, []); 
        return (
        <>
            <HeartyNavbar></HeartyNavbar>
            <Toast ref={toast} />
            <ReactFlowProvider>    
                <div style={{ height: '90%', width: '100%', position: "absolute", top:"10%", zIndex:"-1"}}>
                        <ReactFlow
                            nodeTypes={nodeTypes}
                            nodes={nodes}
                            onNodesChange={onNodesChange}
                            minZoom={0.1}
                            maxZoom={1.5}
                            onNodeClick={onNodeClick}
                            onNodeDragStart={onNodeClick}      
                            onNodesDelete={deleteNodesAction}
                            fitView
                        >                    
                        <Background />
                            <Controls />
                        </ReactFlow>
                    </div>
                    <OptionsPanel nodes={nodes} setNodes={setNodes} changeFocus={changeFocus} saveTables={saveTables} setSelectedTable={setSelectedNode}></OptionsPanel>
                    <GuestListPanel setParentGuests={setSelectedGuests} tables={nodes} setTables={setNodes} selectedTable={selectedNode} setSelectedTable={setSelectedNode}></GuestListPanel>     
           </ReactFlowProvider>
        </>
    );  
}
