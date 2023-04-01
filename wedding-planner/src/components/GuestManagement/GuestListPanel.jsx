import React, { useState, useEffect, useRef } from 'react';
import ReactFlow, { useNodes } from 'reactflow';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar.jsx';
import Api from './GuestListAPI.jsx';
import { Toast } from 'primereact/toast';

export default function GuestListPanel({guests, setParentGuests, tables, setTables, selectedTable}) {
    const weddingId = 1;
    const toast = useRef(null);
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [fullGuests, setFullGuests] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState(null);
    const handleAddToTable = () => {
        console.log("selected table " + selectedTable);
        console.log("selected guest" + selectedGuests);
        if (selectedTable != null && selectedGuests != null) {
            if (selectedTable.data.guests.length + selectedGuests.length > selectedTable.data.capacity) {
                setVisible(false);
                toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Over capacity' , life: 3000 });
            } else {
                const nodes = [...tables];
                const updatedTable = {... selectedTable};
                const tempNode = nodes.filter(x => x.id === selectedTable.id);
                if (tempNode.length > 0) {
                    updatedTable.position.x = tempNode[0].position.x;
                    updatedTable.position.y = tempNode[0].position.y;
                }
                updatedTable.data.guests = updatedTable.data.guests.concat(selectedGuests);
                updatedTable.data.currOccupancy = updatedTable.data.guests.length;
                let _tables = [...tables];
                _tables = _tables.filter(x => x.id != selectedTable.id).concat(updatedTable);
                setTables((tables) => {
                    return _tables;
                });
                for (const guest of selectedGuests) {
                    for (const g of fullGuests) {
                        if (g.id === guest.id) {
                            setFullGuests((fullGuests) => fullGuests.filter(x => x.id != guest.id));
                        }
                    }
                }
                setSelectedGuests([]);
                setParentGuests(g => updatedTable.data.guests);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guests Added' , life: 3000 });
                setVisible(false);
            }
        }
    }
    const footerContent = (
        <div className="card flex justify-content-center">
            <Button label="Add to Table" icon="pi pi-check" onClick={handleAddToTable} autoFocus />
        </div>
    );
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h3 className="m-0">Manage Guests</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.rsvp} severity={getSeverity(rowData)}></Tag>;
    };
    const getSeverity = (guest) => {
        switch (guest.rsvp) {
            case 'CONFIRMED':
                return 'success';

            case 'PENDING':
                return 'warning';

            case 'NOTATTENDING':
                return 'danger';

            default:
                return 'warning';
        }
    };
    useEffect(() => {
        Api.getAllGuests(weddingId).then((response) => {
            return response.json();
        }).then((g) => {
            const temp = new Set();
            const candidate = [];
            for (const table of tables) {
                for (const guest of table.data.guests) {
                    temp.add(guest.id);
                }
            }
            for (const x of g) {
                if (!temp.has(x.id)) {
                    candidate.push(x);
                }
            }
            setFullGuests(candidate);
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to load guests ' , life: 3000 });
            console.log(error);
        });
    }, []);
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
    const doGuestSelection =() => setVisible(true);
    

    return (
        <span>
        <Toast ref={toast} />
        <Panel headerTemplate={template} style={{maxWidth:"60%", float:"right"}} toggleable>
            <Button label="Add Guest" onClick={doGuestSelection} style={{ backgroundColor: "#f561b0", border: "#f561b0"}} />{" "}
            <DataTable value={guests} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="numPax" header="Number of Pax."></Column>
                <Column field="rsvp" header="RSVP status"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
         
        </Panel>
          <Dialog header="Guests Selection" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <DataTable ref={dt} value={fullGuests} selection={selectedGuests} onSelectionChange={(e) => setSelectedGuests(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} guests" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="numPax" header="Number of Pax" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rsvp" header="RSVP Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </Dialog>
            </span>
    )
}