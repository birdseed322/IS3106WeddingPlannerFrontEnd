import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";

import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import WeddingChecklistAPI from "./WeddingChecklistAPI";

import { checkOffParentTask, checkOffSubtask } from "./WeddingChecklistHelperFunctions";

const dateProcessor = (dateString) => {
    if (typeof dateString === "string") {
        // it works without this if-else but just in case sth goes wrong:
        if (dateString[dateString.length - 1] == "]") {
            return new Date(dateString.slice(0, -5));
        } else {
            return new Date(dateString);
        }
    } else {
        return new Date(0); // return 0 so undefined doesnt crash the whole thing when trying to render before data is fetched
    }
};

export default function WeddingChecklist() {
    let emptyParentTask = {
        weddingTaskParentId: null,
        taskDescription: "",
        isDone: false,
        weddingSubtasks: [
            {
                weddingSubtaskId: null,
                subtaskDescription: "",
                isDone: false,
            },
        ],
    };

    const emptyChecklist = {
        weddingParentTasks: [],
    };

    const { projectId } = useParams();

    const [checklistId, setChecklistId] = useState(1);
    const [parentTasks, setParentTasks] = useState([]);
    const [taskDialog, setTaskDialog] = useState(false);
    const [subtaskDialog, setSubtaskDialog] = useState(false);
    const [newTaskDialog, setNewTaskDialog] = useState(false);
    const [subtask, setSubtask] = useState(emptyParentTask.weddingSubtasks[0]);
    const [subtasks, setSubtasks] = useState([]);
    const [newParentTask, setNewParentTask] = useState(emptyParentTask);

    const [newSubtasks, setNewSubtasks] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [expandedRows, setExpandedRows] = useState(null);

    const [deleteTaskDialog, setDeleteTaskDialog] = useState(false);
    const [deleteSubtaskDialog, setDeleteSubtaskDialog] = useState(false);

    // Get the WeddingChecklistObject according to WeddingProject id from path param

    useEffect(() => {
        WeddingChecklistAPI.getWeddingChecklistByWeddingProjectId(projectId)
            .then((res) => res.json())
            .then((weddingChecklistObject) => {
                setParentTasks(weddingChecklistObject.weddingParentTasks);
                console.log(weddingChecklistObject);
            })
            .catch((exception) => {
                console.log("something went wrong with fetching checklist");
                console.log(exception);
            });
    }, []);

    // useEffect(() => {
    //     reloadData();
    //     updateTaskStatus(parentTask);
    // }, []);

    const reloadData = () => {
        WeddingChecklistAPI.getAllParentTasks()
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((parentData) => {
                setParentTasks(parentData);
                console.log(parentTasks);
            });
    };

    // const updateTaskStatus = (parentTask) => {
    //     console.log("called");
    //     let _parentTask = { ...parentTask };
    //     console.log(parentTask);
    //     let _parentTasks = [...parentTasks];
    //     let allSubtaskDone = true;

    //     if (_parentTask.weddingSubtasks.length !== 0) {
    //         for (let subtask of _parentTask.weddingSubtasks) {
    //             if (!subtask.isDone) {
    //                 allSubtaskDone = false;
    //                 break;
    //             }
    //         }
    //     }

    //     _parentTask.isDone = allSubtaskDone;

    //     delete _parentTask.weddingSubtasks;

    //     const jsonified = JSON.stringify(_parentTask);
    //     const parsedCopy = JSON.parse(jsonified);
    //     console.log(parsedCopy);

    //     _parentTask = { ...parentTask };

    //     if (parentTask.weddingParentTaskId != null) {
    //         const index = findIndexById(parentTask.weddingParentTaskId);
    //         WeddingChecklistAPI.updateParentTask(parsedCopy).then(() => {
    //             _parentTasks[index] = _parentTask;
    //             setParentTask(_parentTask);
    //             setParentTasks(_parentTasks);
    //             setTaskDialog(false);
    //         });
    //     }
    // };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <DataTable value={data.weddingSubtasks} header={false}>
                    <Column field=""></Column>
                    <Column field=""></Column>
                    <Column field="subtaskDescription"></Column>
                    <Column field="isDone" body={isDoneTemplateForSubtask}></Column>
                    <Column body={actionSubtaskBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>
        );
    };

    const allowExpansion = (rowData) => {
        // have to check undefined because if it doesnt have subtask it might crash?
        return rowData.weddingSubtasks != undefined && rowData.weddingSubtasks.length > 0;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editTask(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteTask(rowData)}
                />
            </React.Fragment>
        );
    };

    const actionSubtaskBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editSubtask(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteSubtask(rowData)}
                />
            </React.Fragment>
        );
    };

    const editTask = (task) => {
        setNewParentTask({ ...task });
        setTaskDialog(true);
    };

    const editSubtask = (subtask) => {
        setSubtask({ ...subtask });
        setSubtaskDialog(true);
    };

    const confirmDeleteTask = (task) => {
        setNewParentTask(task);
        setDeleteTaskDialog(true);
    };

    const confirmDeleteSubtask = (subtask) => {
        setSubtask(subtask);
        setDeleteSubtaskDialog(true);
    };

    const deleteTask = () => {
        let _tasks = parentTasks.filter(
            (val) => val.weddingParentTaskId !== newParentTask.weddingParentTaskId
        );
        WeddingChecklistAPI.deleteParentTask(newParentTask.weddingParentTaskId).then(() => {
            setParentTasks(_tasks);
            setDeleteTaskDialog(false);
            setNewParentTask(emptyParentTask);
        });
    };

    const deleteSubtask = () => {
        console.log(subtasks);
        let _subtasks = newParentTask.weddingSubtasks.filter(
            (val) => val.weddingSubtaskId !== newParentTask.weddingSubtasks.weddingSubtaskId
        );
        console.log(_subtasks);

        WeddingChecklistAPI.deleteSubtask(subtask.weddingSubtaskId).then(() => {
            console.log(subtasks);
            setSubtasks(_subtasks);
            console.log(subtasks);
            setDeleteSubtaskDialog(false);
            setSubtask(emptyParentTask.weddingSubtasks);
            reloadData();
        });
    };

    const hideDeleteTaskDialog = () => {
        setDeleteTaskDialog(false);
    };

    const hideDeleteSubtaskDialog = () => {
        setDeleteSubtaskDialog(false);
    };

    const deleteTaskDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteTaskDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteTask} />
        </React.Fragment>
    );

    const deleteSubtaskDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSubtaskDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSubtask} />
        </React.Fragment>
    );

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < parentTasks.length; i++) {
            if (parentTasks[i].weddingParentTaskId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const findIndexBySubtaskId = (id) => {
        let index = -1;

        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i].weddingSubtaskId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onInputNewParentTaskChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _parentTask = { ...newParentTask };

        _parentTask[`${name}`] = val;

        setNewParentTask(_parentTask);
    };

    const onInputNewSubtaskChange = (e, index) => {
        console.log("called");
        const value = e.target && e.target.value;
        // addNewSubtask(value);
        setNewSubtasks((prevSubtasks) => {
            const updatedSubtasks = [...prevSubtasks];
            updatedSubtasks[index] = {
                ...updatedSubtasks[index],
                subtaskDescription: value,
            };
            return updatedSubtasks;
        });
        console.log(newSubtasks);
    };

    const onInputSubtaskChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _subtask = { ...subtask };

        _subtask[`${name}`] = val;

        setSubtask(_subtask);
    };

    const openNewTaskDialog = () => {
        setNewParentTask(emptyParentTask);
        setNewTaskDialog(true);
        setSubmitted(false);
    };

    const hideNewTaskDialog = () => {
        setNewTaskDialog(false);
        setSubmitted(true);
    };

    const hideTaskDialog = () => {
        setTaskDialog(false);
        setSubmitted(false);
    };

    const hideSubtaskDialog = () => {
        setSubtaskDialog(false);
        setSubmitted(false);
    };

    const addNewSubtask = () => {
        setNewSubtasks((prevSubtasks) => [...prevSubtasks, { subtaskDescription: "" }]);
    };

    const handleNewTaskDialog = () => {
        setSubmitted(true);
        let _task = { ...newParentTask };
        let _tasks = [...parentTasks];

        delete _task.weddingSubtasks;

        const jsonified = JSON.stringify(_task);
        const parsedCopy = JSON.parse(jsonified);
        console.log(parsedCopy);

        _task = { ...newParentTask };
        console.log(_task);

        WeddingChecklistAPI.createParentTask(parsedCopy, checklistId).then((response) => {
            response.json().then((idObject) => {
                _task.weddingParentTaskId = idObject.WEDDINGPARENTTASKID;
                _tasks.push(_task);
                setNewParentTask(_task);
                setParentTasks(_tasks);

                newSubtasks.map((subtask) => {
                    let _subtask = { ...subtask };
                    let _subtasks = [...subtasks];

                    const jsonified2 = JSON.stringify(_subtask);
                    const parsedCopy2 = JSON.parse(jsonified2);
                    console.log(parsedCopy2);

                    WeddingChecklistAPI.createSubtask(parsedCopy2, _task.weddingParentTaskId).then(
                        (response) =>
                            response.json().then((idObject) => {
                                _subtask.weddingSubtaskId = idObject.WEDDINGSUBTASKID;
                                _subtasks.push(_subtask);
                                setSubtasks(_subtasks);
                            })
                    );
                    reloadData();
                });
                reloadData();
                setNewTaskDialog(false);
            });
        });
    };

    const handleTaskDialog = () => {
        setSubmitted(true);
        let _parentTask = { ...newParentTask };
        let _parentTasks = [...parentTasks];
        console.log(_parentTask);
        console.log(_parentTasks);

        const jsonified = JSON.stringify(_parentTask);
        const parsedCopy = JSON.parse(jsonified);
        console.log(parsedCopy);

        if (newParentTask.weddingParentTaskId != null) {
            const index = findIndexById(newParentTask.weddingParentTaskId);
            WeddingChecklistAPI.updateParentTask(parsedCopy).then(() => {
                _parentTasks[index] = _parentTask;
                setNewParentTask(_parentTask);
                setParentTasks(_parentTasks);
                setTaskDialog(false);
            });
        }
        // } else {
        //     WeddingChecklistAPI.createParentTask(parsedCopy, checklistId).then(
        //         (response) => {
        //             response.json().then((idObject) => {
        //                 _parentTask.weddingParentTaskId =
        //                     idObject.WEDDINGPARENTTASKID;
        //                 _parentTasks.push(_parentTask);
        //                 setParentTasks(_parentTasks);
        //                 setTaskDialog(false);
        //             });
        //         }
        //     );
        // }
    };

    const handleSubtaskDialog = () => {
        setSubmitted(true);
        let _subtask = { ...subtask };
        let _subtasks = [...subtasks];
        console.log(_subtask);
        console.log(_subtasks);

        const jsonified = JSON.stringify(_subtask);
        const parsedCopy = JSON.parse(jsonified);
        console.log(parsedCopy);

        if (subtask.weddingSubtaskId != null) {
            const index = findIndexBySubtaskId(subtask.weddingSubtaskId);
            WeddingChecklistAPI.updateSubtask(parsedCopy).then(() => {
                _subtasks[index] = _subtask;
                setSubtasks(_subtasks);
                // updateTaskStatus(parentTask);
                setSubtaskDialog(false);
                reloadData();
            });
        } else {
            WeddingChecklistAPI.createSubtask(parsedCopy, checklistId).then((response) => {
                response.json().then((idObject) => {
                    _subtask.weddingSubtaskId = idObject.WEDDINGSUBTASKID;
                    _subtasks.push(_subtask);
                    setSubtasks(_subtasks);
                    setSubtaskDialog(false);
                });
            });
        }
    };

    const newTaskFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideNewTaskDialog} />
            <Button label="Save" icon="pi pi-check" onClick={handleNewTaskDialog} />
        </React.Fragment>
    );

    const taskFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideTaskDialog} />
            <Button label="Save" icon="pi pi-check" onClick={handleTaskDialog} />
        </React.Fragment>
    );

    const subtaskFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideSubtaskDialog} />
            <Button label="Save" icon="pi pi-check" onClick={handleSubtaskDialog} />
        </React.Fragment>
    );



    const isDoneTemplateForParentTask = (rowData) => (
        <Checkbox
            id="isDone"
            checked={rowData.isDone}
            onChange={(e) => checkOffParentTask(e, rowData, parentTasks, setParentTasks)}
        />
    );

    const isDoneTemplateForSubtask = (rowData) => (
        <Checkbox
            id="isDone"
            checked={rowData.isDone}
            // inefficient algorithm, but it gets the job done
            onChange={(e) => checkOffSubtask(e, rowData, parentTasks, setParentTasks)}
        />
    );

    const [testCheck, setTestCheck] = useState(true);

    return (
        <>
            <HeartyNavbar></HeartyNavbar>
            <Card>
                <div className=" flex justify-content-center">
                    <h4>WeddingChecklist</h4>
                </div>
                <div className=" flex justify-content-center">
                    <Button
                        label="Add New Task"
                        icon="pi pi-plus"
                        onClick={openNewTaskDialog}
                    ></Button>
                </div>
                <div>
                    <Checkbox
                        id="foo"
                        checked={testCheck}
                        onChange={(e) => {
                            setTestCheck(e.checked);
                            console.log(testCheck);
                            console.log(parentTasks);
                        }}
                        // autoFocus
                        // className={classNames({
                        //     "p-invalid": submitted && !item.isPaid,
                        // })}
                    />
                </div>
                <br />
                <DataTable
                    value={parentTasks}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="weddingParentTaskId"
                >
                    <Column expander={allowExpansion}></Column>
                    <Column field="taskDescription" header="Task Description"></Column>
                    <Column
                        field="isDone"
                        body={isDoneTemplateForParentTask}
                        header="Status"
                    ></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </Card>

            <Dialog
                visible={newTaskDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Task"
                modal
                className="p-fluid"
                onHide={hideNewTaskDialog}
                footer={newTaskFooter}
            >
                <div className="field">
                    <label htmlFor="taskDescription" className="font-bold">
                        Task Description
                    </label>
                    <InputText
                        id="taskDescription"
                        value={newParentTask.taskDescription}
                        onChange={(e) => onInputNewParentTaskChange(e, "taskDescription")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !newParentTask.taskDescription,
                        })}
                    />
                    {submitted && !newParentTask.taskDescription && (
                        <small className="p-error">Task Description is required.</small>
                    )}
                </div>
                {newSubtasks.map((subtask, index) => (
                    <>
                        <div key={index} className="field">
                            <label htmlFor={index} className="font-bold">
                                Subtask {index + 1}
                            </label>
                            <InputText
                                id={index}
                                value={subtask.subtaskDescription}
                                onChange={(e) => onInputNewSubtaskChange(e, index)}
                                required
                                autoFocus={index === newSubtasks.length - 1}
                                className={classNames({
                                    "p-invalid": submitted && !subtask.subtaskDescription,
                                })}
                            />
                            {submitted && !subtask.subtaskDescription && (
                                <small className="p-error">Subtask Description is required.</small>
                            )}
                        </div>
                    </>
                ))}
                <Button label="Add Subtask" icon="pi pi-plus" onClick={addNewSubtask}></Button>
            </Dialog>

            {/* <Dialog
                visible={taskDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Task"
                modal
                className="p-fluid"
                onHide={hideTaskDialog}
                footer={taskFooter}
            >
                <div className="field">
                    <label htmlFor="taskDescription" className="font-bold">
                        Task Description
                    </label>
                    <InputText
                        id="taskDescription"
                        value={parentTask.taskDescription}
                        onChange={(e) => onInputChange(e, "taskDescription")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !parentTask.taskDescription,
                        })}
                    />
                    {submitted && !parentTask.taskDescription && (
                        <small className="p-error">Task Description is required.</small>
                    )}
                </div>
            </Dialog> */}

            {/* <Dialog
                visible={subtaskDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Task"
                modal
                className="p-fluid"
                onHide={hideSubtaskDialog}
                footer={subtaskFooter}
            >
                <div className="field">
                    <label htmlFor="subtaskDescription" className="font-bold">
                        Subtask Description
                    </label>
                    <InputText
                        id="subtaskDescription"
                        value={subtask.subtaskDescription}
                        onChange={(e) => onInputSubtaskChange(e, "subtaskDescription")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !subtask.subtaskDescription,
                        })}
                    />
                    {submitted && !subtask.subtaskDescription && (
                        <small className="p-error">Subtask Description is required.</small>
                    )}
                </div> */}
            {/* <div className="field">
                    <label htmlFor="status" className="font-bold">
                        Status
                    </label>
                    <InputText
                        id="isDone"
                        value={subtask.isDone}
                        onChange={(e) => {
                            onInputSubtaskChange(e, "isDone");
                        }}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !subtask.isDone,
                        })}
                    />
                    {submitted && !subtask.isDone && (
                        <small className="p-error">Subtask Status is required.</small>
                    )}
                </div> */}
            {/* </Dialog> */}

            <Dialog
                visible={deleteTaskDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteTaskDialogFooter}
                onHide={hideDeleteTaskDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {newParentTask && (
                        <span>
                            Are you sure you want to delete <b>{newParentTask.taskDescription}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteSubtaskDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteSubtaskDialogFooter}
                onHide={hideDeleteSubtaskDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {subtask && (
                        <span>
                            Are you sure you want to delete <b>{subtask.subtaskDescription}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </>
    );
}
