import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import './Guest.css';
import image from './image.jpg';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
export default function OptionsPanel() {
    const [visible, setVisible] = useState(false);
    let items = [
        {label: 'New Table', icon: 'pi pi-fw pi-circle'},
        {label: 'New Stage', icon: 'pi pi-fw pi-box'}
    ];
    const [tableSize, setTableSize] = useState(10);
    return (
        <>
        <div className="card flex justify-content-center align-items-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h3 className="m-0 mb-3">Options: New Table/Stage</h3>
                <div className="card flex text-align-center">
                    <span className="p-inputgroup-addon max-w-30rem text-align-center"> Table Capacity </span>
                    <InputText className="max-w-10rem" placeholder="Enter Pax (max. 25)" value={tableSize} onChange={(e) => setTableSize(e.target.value)}/> 
                </div>
                <div className="card flex justify-content-center text-align-center mt-3">
                    <Button className="pinkButton"  label="Add Table" icon="pi pi-plus" onClick={() => setVisible(true)  } style={{ minWidth: '7rem' }} />
                </div>
                <div className="card flex justify-content-center text-align-center mt-8">
                    <Button className="pinkButton"  label="Add Stage" icon="pi pi-plus" onClick={() => setVisible(true)  } style={{ minWidth: '7rem' }} />
                </div> 
                <div className="card flex justify-content-center text-align-center">
                    <img src={image} style= {{maxWidth:"100%", maxHeight:"40%", marginTop:"10%"}}></img>
                </div>
            </Sidebar>
        </div>
                <Button className="pinkButton"  label="Options" icon="pi pi-plus" onClick={() => setVisible(true)  } style={{ minWidth: '7rem'}} />
        </>
    )
    //image credits to ivonne adams
}
         