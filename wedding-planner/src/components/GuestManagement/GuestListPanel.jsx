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

function GuestListPanel({fullGuests, guestsInSelectedTable, selectedNode, deleteGuestParent, handleAddToTableParent, updateGuest, setUpdateGuest, deleteGuestFlag, setDeleteGuestFlag}) { //guests and the selectedTable props are related
    const {projectId} = useParams();
    const toast = useRef(null);
    const dt = useRef(null);
    const renderCount = useRef(0);
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [visible, setVisible] = useState(false);
    const [toDelete, setToDelete] = useState(null); //guest to delete
    const [deleteGuestDialog, setDeleteGuestDialog] = useState(false);
    const deleteGuest = () => {
            setDeleteGuestFlag(!deleteGuestFlag);
            setDeleteGuestDialog(false);
    };
    const handleAddToTable = () => {
        setUpdateGuest(!updateGuest);
        setVisible(false);
    }
    useEffect(() => {
        if (renderCount.current < 2) {
            renderCount.current = renderCount.current + 1;
            console.log(renderCount);
        } else {
            handleAddToTableParent(selectedGuests);
            setSelectedGuests([]);
        }
    }, [handleAddToTableParent])
    useEffect(() =>  {
        if (renderCount.current < 2) {
            renderCount.current = renderCount.current + 1;
        } else {
            deleteGuestParent(toDelete);
        }
        setToDelete(null);
    }, [deleteGuestParent]);

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
        const conditionalTableLabel = selectedNode === null ? "No Table Selected" : selectedNode.type === 'table' ? 
             " for Table " + selectedNode.data.tableNumber : 
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
            <p className="m-1 text-xs">*Select table and press backspace to delete table</p>

            <DataTable value={selectedNode === null ? [] : guestsInSelectedTable} showGridlines tableStyle={{ minWidth: '50rem' }}>
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