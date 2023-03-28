import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar.jsx';
import Api from './GuestListAPI.jsx';
export default function GuestList() {
    let emptyGuest = {
        id: null,
        name: '',
        email: '',
        attendingSide: null,
        numPax: 1,
        rsvp: 'NOTSENT'
    };

    const [guests, setGuests] = useState([]);
    const [guestDialog, setGuestDialog] = useState(false);
    const [deleteGuestDialog, setDeleteGuestDialog] = useState(false);
    const [deleteGuestsDialog, setDeleteGuestsDialog] = useState(false);
    const [sendInvitesDialog, setSendInvitesDialog] = useState(false);
    const [guest, setGuest] = useState(emptyGuest);
    const [selectedGuests, setSelectedGuests] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    /*
    useEffect(() => {
        ProductService.getProducts().then((data) => setGuests(data));
    }, []);
    */



    const openNew = () => {
        setGuest(emptyGuest);
        setSubmitted(false);
        setGuestDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setGuestDialog(false);
    };

    const hideDeleteGuestDialog = () => {
        setDeleteGuestDialog(false);
    };

    const hideDeleteGuestsDialog = () => {
        setDeleteGuestsDialog(false);
    };

    const hideSendInvitesDialog = () => {
        setSendInvitesDialog(false);
    }
    const validateGuest = (g) => {
        return g.name.trim().length > 0 && g.email.length > 0;
    }
    const saveGuest = () => {
        setSubmitted(true);
        if (guest.name.trim()) {
            let _guests = [...guests];
            let _guest = { ...guest };

            if (guest.id) {
                const index = findIndexById(guest.id);
                _guests[index] = _guest;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guest Updated', life: 3000 });
            } else {
                
                //_guest.id = createId();
                if (validateGuest(_guest)) {
                    Api.createGuest(_guest, 1).then((response) => {
                        console.log(response.status);
                        if ( (response.status === 200)) {
                            let object = response.json();
                            _guest.id = object.GUESTID;
                            _guests.push(_guest);
                            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guest Created', life: 3000 });
                        } else {
                            toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to Create Guest', life: 3000 });      
                        }
                    }).catch(error => {                        
                        toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Unable to Create Guest', life: 3000 });   
                    }); 
                }
            }

            setGuests(_guests);
            setGuestDialog(false);
            setTimeout(1000, () => setGuest(emptyGuest));
            
        }
    };

    const editGuest = (guest) => {
        setGuest({ ...guest });
        setGuestDialog(true);
    };

    const confirmDeleteGuest = (guest) => {
        setGuest(guest);
        setDeleteGuestDialog(true);
    };

    const deleteGuest = () => {
        let _guests = guests.filter((val) => val.id !== guest.id);

        setGuests(_guests);
        setDeleteGuestDialog(false);
        setGuest(emptyGuest);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guest Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < guests.length; i++) {
            if (guests[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteGuestsDialog(true);
    };

    const confirmSendInvites = () => {
        setSendInvitesDialog(true);
    }

    const sendInvitesToSelectedGuests = () => {
        
    }
    const deleteSelectedGuests = () => {
        let _guests = guests.filter((val) => !selectedGuests.includes(val));

        setGuests(_guests);
        setDeleteGuestsDialog(false);
        setSelectedGuests(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Guests Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _guest = { ...guest };

        _guest['attendingSide'] = e.value;
        setGuest(_guest);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _guest = { ...guest };

        _guest[`${name}`] = val;

        setGuest(_guest);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _guest = { ...guest };

        _guest[`${name}`] = val;

        setGuest(_guest);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" style={{ backgroundColor: "#f561b0", border: "#f561b0"}} onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedGuests || !selectedGuests.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
        <div className="flex flex-wrap gap-2">
        <Button label="Send Invite" icon="pi pi-send" style={{ backgroundColor: "#f561b0", border: "#f561b0"}} onClick={confirmSendInvites} />
        <Button label="Export" icon="pi pi-upload"  onClick={exportCSV} />;
        </div> );
        

    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.rsvp} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editGuest(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteGuest(rowData)} />
            </React.Fragment>
        );
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

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h3 className="m-0">Manage Guests</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const guestDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveGuest} />
        </React.Fragment>
    );
    const deleteGuestDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGuestDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteGuest} />
        </React.Fragment>
    );
    const deleteGuestsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGuestsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedGuests} />
        </React.Fragment>
    );
    const sendInvitesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" severity="danger" outlined onClick={hideSendInvitesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="success" onClick={sendInvitesToSelectedGuests} />
        </React.Fragment>
    );

    return (
        <> 
        <HeartyNavbar></HeartyNavbar>
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={guests} selection={selectedGuests} onSelectionChange={(e) => setSelectedGuests(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="attendingSide" header="Attending Side" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="numPax" header="Number of Pax" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rsvp" header="RSVP Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={guestDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Guest Details" modal className="p-fluid" footer={guestDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={guest.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !guest.name })}  />
                    {submitted && !guest.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText type = "email" id="email" value={guest.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !guest.email })} />
                    {submitted && !guest.email && <small className="p-error">Email is required.</small>}
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Attendee Side</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="bride" name="side" value="BRIDE" onChange={onCategoryChange} checked={guest.attendingSide === 'BRIDE'} required />
                            <label htmlFor="bride">Bride</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="groom" name="side" value="GROOM" onChange={onCategoryChange} checked={guest.attendingSide === 'GROOM'} required />
                            <label htmlFor="groom">Groom</label>
                        </div>
                    </div>
                    {submitted && !guest.attendingSide && <small className="p-error">Attending Side is required.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="numPax" className="font-bold">
                            Number of Pax.
                        </label>
                        <InputNumber id="numPax" value={guest.numPax} onValueChange={(e) => onInputNumberChange(e, 'numPax')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteGuestDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGuestDialogFooter} onHide={hideDeleteGuestDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {guest && (
                        <span>
                            Are you sure you want to delete <b>{guest.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteGuestsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGuestsDialogFooter} onHide={hideDeleteGuestsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {guest && <span>Are you sure you want to delete the selected guests?</span>}
                </div>
            </Dialog>

            <Dialog visible={sendInvitesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Invitation" modal footer={sendInvitesDialogFooter} onHide={hideSendInvitesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {guest && <span>Send Invites to selected guests? </span>}
                </div>
            </Dialog>
        </div>

        </>
    );
}