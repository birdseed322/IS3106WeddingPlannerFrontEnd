import React, { useState, useEffect, useRef, useCallback, useMemo, memo, FC} from "react";
import { useParams } from 'react-router-dom';
import ReactFlow, {  Background, Controls, applyNodeChanges, ReactFlowProvider} from "reactflow";
import 'reactflow/dist/style.css';
import Table from './Table.jsx';
import { Toast } from 'primereact/toast';
import TableApi from './TableApi.jsx';
import Stage from './Stage.jsx';
import GuestViewNavbar from "../HeartyNavbar/GuestViewNavbar.jsx";
import AssignedTable from "./AssignedTable.jsx";
import { classNames } from 'primereact/utils';
import GuestQuery from "./GuestQuery.jsx";
export default function GuestView() {
    const toast = useRef(null);
    const {weddingId} = useParams();
    const guestId = sessionStorage.getItem("guestId");
    const [nodes, setNodes] = useState([]);
    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
    }, []);
    const nodeTypes = useMemo(() => ({ table: Table, stage : Stage, assignedTable : AssignedTable}), []);
    useEffect(() => {     
        TableApi.getTables(weddingId).then((response) => {
            return response.json();
        }).then((t) => {
            const temp = [];
            for (const unit of t) {
                const {capacity, currOccupancy, guests, id, locationX, locationY, tableNumber, tableSize} = unit;
                if (guests.map(g => g.id).filter(x => x == guestId).length <= 0) {
                    temp.push({
                        id : '' + id,
                        type : 'table',
                        position: { x: locationX, y: locationY },
                        selected : false,
                        style: { width: tableSize, height: tableSize }, 
                        data: { tableNumber: tableNumber, currOccupancy : currOccupancy,  capacity : capacity, guests : guests}
                    });
                } else {       
                    temp.push({
                        id : '' + id,
                        type : 'assignedTable',
                        position: { x: locationX, y: locationY },
                        selected : false,
                        style: { width: tableSize, height: tableSize }, 
                        data: { tableNumber: tableNumber, currOccupancy : currOccupancy,  capacity : capacity, guests : guests}
                    });       
                }
            }
           setNodes((nodes) => nodes.concat(temp));

        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to load tables ' , life: 3000 });
            console.log(error);
        });
        TableApi.getStages(weddingId).then((response) => {
            console.log(response);
            return response.json();
        }).then((t) => {
            const temp = [];
            console.log("HERE");
            for (const unit of t) {
                const {stageId, locationX, locationY, tableNumber, stageHeight, stageWidth} = unit;
                console.log(stageId);
                temp.push({
                    id : '' + stageId,
                    type : 'stage',
                    position: { x: locationX, y: locationY },
                    selected : false,
                    style: { width: stageWidth, height: stageHeight, backgroundColor : "rgb(242, 112, 156)"}, 
                    data: { tableNumber: tableNumber}
                })
            }
           setNodes((nodes) => nodes.concat(temp));
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to load stages ' , life: 3000 });
            console.log(error);
        });
        
    }, []); 
    if (sessionStorage.getItem("guestId") != null) {
            return (
            <>
                <GuestViewNavbar></GuestViewNavbar>
                <Toast ref={toast} />
                <ReactFlowProvider>    
                    <div style={{ height: '90%', width: '100%', position: "absolute", top:"10%", zIndex:"-1"}}>
                            <ReactFlow
                                nodeTypes={nodeTypes}
                                nodes={nodes}
                                onNodesChange={onNodesChange}
                                minZoom={0.1}
                                maxZoom={1.5}
                                nodesDraggable={false}
                                fitView
                            >                    
                            <Background />
                                <Controls />
                            </ReactFlow>
                        </div>
            </ReactFlowProvider>
            </>
        );  
        } else {
            return <GuestQuery></GuestQuery>
        }
}
