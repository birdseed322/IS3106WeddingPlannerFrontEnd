import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import './Guest.css';
import image from './src/image.jpg';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import TableApi from './TableApi.jsx';
import { Toast } from 'primereact/toast';

export default function OptionsPanel({nodes, setNodes, changeFocus, saveTables, setSelectedTable}) {
    const toast = useRef(null);
    const weddingId = 1;
    const [visible, setVisible] = useState(false);
    let items = [
        {label: 'New Table', icon: 'pi pi-fw pi-circle'},
        {label: 'New Stage', icon: 'pi pi-fw pi-box'}
    ];
    const [capacity, setCapacity] = useState(10);
    const handleAddTable = () => {
        setVisible(true);
        let max = 0;
        console.log("node length" + nodes.length);
        for (const table of nodes) {
            //console.log(table.data.tableNumber);
            if (max < table.data.tableNumber) {
                max = table.data.tableNumber;
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
        TableApi.createTable(_table, weddingId).then((response) => {
            if ( (response.status === 200)) {
               // console.log(response);
                response.json().then((idObject) => {
                    _table.id= idObject.GUESTID;
                    const toAdd = {
                        id : '' + _table.id,
                        type : 'table',
                        position: { x: _table.locationX, y: _table.locationY },
                        style: { width: _table.tableSize, height: _table.tableSize }, 
                        selected : true,
                        data: { tableNumber: _table.tableNumber, currOccupancy : _table.currOccupancy,  capacity : _table.capacity, guests : []}
                    };
                    //console.log("TO ADD " + toAdd);
                    //console.log(typeof setTables);
                    //setSelectedTable(toAdd);
                    setNodes((prevNodes) => prevNodes.concat(toAdd));
                    setSelectedTable(toAdd);
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Table Created', life: 3000 });
            } else {
                throw new Error();    
            }
        }).catch(error => {   
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to Create Table', life: 3000 });   
        }); 
        
    };
    const handleSave = () => {
        saveTables();
    }
    /*
    const handleAddStage = () => {
        setVisible(true);
        let max = 0;
        //console.log("node length" + nodes.length);
        for (const node of nodes) { 
            console.log(node.data.tableNumber);
            if (max < node.data.tableNumber) {
                max = node.data.tableNumber;
            }
        }
        max = max + 1; /*
        const testStage =  {   id : '100',
        type : 'stage',
        position: { x: 100, y: 100 },
        selected : false,
        style: { width: 600, height: 300, border:'1px solid black', background: '#fff'}, 
        } 
        const _stage = 
        {
            locationX : 0,
            locationY : 0,
            tableNumber : max,
            stageHeight : 300,
            stageWidth : 600
        }
        TableApi.createStage(_stage, weddingId).then((response) => {
            if ( (response.status === 200)) {
               // console.log(response);
                response.json().then((idObject) => {
                    _stage.id= idObject.STAGEID;
                    const toAdd = {
                        id : '' + _stage.id,
                        type : 'stage',
                        position: { x: _stage.locationX, y: _stage.locationY },
                        style: { width: _stage.stageWidth, height: _stage.stageHeight }, 
                        selected : true,
                        data: { tableNumber: _stage.tableNumber}
                    };
                    //console.log("TO ADD " + toAdd);
                    //console.log(typeof setTables);
                    //setSelectedTable(toAdd);
                    setNodes((prevNodes) => prevNodes.concat(toAdd));
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stage Created', life: 3000 });
            } else {
                throw new Error();    
            }
        }).catch(error => {   
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to Create Stage', life: 3000 });   
        });         
    }
    */
    return (
        <>
        <div className="card flex justify-content-center align-items-center">
            <Toast ref={toast} />

            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h3 className="m-0 mb-3">Options: New Table/Stage</h3>
                <div className="card flex text-align-center">
                    <span className="p-inputgroup-addon max-w-30rem text-align-center"> Table Capacity </span>
                    <InputText className="max-w-10rem" placeholder="Enter Pax" value={capacity} onChange={(e) => setCapacity(e.target.value)}/> 
                </div>
                <div className="card flex justify-content-center text-align-center mt-3">
                    <Button className="pinkButton"  label="Add Table" icon="pi pi-plus" onClick={handleAddTable} style={{ minWidth: '7rem' }} />
                </div>
                <div className="card flex justify-content-center text-align-center mt-8">
                    <Button className="pinkButton"  label="Add Stage" icon="pi pi-plus" style={{ minWidth: '7rem' }} />
                </div> 
                <div className="card flex justify-content-center text-align-center">
                    <img src={image} style= {{maxWidth:"100%", maxHeight:"40%", marginTop:"10%"}}></img>
                </div>
            </Sidebar>
        </div>
                <Button className="pinkButton"  label="Options" icon="pi pi-plus" onClick={() => setVisible(true)  } style={{ minWidth: '7rem'}} />
                <Button className="pinkButton"  label="Save" icon="pi pi-save" onClick={handleSave} style={{ minWidth: '7rem', marginLeft : '1rem'}} />

        </>
    )
    //image credits to ivonne adams
}
         