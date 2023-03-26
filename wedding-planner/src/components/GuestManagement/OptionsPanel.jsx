import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import './Guest.css';
import image from './image.jpg';
export default function OptionsPanel() {
    const [visible, setVisible] = useState(false);
    let items = [
        {label: 'New Table', icon: 'pi pi-fw pi-circle'},
        {label: 'New Stage', icon: 'pi pi-fw pi-box'}
    ];
    return (
        <>
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <Menu model={items} />
                <img src={image} style= {{maxWidth:"100%", marginTop:"10%"}}></img>
            </Sidebar>
        </div>
        <Button className="pinkButton"  label="Options" icon="pi pi-plus" onClick={() => setVisible(true)  } style={{ minWidth: '7rem' }} />

        </>
    )
    //image credits to ivonne adams
}
         