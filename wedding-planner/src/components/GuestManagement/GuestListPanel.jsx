import React from 'react'; 
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function GuestListPanel() {
    const products = []
    const template = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };

        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName} style={style}>Guest List </span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} style={{maxWidth:"50%", float:"right"}} toggleable>
            <Button label="Add Guest" style={{ backgroundColor: "#f561b0", border: "#f561b0"}} />{" "}
            <DataTable value={products} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="numPax" header="Number of Pax."></Column>
                <Column field="rsvp" header="RSVP status"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
         
        </Panel>
    )
}