import React, { useState, useEffect, useRef, useCallback, useMemo, memo, FC} from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar.jsx";
import ReactFlow, { MiniMap, Background, Controls, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, useReactFlow} from "reactflow";
import 'reactflow/dist/style.css';
import Table from './Table.jsx';
import OptionsPanel from "./OptionsPanel.jsx";
import GuestListPanel from './GuestListPanel.jsx';
import Api from './GuestListAPI.jsx';
import { Toast } from 'primereact/toast';
import TableApi from './TableApi.jsx';
import Stage from './Stage.jsx';
import { Routes, Route, useParams } from 'react-router-dom';

export default function TableLayout() {
    const renderCount = useRef(0);
    const countRender = useRef(0);
    useEffect(() => {
        countRender.current = 1;
    }, []);
    const toast = useRef(null);
    const [saveTablesFlag, setSaveTablesFlag] = useState(false);
    const [addStageFlag, setAddStageFlag] = useState(false);
    const [addTableFlag, setAddTableFlag] = useState(false);
    const [fullGuests, setFullGuests] = useState([]); //guests to select from
    const [selectedNode, setSelectedNode] = useState(null);
    const [guestsInSelectedNode, setGuestsInSelectedNode] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [updateGuest, setUpdateGuest] = useState(false);
    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
    }, []);
    const [deleteGuestFlag, setDeleteGuestFlag] = useState(false);
    const nodeTypes = useMemo(() => ({ table: Table, stage : Stage }), []);
    const onNodeClick = (event, node) => {
        if (node.type === 'table') {
            setSelectedNode(node);
            setGuestsInSelectedNode(node.data.guests);
        }
    };
    const [renderCountState, setRenderCountState] = useState(false);
    const [r, setRerender] = useState(false);
    const rerender= () => {
        setRerender(true);
    }
    const {projectId} = useParams();
    const deleteNodesAction = (deletedNodes) => {
        const _nodes = [];
        for (const node of nodes) {
            if (!deletedNodes.includes(node)) {
                _nodes.push(node);
            } 
        }
        let guestsInDeletedNode = [];
        for (const n of deletedNodes) {
            if (n.type === "table") {
                if (n.data.guests.length > 0) {
                    guestsInDeletedNode = guestsInDeletedNode.concat(n.data.guests);
                }
            }
        }
        setNodes((nds) => _nodes);
        setSelectedNode(null);
        setFullGuests((g) => g.concat(guestsInDeletedNode));
    };
    const saveTables = useCallback(() => {
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
        TableApi.updateTables(toSaveTables, projectId).then(response => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tables saved ' , life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to save tables ' , life: 3000 });
        }); 

        TableApi.updateStages(toSaveStages, projectId).then(response => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stages saved ' , life: 3000 });
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to save stages ' , life: 3000 });
        }); 
       // setUpdateGuest(!updateGuest);
    }, [saveTablesFlag]);
    useEffect(() => {     
        TableApi.getTables(projectId).then((response) => {
            return response.json();
        }).then((t) => {
            console.log(t);
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
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to load tables ' , life: 3000 });
            console.log(error);
        });
        TableApi.getStages(projectId).then((response) => {
            return response.json();
        }).then((t) => {
            const temp = [];
            for (const unit of t) {
                const {stageId, locationX, locationY, tableNumber, stageHeight, stageWidth} = unit;
                console.log(unit);
                temp.push({
                    id : '-' + stageId,
                    type : 'stage',
                    position: { x: locationX, y: locationY },
                    selected : false,
                    style: { width: stageWidth, height: stageHeight, backgroundColor : "rgb(242, 112, 156)"}, 
                    data: { tableNumber: tableNumber}
                })
            }
           setNodes((nodes) => nodes.concat(temp));  
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to load stages ' , life: 3000 });
            console.log(error);
        });    
    }, []); 
    useEffect(() => {
            Api.getAllGuests(projectId).then((response) => {
                return response.json();
            }).then((g) => {
                const candidate = [];
                 /*
                for (const table of nodes) {
                    if (table.type === 'table') {
                        for (const guest of table.data.guests) {
                            temp.add(guest.id);
                        }
                    }
                }
                for (const x of g) {
                    if (!temp.has(x.id)) {
                        candidate.push(x);
                    }
                } */ 
                for (const x of g) {
                    if (x.guestTable == null || x.guestTable == undefined) {
                        candidate.push(x);
                    }
                }
                setFullGuests(candidate);
                console.log(candidate.length + " is the length");
            }).catch(error => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to load guests ' , life: 3000 });
                console.log(error);
            });
    }, []);
    const deleteGuest = useCallback((toDelete) => {
        if (selectedNode != null && toDelete != null) {
            let _guests = [...selectedNode.data.guests];
            _guests = _guests.filter((guest) => guest.id !== toDelete.id);
            let _tables = [...nodes];
            _tables = _tables.filter(table => table.id != selectedNode.id);
            let newUpdatedTable = {...selectedNode};
            newUpdatedTable.data.guests = newUpdatedTable.data.guests.filter(guest => guest.id != toDelete.id);
            newUpdatedTable.data.currOccupancy = newUpdatedTable.data.currOccupancy - toDelete.numPax;
            setNodes(tables => _tables.concat(newUpdatedTable));
            setGuestsInSelectedNode((guests) => _guests);
            setSelectedNode(newUpdatedTable);
            setFullGuests(fg => fg.concat(toDelete));
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guest Removed', life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Guest Cannot be Removed', life: 3000 });
        }

    }, [deleteGuestFlag]);
    const handleAddToTable = useCallback((selectedGuests) => {
        if (selectedNode != null && selectedGuests != null) {
            const temp = (selectedNode.data.guests.length > 0 ? selectedNode.data.guests.map(g => g.numPax).reduce((x,y) => x + y) : 0)
                            + (selectedGuests.length > 0 ? selectedGuests.map(g => g.numPax).reduce((x,y) => x + y) : 0);
            if (temp > selectedNode.data.capacity) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Over capacity' , life: 3000 });
                
            } else {
                const updatedTable = {... selectedNode};
                const tempNode = nodes.filter(x => x.id === selectedNode.id);
                if (tempNode.length > 0) {
                    updatedTable.position.x = tempNode[0].position.x;
                    updatedTable.position.y = tempNode[0].position.y;
                }
                updatedTable.data.guests = updatedTable.data.guests.concat(selectedGuests);
                updatedTable.data.currOccupancy = (updatedTable.data.guests.length > 0) ? updatedTable.data.guests.map(g => g.numPax).reduce((x,y) => x + y) : 0;
                let _tables = [...nodes];
                _tables = _tables.filter(x => x.id != selectedNode.id).concat(updatedTable);
                setNodes((tables) => {
                    return _tables;
                });
                for (const guest of selectedGuests) {
                    for (const g of fullGuests) {
                        if (g.id === guest.id) {
                            setFullGuests((fullGuests) => fullGuests.filter(x => x.id != guest.id));
                        }
                    }
                }
                setGuestsInSelectedNode(g => updatedTable.data.guests);
                console.log(guestsInSelectedNode);
                setSelectedNode(updatedTable);
                if (temp.length > 0) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guests Added' , life: 3000 });
                }
            }
        }
    }, [updateGuest]);
    const handleAddTable = useCallback((capacity) => {
        if (capacity > 0) {
        let max = 0;
        for (const table of nodes) {
            //console.log(table.data.tableNumber);
            if (table.type === 'table') {
                if (max < table.data.tableNumber) {
                    max = table.data.tableNumber;
                }
            }
        }
        max = max + 1;
        const _table = 
        {
            currOccupancy : 0,
            locationX : 0,
            locationY : 0,
            tableNumber : max,
            capacity : capacity,
            tableSize : 200
        }
        TableApi.createTable(_table, projectId).then((response) => {
            if ( (response.status === 200)) {
               // console.log(response);
                response.json().then((idObject) => {
                    _table.id= idObject.GUESTID;
                    const toAdd = {
                        id : '' + _table.id,
                        type : 'table',
                        position: { x: _table.locationX, y: _table.locationY },
                        style: { width: _table.tableSize, height: _table.tableSize}, 
                        selected : true,
                        data: { tableNumber: _table.tableNumber, currOccupancy : _table.currOccupancy,  capacity : _table.capacity, guests : []}
                    };
                    //console.log("TO ADD " + toAdd);
                    //console.log(typeof setTables);
                    //setSelectedTable(toAdd);
                    setNodes((prevNodes) => prevNodes.concat(toAdd));
                    setSelectedNode(toAdd);
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Table Created', life: 3000 });
            } else {
                throw new Error();    
            }
        }).catch(error => {   
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to Create Table', life: 3000 });   
        }); 
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to Create Table: Invalid Capacity ', life: 3000 });  
        }
    }, [addTableFlag]);

    const handleAddStage = useCallback(() => {
        let max = 0;
        for (const node of nodes) {
            //console.log(table.data.tableNumber);
            if (node.type === 'stage') {
                if (max < node.data.tableNumber) {
                    max = node.data.tableNumber;
                }
            }
        }
        max = max + 1;
        const _stage = 
        {
            locationX : 0,
            locationY : 0,
            stageHeight : 225,
            stageWidth : 1500,
            tableNumber : max,
        }
        TableApi.createStage(_stage, projectId).then((response) => {
            if ( (response.status === 200)) {
               // console.log(response);
                response.json().then((idObject) => {
                    _stage.id= idObject.STAGEID;
                    const toAdd = {
                        id : '-' + _stage.id,
                        type : 'stage',
                        position: { x: _stage.locationX, y: _stage.locationY }, // backgroundImage : "linear-gradient(to right, rgb(242, 112, 156), rgb(255, 182, 193))"
                        style: { width: _stage.stageWidth, height: _stage.stageHeight, backgroundColor : "rgb(242, 112, 156)"}, //www.makeuseof.com/css-background-gradients/#pink-fish
                        selected : true,
                        data: { tableNumber: _stage.tableNumber}
                    };
                    setNodes((prevNodes) => prevNodes.concat(toAdd));
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stage Created', life: 3000 });
            } else {
                throw new Error();    
            }
        }).catch(error => {   
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to Create Stage', life: 3000 });   
        }); 
        
    }, [addStageFlag]);
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
                   <OptionsPanel addStageFlag={addStageFlag} setAddStageFlag={setAddStageFlag} addTableFlag={addTableFlag} 
                        setAddTableFlag={setAddTableFlag} saveTablesFlag={saveTablesFlag} setSaveTablesFlag={setSaveTablesFlag} handleAddStageParent={handleAddStage}
                        handleAddTableParent={handleAddTable} saveTablesParent={saveTables}></OptionsPanel> 
                    <GuestListPanel fullGuests={fullGuests} guestsInSelectedTable={guestsInSelectedNode} selectedNode={selectedNode} deleteGuestParent={deleteGuest} handleAddToTableParent={handleAddToTable} 
                            updateGuest={updateGuest} setUpdateGuest={setUpdateGuest} deleteGuestFlag={deleteGuestFlag} setDeleteGuestFlag={setDeleteGuestFlag}></GuestListPanel>     
           </ReactFlowProvider>
        </>
    );  
}
