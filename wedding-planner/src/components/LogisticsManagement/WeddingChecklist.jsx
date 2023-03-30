import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import React, { useState } from "react";
import "./WeddingChecklist.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

export default function WeddingChecklist() {
    const [showDialog, setShowDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [taskName, setTaskName] = useState("");

    const createTaskDialog = () => {
        setShowDialog(true);
    };

    const onHide = () => {
        setShowDialog(!showDialog);
        setTaskName("");
        setSubmitted(false);
    };

    const onInputChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // reset the form and hide the dialog
        if (taskName) {
            setTaskName("");
            setSubmitted(false);
            setShowDialog(false);
        }
    };

    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div style={{ display: "flex" }}>
                    <h2>Wedding Checklist</h2>
                    <Button
                        style={{
                            width: "6.3em",
                            height: "2em",
                            margin: "auto",
                        }}
                        onClick={createTaskDialog}
                    >
                        Add Task
                    </Button>
                </div>
                <>
                    <Checklist></Checklist>
                </>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>

            <Dialog
                header="Add Task"
                visible={showDialog}
                onHide={onHide}
                modal
                draggable
                resizable
            >
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="taskName" className="font-bold">
                            Task Name
                        </label>
                        <InputText
                            id="taskName"
                            value={taskName}
                            onChange={onInputChange}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !taskName,
                            })}
                        />
                        {submitted && !taskName && (
                            <small className="p-error">
                                Task Name is required.
                            </small>
                        )}
                    </div>
                    <Button type="submit" label="Create Task" />
                </form>
            </Dialog>
        </div>
    );
}

function Checklist() {
    const [expanded, setExpanded] = useState(null);

    const handleCardClick = (index) => {
        if (index === expanded) {
            // If the card is already expanded, collapse it
            setExpanded(null);
        } else {
            // Otherwise, expand the clicked card
            setExpanded(index);
        }
    };

    // sample data
    const sampleChecklistData = [
        {
            title: "Invite guests",
            subTitle: [
                { title: "Import guest list" },
                { title: "Send Invitations" },
            ],
        },
        {
            title: "Find catering provider",
            subTitle: [
                { title: "Find at least 10 catering provider" },
                { title: "Contact the catering provider" },
            ],
        },
    ];

    return (
        <div>
            <div style={{ padding: "10px" }}>
                {sampleChecklistData.map((data, index) => (
                    <>
                        <Card
                            key={index}
                            className={index === expanded ? "expanded" : ""}
                            title={
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>{data.title}</span>
                                    <span>
                                        {index === expanded ? (
                                            <Button
                                                className="p-cursor-pointer"
                                                icon="pi pi-chevron-up"
                                            />
                                        ) : (
                                            <Button
                                                className="p-cursor-pointer"
                                                icon="pi pi-chevron-down"
                                            />
                                        )}
                                    </span>
                                </div>
                            }
                            onClick={() => handleCardClick(index)}
                        >
                            {index === expanded &&
                                data.subTitle.map((nestedItem, nestedIndex) => (
                                    <p key={nestedIndex}>{nestedItem.title}</p>
                                ))}
                        </Card>
                        <br />
                    </>
                ))}
            </div>
        </div>
    );
}
