import React, { useState, useEffect } from "react";

import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

import WeddingItineraryAPI from "./WeddingItineraryAPI";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";

export default function WeddingItinerary() {
    let emptyItinerary = {
        eventDate: null,
        eventEndTime: null,
        eventName: "",
        eventStartTime: null,
        weddingItineraryId: null,
    };

    const [weddingProjectId, setWeddingProjectId] = useState(1);
    const [itinerary, setItinerary] = useState(emptyItinerary);
    const [itineraries, setItineraries] = useState([]);
    const [itineraryDialog, setItineraryDialog] = useState(false);
    const [deleteItineraryDialog, setDeleteItineraryDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const dateProcessor = (dateString) => {
        if (typeof dateString === "string") {
            // it works without this if-else but just in case sth goes wrong:
            if (dateString[dateString.length - 1] === "]") {
                return new Date(dateString.slice(0, -5));
            } else {
                return new Date(dateString);
            }
        } else {
            return undefined;
        }
    };

    useEffect(() => {
        reloadData();
    }, []);

    const reloadData = () => {
        WeddingItineraryAPI.getAllItineraries()
            .then((res) => {
                return res.json();
            })
            .then((itineraries) => {
                const updatedItineraries = itineraries.map((itinerary) => {
                    const updatedEventDate = dateProcessor(
                        itinerary.eventDate
                    ).toLocaleDateString();
                    const updatedEventStartTime = dateProcessor(
                        itinerary.eventStartTime
                    ).toLocaleTimeString();
                    const updatedEventEndTime = dateProcessor(
                        itinerary.eventEndTime
                    ).toLocaleTimeString();

                    return {
                        ...itinerary,
                        eventDate: updatedEventDate,
                        eventStartTime: updatedEventStartTime,
                        eventEndTime: updatedEventEndTime,
                    };
                });

                setItineraries(updatedItineraries);
            })
            .catch((error) => console.log(error));
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editItinerary(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteItinerary(rowData)}
                />
            </React.Fragment>
        );
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _itinerary = { ...itinerary };

        _itinerary[`${name}`] = val;

        setItinerary(_itinerary);
    };

    const showItineraryDialog = () => {
        setItinerary(emptyItinerary);
        setSubmitted(false);
        setItineraryDialog(true);
    };

    const hideItineraryDialog = () => {
        setSubmitted(false);
        setItineraryDialog(false);
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < itineraries.length; i++) {
            if (itineraries[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };
    const handleItineraryDialog = () => {
        setSubmitted(true);
        let _itinerary = { ...itinerary };
        let _itineraries = [...itineraries];
        console.log(_itinerary);
        console.log(_itineraries);

        const jsonified = JSON.stringify(_itinerary);
        const parsedCopy = JSON.parse(jsonified);

        if (itinerary.weddingItineraryId != null) {
            const index = findIndexById(itinerary.weddingItineraryId);
            WeddingItineraryAPI.updateItinerary(parsedCopy).then(() => {
                _itineraries[index] = _itinerary;
                setItineraries(_itineraries);
                setItineraryDialog(false);
            });
        } else {
            WeddingItineraryAPI.createNewItinerary(
                parsedCopy,
                weddingProjectId
            ).then((response) => {
                response.json().then((idObject) => {
                    _itinerary.weddingItineraryId = idObject.WEDDINGITINERARYID;
                    _itineraries.push(_itinerary);
                    setItineraries(_itineraries);
                    setItineraryDialog(false);
                });
            });
        }
    };

    const editItinerary = (itinerary) => {
        setItinerary({ ...itinerary });
        setItineraryDialog(true);
    };

    const confirmDeleteItinerary = (itinerary) => {
        setItinerary(itinerary);
        setDeleteItineraryDialog(true);
    };

    const deleteItinerary = () => {
        let _itineraries = itineraries.filter(
            (val) => val.weddingItineraryId !== itinerary.weddingItineraryId
        );
        WeddingItineraryAPI.deleteItinerary(itinerary.weddingItineraryId).then(
            () => {
                setItineraries(_itineraries);
                setDeleteItineraryDialog(false);
                setItinerary(emptyItinerary);
            }
        );
    };

    const hideDeleteItineraryDialog = () => {
        setDeleteItineraryDialog(false);
    };

    const deleteItineraryDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteItineraryDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteItinerary}
            />
        </React.Fragment>
    );

    const itineraryDialogFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                onClick={hideItineraryDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                onClick={handleItineraryDialog}
            />
        </React.Fragment>
    );

    return (
        <div>
            <HeartyNavbar></HeartyNavbar>
            <Card>
                <h4>
                    Date: <Calendar id="eventDate" showIcon></Calendar>
                </h4>
                <Button
                    label="Add New Itinerary"
                    icon="pi pi-plus"
                    onClick={showItineraryDialog}
                ></Button>
                <br />

                <DataTable
                    value={itineraries}
                    header="Wedding Itineraries"
                    tableStyle={{ minWidth: "60rem" }}
                    // selection={selectedGuests}
                    // onSelectionChange={(e) => setSelectedGuests(e.value)}
                    dataKey="weddingItineraryId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                >
                    <Column header="ID" field="weddingItineraryId"></Column>
                    <Column header="Event Name" field="eventName"></Column>
                    <Column header="Event Date" field="eventDate"></Column>
                    <Column
                        header="Event Start Time"
                        field="eventStartTime"
                    ></Column>
                    <Column
                        header="Event End Time"
                        field="eventEndTime"
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                    ></Column>
                </DataTable>
            </Card>

            <Dialog
                visible={itineraryDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="itinerary Details"
                modal
                className="p-fluid"
                footer={itineraryDialogFooter}
                onHide={hideItineraryDialog}
            >
                <div className="field">
                    <label htmlFor="eventName" className="font-bold">
                        Event Name
                    </label>
                    <InputText
                        id="eventName"
                        value={itinerary.eventName}
                        onChange={(e) => onInputChange(e, "eventName")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !itinerary.eventName,
                        })}
                    />
                    {submitted && !itinerary.eventName && (
                        <small className="p-error">
                            Event Name is required.
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="eventDate" className="font-bold">
                        Event Date
                    </label>
                    <Calendar
                        id="eventDate"
                        value={itinerary.eventDate}
                        onChange={(e) => onInputChange(e, "eventDate")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !itinerary.eventDate,
                        })}
                    />
                    {submitted && !itinerary.eventDate && (
                        <small className="p-error">
                            Event Date is required.
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="eventStartTime" className="font-bold">
                        Event Start Time
                    </label>
                    <Calendar
                        id="eventStartTime"
                        value={itinerary.eventStartTime}
                        onChange={(e) => onInputChange(e, "eventStartTime")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !itinerary.eventStartTime,
                        })}
                        timeOnly
                    />
                    {submitted && !itinerary.eventStartTime && (
                        <small className="p-error">
                            Event Start Time is required.
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="eventEndTime" className="font-bold">
                        Event End Time
                    </label>
                    <Calendar
                        id="eventEndTime"
                        value={itinerary.eventEndTime}
                        onChange={(e) => onInputChange(e, "eventEndTime")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !itinerary.eventEndTime,
                        })}
                        timeOnly
                    />
                    {submitted && !itinerary.eventEndTime && (
                        <small className="p-error">
                            Event End Time is required.
                        </small>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteItineraryDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteItineraryDialogFooter}
                onHide={hideDeleteItineraryDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {itinerary && (
                        <span>
                            Are you sure you want to delete{" "}
                            <b>{itinerary.eventName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

// import React, { useState } from "react";
// import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
// import { Calendar } from "primereact/calendar";
// import { DataTable } from "primereact/datatable";
// import { Row } from "primereact/row";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import classNames from "classnames";

// export default function WeddingItinerary() {
//     const [selectedDate, setSelectedDate] = useState(null);

//     const [showDialog, setShowDialog] = useState(false);
//     const [submitted, setSubmitted] = useState(false);

//     const [time, setTime] = useState("");
//     const [task, setTask] = useState("");

//     const createNewItinerary = () => {
//         setShowDialog(true);
//     };

//     const onHide = () => {
//         setShowDialog(!showDialog);
//         setTime("");
//         setTask("");
//         setSubmitted(false);
//     };

//     const onTimeChange = (e) => {
//         setTime(e.target.value);
//     };

//     const onTaskChange = (e) => {
//         setTask(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmitted(true);

//         // reset the form and hide the dialog
//         if (task) {
//             setTask("");
//             setTime("");
//             setSubmitted(false);
//             setShowDialog(false);
//         }
//     };

//     const handleDateSelect = (e) => {
//         setSelectedDate(e.value);
//     };

//     return (
//         <>
//             <HeartyNavbar />
//             <h4>
//                 Date:{" "}
//                 <Calendar
//                     value={selectedDate}
//                     onChange={handleDateSelect}
//                 ></Calendar>
//             </h4>
//             <DataTable
//                 paginator
//                 rows={10}
//                 rowsPerPageOptions={[5, 10, 25]}
//                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
//             >
//                 <Column
//                     field="time"
//                     header="Time"
//                     sortable
//                     style={{ minWidth: "12rem" }}
//                 ></Column>
//                 <Column
//                     field="task"
//                     header="Task"
//                     sortable
//                     style={{ minWidth: "12rem" }}
//                 ></Column>
//             </DataTable>

//             <Button onClick={createNewItinerary}>Add new itinerary</Button>

//             <Dialog
//                 header="Add New Itinerary"
//                 visible={showDialog}
//                 onHide={onHide}
//                 modal
//                 draggable
//                 resizable
//             >
//                 <form onSubmit={handleSubmit}>
//                     <div className="field">
//                         <label htmlFor="time" className="font-bold">
//                             Time
//                         </label>
//                         <InputText
//                             id="time"
//                             value={time}
//                             onChange={onTimeChange}
//                             required
//                             autoFocus
//                             className={classNames({
//                                 "p-invalid": submitted && !time,
//                             })}
//                         />
//                     </div>
//                     <div className="field">
//                         <label htmlFor="task" className="font-bold">
//                             Task
//                         </label>
//                         <InputText
//                             id="task"
//                             value={task}
//                             onChange={onTaskChange}
//                             required
//                             autoFocus
//                             className={classNames({
//                                 "p-invalid": submitted && !task,
//                             })}
//                         />
//                     </div>
//                     <Button type="submit" label="Create New Itinerary" />
//                 </form>
//             </Dialog>
//         </>
//     );
// }
