import React, { useState, useEffect, useRef ,memo  } from 'react';
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
import 'reactflow/dist/style.css';
import { Routes, Route, useParams } from 'react-router-dom';

function GuestListPanel({setParentGuests, tables, setTables, selectedTable, setSelectedTable, updateGuest, setUpdateGuest}) { //guests and the selectedTable props are related
    const {projectId} = useParams();
    const toast = useRef(null);
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [fullGuests, setFullGuests] = useState([]); //guests to select from
    const [visible, setVisible] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState(null); //guests selected to be added to table
    const [toDelete, setToDelete] = useState(null); //guest to delete
    const [deleteGuestDialog, setDeleteGuestDialog] = useState(false);
    useEffect(() => {
        Api.getAllGuests(projectId).then((response) => {
            return response.json();
        }).then((g) => {
            console.log(g);
            const temp = new Set();
            const candidate = [];
            for (const table of tables) {
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
            }
            setFullGuests(candidate);
        }).catch(error => {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to load guests ' , life: 3000 });
            console.log(error);
        });
    }, [updateGuest]);
    const deleteGuest = () => {
        if (selectedTable != null) {
            let _guests = [...selectedTable.data.guests];
            _guests = _guests.filter((guest) => guest.id !== toDelete.id);
            let _tables = [...tables];
            _tables = _tables.filter(table => table.id != selectedTable.id);
            let newUpdatedTable = {...selectedTable};
            newUpdatedTable.data.guests = newUpdatedTable.data.guests.filter(guest => guest.id != toDelete.id);
            newUpdatedTable.data.currOccupancy = newUpdatedTable.data.currOccupancy - toDelete.numPax;
            setTables(tables => _tables.concat(newUpdatedTable));
            setParentGuests((guests) => _guests);
            setDeleteGuestDialog(false);
            setSelectedTable(newUpdatedTable);
            setFullGuests(fg => fg.concat(toDelete));
            setToDelete(null);
            setUpdateGuest(!updateGuest);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guest Removed', life: 3000 });
        } else {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Guest Cannot be Removed', life: 3000 });
        }

    };
    const handleAddToTable = () => {
        if (selectedTable != null && selectedGuests != null) {
            const temp = (selectedTable.data.guests.length > 0 ? selectedTable.data.guests.map(g => g.numPax).reduce((x,y) => x + y) : 0)
                            + (selectedGuests.length > 0 ? selectedGuests.map(g => g.numPax).reduce((x,y) => x + y) : 0);
            if (temp > selectedTable.data.capacity) {
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
                updatedTable.data.currOccupancy = (updatedTable.data.guests.length > 0) ? updatedTable.data.guests.map(g => g.numPax).reduce((x,y) => x + y) : 0;
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
                setSelectedTable(updatedTable);
                if (temp.length > 0) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guests Added' , life: 3000 });
                }
                setVisible(false);
            }
        }
        setUpdateGuest(!updateGuest);
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
    const confirmDeleteGuest = (guest) => {
        setToDelete(guest);
        setDeleteGuestDialog(true);
    };
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
    const hideDeleteGuestDialog = () => {
        setDeleteGuestDialog(false);
    };
    const deleteGuestDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGuestDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteGuest} />
        </React.Fragment>
    );
    

    const template = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };
        const conditionalTableLabel = selectedTable === null ? "No Table Selected" : selectedTable.type === 'table' ? 
             " for Table " + selectedTable.data.tableNumber : 
             "No Table Selected";
            
        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName} style={style}> Guest List {conditionalTableLabel} </span>
            </div>
        );
    };
    const doGuestSelection = () => setVisible(true);
    const actionBodyTemplate = (rowData) => {
        return <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteGuest(rowData)} />;
    }

    return (
        <span>
        <Toast ref={toast} />
        <Panel headerTemplate={template} style={{maxWidth:"60%", float:"right"}} toggleable>
            <Button label="Add Guest" onClick={doGuestSelection} style={{ backgroundColor: "#f561b0", border: "#f561b0", marginBottom:"1rem"}} />{" "}
            <DataTable value={selectedTable === null ? [] : selectedTable.data.guests} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="numPax" header="Number of Pax."></Column>
                <Column field="rsvp" header="RSVP status"></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
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
            <Dialog visible={deleteGuestDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGuestDialogFooter} onHide={hideDeleteGuestDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {toDelete && (
                        <span>
                            Are you sure you want to remove <b>{toDelete.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            </span>
    )
}
export default memo(GuestListPanel);