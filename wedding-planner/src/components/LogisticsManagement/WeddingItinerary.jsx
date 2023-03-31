import React, { useState } from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

export default function WeddingItinerary() {
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <h2>Wedding Itinerary</h2>
                </div>
                <>
                    <WeddingItineraryPage></WeddingItineraryPage>
                </>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>
        </div>
    );
}

function WeddingItineraryPage() {
    const [selectedDate, setSelectedDate] = useState(null);

    const [showDialog, setShowDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [time, setTime] = useState("");
    const [task, setTask] = useState("");

    const createNewItinerary = () => {
        setShowDialog(true);
    };

    const onHide = () => {
        setShowDialog(!showDialog);
        setTime("");
        setTask("");
        setSubmitted(false);
    };

    const onTimeChange = (e) => {
        setTime(e.target.value);
    };

    const onTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // reset the form and hide the dialog
        if (task) {
            setTask("");
            setTime("");
            setSubmitted(false);
            setShowDialog(false);
        }
    };

    const handleDateSelect = (e) => {
        setSelectedDate(e.value);
    };

    return (
        <>
            <h4>
                Date:{" "}
                <Calendar
                    value={selectedDate}
                    onChange={handleDateSelect}
                ></Calendar>
            </h4>
            <DataTable
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <Column
                    field="time"
                    header="Time"
                    sortable
                    style={{ minWidth: "12rem" }}
                ></Column>
                <Column
                    field="task"
                    header="Task"
                    sortable
                    style={{ minWidth: "12rem" }}
                ></Column>
            </DataTable>

            <Button onClick={createNewItinerary}>Add new itinerary</Button>

            <Dialog
                header="Add New Itinerary"
                visible={showDialog}
                onHide={onHide}
                modal
                draggable
                resizable
            >
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="time" className="font-bold">
                            Time
                        </label>
                        <InputText
                            id="time"
                            value={time}
                            onChange={onTimeChange}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !time,
                            })}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="task" className="font-bold">
                            Task
                        </label>
                        <InputText
                            id="task"
                            value={task}
                            onChange={onTaskChange}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !task,
                            })}
                        />
                    </div>
                    <Button type="submit" label="Create New Itinerary" />
                </form>
            </Dialog>
        </>
    );
}
