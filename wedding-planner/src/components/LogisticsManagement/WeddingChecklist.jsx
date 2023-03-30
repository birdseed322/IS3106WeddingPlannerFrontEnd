import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import WeddingChecklistAPI from "./WeddingChecklistAPI";
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
    const [subTasks, setSubTasks] = useState([""]);

    const createTaskDialog = () => {
        setShowDialog(true);
    };

    const onHide = () => {
        setShowDialog(!showDialog);
        setTaskName("");
        setSubmitted(false);
    };

    const onInputTaskChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // reset the form and hide the dialog
        if (taskName) {
            setSubTasks(subTaskList);
            setTaskName("");
            setSubTasks([]);
            setSubmitted(false);
            setShowDialog(false);
        }
    };

    const [subTaskList, setSubTaskList] = useState([]);

    const repetitiveInputText = subTasks.map((subTask, index) => (
        <>
            <br />
            <InputText
                key={index}
                value={subTask}
                onChange={(e) => {
                    const newSubTasks = [...subTasks];
                    newSubTasks[index] = e.target.value;
                    setSubTasks(newSubTasks);
                }}
                required
                autoFocus={index === 0}
                className={classNames({
                    "p-invalid": submitted && !subTask,
                })}
            />
        </>
    ));

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
                            onChange={onInputTaskChange}
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
                    <div className="field">
                        <label htmlFor="subTasks" className="font-bold">
                            SubTasks
                        </label>
                        <br />
                        {repetitiveInputText}
                        <Button
                            icon="pi pi-plus"
                            onClick={() => setSubTasks([...subTasks, ""])}
                        ></Button>
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
