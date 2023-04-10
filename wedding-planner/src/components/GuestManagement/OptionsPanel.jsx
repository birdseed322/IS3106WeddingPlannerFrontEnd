import React, { useState, useRef, useEffect, memo } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import './Guest.css';
import image from './src/image.jpg';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import TableApi from './TableApi.jsx';
import { Toast } from 'primereact/toast';
import 'reactflow/dist/style.css';
import { classNames } from 'primereact/utils';
import { Routes, Route, useParams } from 'react-router-dom';

function OptionsPanel({addStageFlag, setAddStageFlag, addTableFlag, setAddTableFlag, saveTablesFlag, setSaveTablesFlag, handleAddStageParent,
    handleAddTableParent, saveTablesParent}) {
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const renderCount = useRef(0);
    let items = [
        {label: 'New Table', icon: 'pi pi-fw pi-circle'},
        {label: 'New Stage', icon: 'pi pi-fw pi-box'}
    ];
    const [capacity, setCapacity] = useState(10);
    const saveTables = () => {
        setSaveTablesFlag(!saveTablesFlag);
    }
    useEffect(() => {
        if (renderCount.current < 3) {
            renderCount.current = renderCount.current + 1;
        } else {
            saveTablesParent();
        }
    }, [saveTablesParent]);
    const handleAddStage = () => {
        setAddStageFlag(!addStageFlag);
        setVisible(true);
    }
    useEffect(() => {
        if (renderCount.current < 3) {
            console.log(renderCount);
            renderCount.current = renderCount.current + 1;
        }  else {
            handleAddStageParent();
        }
        setVisible(false);
    }, [handleAddStageParent]);  
    const handleAddTable = () => {
        setAddTableFlag(!addTableFlag);
        setVisible(true);
    }
    useEffect(() => {
        if (renderCount.current < 3) {
            renderCount.current = renderCount.current + 1;
        } else {
            handleAddTableParent(capacity);
        }
        setVisible(false);
    }, [handleAddTableParent]);      
    return (
        <>
        <div className="card flex justify-content-center align-items-center">
            <Toast ref={toast} />

            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h3 className="m-0 mb-3">Options: New Table/Stage</h3>
                <div className="card flex text-align-center justify-content-center">
                    <span className="p-inputgroup-addon text-align-center" style={{minWidth : "7rem", backgroundColor : "white"}}> Table Capacity </span>
                    <InputNumber value={capacity} onValueChange={(e) => setCapacity(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}  min={1} max={100}
    decrementButtonClassName="pinkButton" incrementButtonClassName="pinkButton" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                </div>
                <div className="card flex justify-content-center text-align-center mt-3">
                    <Button className="pinkButton"  label="Add Table" onClick={handleAddTable} style={{ minWidth: '7rem' }} />
                </div>
                <div className="card flex justify-content-center text-align-center mt-7">
                    <Button className="pinkButton"  label="Add Stage" icon="pi pi-plus" onClick={handleAddStage} style={{ minWidth: '7rem' }} />
                </div> 
                <div className="card flex justify-content-center text-align-center">
                    <img src={image} style= {{maxWidth:"80%", maxHeight:"20%", marginTop:"5%"}}></img>
                </div>
            </Sidebar>
        </div>
                <Button className="pinkButton"  label="Options" icon="pi pi-plus" onClick={() => setVisible(true)  } style={{ minWidth: '7rem'}} />
                <Button className="pinkButton"  label="Save" icon="pi pi-save" onClick={saveTables} style={{ minWidth: '7rem', marginLeft : '1rem'}} />

        </>
    )
    //image credits to ivonne adams
}

export default memo(OptionsPanel);