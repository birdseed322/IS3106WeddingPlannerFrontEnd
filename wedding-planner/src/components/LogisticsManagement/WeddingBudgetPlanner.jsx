import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";
import { Toast } from "primereact/toast";

import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import WeddingBudgetPlannerAPI from "./WeddingBudgetPlannerAPI";

export default function WeddingBudgetPlanner() {
    let emptyBudget = {
        weddingBudgetListId: null,
        budget: 0,
        weddingBudgetItems: [
            {
                category: "",
                cost: 0,
                isPaid: false,
                name: "",
                weddingBudgetItemId: null,
            },
        ],
    };

    let emptyItem = {
        category: "",
        cost: 0,
        isPaid: false,
        name: "",
        weddingBudgetItemId: null,
    };

    const { projectId } = useParams();

    // const [weddingBudgetListId, setWeddingBudgetListId] = useState(1);
    const [budget, setBudget] = useState(emptyBudget);
    // const [budgets, setBudgets] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [items, setItems] = useState([]);

    const [budgetDialog, setBudgetDialog] = useState(false);
    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        WeddingBudgetPlannerAPI.getBudgetByWeddingProject(projectId)
            .then((res) => {
                if (res.status === 404) {
                    throw new Error();
                }
                return res.json();
            })
            .then((_budgets) => {
                console.log(_budgets);
                setBudget(_budgets);
                setItems(_budgets.weddingBudgetItems);
            })
            .catch((exception) => {
                console.log("something went wrong with fetching budget");
                console.log(exception);
            });
    }, []);

    const onItemPaidChange = (e, rowData) => {
        const newItems = [...items];
        const index = newItems.findIndex(
            (item) => item.weddingBudgetItemId === rowData.weddingBudgetItemId
        );
        newItems[index].isPaid = e.checked;
        setItems(newItems);
    };

    const itemPaidTemplate = (rowData) => {
        return (
            <Checkbox
                onChange={(e) => onItemPaidChange(e, rowData)}
                checked={rowData.isPaid}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editItem(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteItem(rowData)}
                />
            </React.Fragment>
        );
    };

    const onInputBudgetChange = (e, name) => {
        const val = e.value || 0;
        let _budget = { ...budget };

        _budget[`${name}`] = val;

        setBudget(_budget);
        console.log(budget);
    };

    // const onInputNumBudgetChange = (e, number) => {
    //     const val = e.value || 0;
    //     let _budget = { ...budget };

    //     _budget[`${number}`] = val;

    //     setBudget(_budget);
    // };

    const onInputItemChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _item = { ...item };

        _item[`${name}`] = val;

        setItem(_item);
    };

    const onInputNumItemChange = (e, number) => {
        const val = e.value || 0;
        let _item = { ...item };

        _item[`${number}`] = val;

        setItem(_item);
    };

    const onInputPaidChange = (e, payment) => {
        const val = e.value;
        console.log(val);
        let _item = { ...item };

        _item[`${payment}`] = val;

        setItem(_item);
    };

    const showBudgetDialog = () => {
        setSubmitted(false);
        setBudgetDialog(true);
    };

    const newItemDialog = () => {
        setItem(emptyItem);
        setSubmitted(false);
        setItemDialog(true);
    };

    const showItemDialog = () => {
        setSubmitted(false);
        setItemDialog(true);
    };

    const hideBudgetDialog = () => {
        setBudgetDialog(false);
        setSubmitted(false);
    };

    const hideItemDialog = () => {
        setItemDialog(false);
        setSubmitted(false);
    };

    // const findIndexById = (id) => {
    //     let index = -1;

    //     for (let i = 0; i < budgets.length; i++) {
    //         if (budgets[i].weddingBudgetListId === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // };

    const findItemIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < items.length; i++) {
            if (items[i].weddingBudgetItemId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const handleBudgetDialog = () => {
        setSubmitted(true);
        let _budget = { ...budget };
        // let _budgets = [...budgets];
        console.log(_budget);
        // console.log(_budgets);

        const jsonified = JSON.stringify(_budget);
        const parsedCopy = JSON.parse(jsonified);
        console.log(parsedCopy);

        delete _budget.weddingBudgetItems;
        const jsonified2 = JSON.stringify(_budget);
        const parsedCopy2 = JSON.parse(jsonified2);

        _budget = { ...budget };
        console.log(_budget);

        if (budget.weddingBudgetListId != null) {
            // const index = findIndexById(budget.weddingBudgetListId);
            WeddingBudgetPlannerAPI.updateBudget(parsedCopy).then(() => {
                // _budgets[index] = _budget;
                setBudget(_budget);
                setBudgetDialog(false);
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Budget Updated",
                    life: 3000,
                });
            });
        } else {
            WeddingBudgetPlannerAPI.createBudget(parsedCopy2, projectId).then(
                (response) => {
                    console.log(response.status);
                    response.json().then((idObject) => {
                        _budget.weddingBudgetListId =
                            idObject.WEDDINGBUDGETLISTID;
                        // _budgets.push(_budget);
                        setBudget(_budget);
                        setBudgetDialog(false);
                        toast.current.show({
                            severity: "success",
                            summary: "Successful",
                            detail: "Budget Created",
                            life: 3000,
                        });
                    });
                }
            );
        }
    };

    const handleItemDialog = () => {
        setSubmitted(true);
        let _item = { ...item };
        let _items = [...items];
        console.log(_item);
        console.log(_items);

        const jsonified = JSON.stringify(_item);
        const parsedCopy = JSON.parse(jsonified);
        console.log(parsedCopy);

        if (item.weddingBudgetItemId != null) {
            const index = findItemIndexById(item.weddingBudgetItemId);
            WeddingBudgetPlannerAPI.updateItem(parsedCopy).then(() => {
                _items[index] = _item;
                setItems(_items);
                setItemDialog(false);
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Item Successfuly Updated",
                    life: 3000,
                });
            });
        } else {
            WeddingBudgetPlannerAPI.createItem(
                parsedCopy,
                budget.weddingBudgetListId
            ).then((response) => {
                response.json().then((idObject) => {
                    _item.weddingBudgetItemId = idObject.WEDDINGBUDGETITEMID;
                    _items.push(_item);
                    setItems(_items);
                    setItemDialog(false);
                    toast.current.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "Item Created",
                        life: 3000,
                    });
                });
            });
        }
    };

    const editItem = (item) => {
        setItem({ ...item });
        setItemDialog(true);
    };

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    };

    const deleteItem = () => {
        let _items = items.filter(
            (val) => val.weddingBudgetItemId !== item.weddingBudgetItemId
        );
        WeddingBudgetPlannerAPI.deleteItem(item.weddingBudgetItemId).then(
            () => {
                setItems(_items);
                setDeleteItemDialog(false);
                setItem(emptyItem);
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Item Deleted",
                    life: 3000,
                });
            }
        );
    };

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    };

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteItemDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteItem}
            />
        </React.Fragment>
    );

    const budgetFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                style={{
                    color: "#f561b0",
                    border: "#f561b0",
                }}
                onClick={hideBudgetDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                style={{
                    color: "#ffffff",
                    backgroundColor: "#f561b0",
                    border: "#f561b0",
                }}
                onClick={handleBudgetDialog}
            />
        </React.Fragment>
    );

    const itemFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                style={{
                    color: "#f561b0",
                    border: "#f561b0",
                }}
                onClick={hideItemDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                style={{
                    color: "#ffffff",
                    backgroundColor: "#f561b0",
                    border: "#f561b0",
                }}
                onClick={handleItemDialog}
            />
        </React.Fragment>
    );

    let totalCost = () => {
        return items.reduce((acc, curr) => {
            return acc + curr.cost;
        }, 0);
    };

    let totalPaid = () => {
        return items.reduce((acc, curr) => {
            if (curr.isPaid) {
                return acc + curr.cost;
            } else {
                return acc;
            }
        }, 0);
    };

    const options = [
        { label: "ENTERTAINMENT", value: "ENTERTAINMENT" },
        { label: "FOOD", value: "FOOD" },
        { label: "LIGHTING", value: "LIGHTING" },
        { label: "DECORATION", value: "DECORATION" },
        { label: "CLOTHES", value: "CLOTHES" },
        { label: "VENUE", value: "VENUE" },
        { label: "UNTITLED", value: "UNTITLED" },
    ];

    return (
        <div>
            <div>
                <Toast ref={toast} />
                <HeartyNavbar></HeartyNavbar>
                <Card className="flex justify-content-center">
                    <h2>Wedding Budget</h2>
                    <h3>
                        Budget:{" "}
                        {budget.budget.toLocaleString("en-SG", {
                            style: "currency",
                            currency: "SGD",
                        })}
                    </h3>
                    <Button
                        label="edit"
                        onClick={showBudgetDialog}
                        style={{
                            backgroundColor: "#f561b0",
                            border: "#f561b0",
                        }}
                    />
                    <h3>
                        Total Cost:{" "}
                        {totalCost().toLocaleString("en-SG", {
                            style: "currency",
                            currency: "SGD",
                        })}
                    </h3>
                    <h3>
                        Total Paid:{" "}
                        {totalPaid().toLocaleString("en-SG", {
                            style: "currency",
                            currency: "SGD",
                        })}{" "}
                    </h3>
                    <Button
                        label="Add Item"
                        icon="pi pi-plus"
                        onClick={newItemDialog}
                        style={{
                            backgroundColor: "#f561b0",
                            border: "#f561b0",
                        }}
                    ></Button>
                </Card>
            </div>

            <div>
                <DataTable
                    value={items}
                    tableStyle={{ minWidth: "60rem" }}
                    // selection={selectedGuests}
                    // onSelectionChange={(e) => setSelectedGuests(e.value)}
                    dataKey="weddingBudgetItemId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                >
                    {/* <Column field="weddingBudgetItemId" header="No."></Column> */}
                    <Column header="Category" field="category" />
                    <Column field="name" header="Event Name"></Column>
                    <Column
                        field="cost"
                        header="Cost"
                        body={(rowData) => {
                            return rowData.cost.toLocaleString("en-SG", {
                                style: "currency",
                                currency: "SGD",
                            });
                        }}
                    ></Column>
                    <Column
                        header="Payment Status"
                        body={itemPaidTemplate}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                    ></Column>
                </DataTable>
            </div>

            <Dialog
                visible={budgetDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Budget"
                modal
                className="p-fluid"
                onHide={hideBudgetDialog}
                footer={budgetFooter}
            >
                <div className="field">
                    <label htmlFor="budget" className="font-bold">
                        Budget
                    </label>
                    <InputNumber
                        id="budget"
                        value={budget.budget}
                        onChange={(e) => onInputBudgetChange(e, "budget")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && budget.budget <= 0,
                        })}
                    />
                    {submitted && budget.budget <= 0 && (
                        <small className="p-error">
                            Item Budget is required.
                        </small>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={itemDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Item"
                modal
                className="p-fluid"
                onHide={hideItemDialog}
                footer={itemFooter}
            >
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Item Name
                    </label>
                    <InputText
                        id="name"
                        value={item.name}
                        onChange={(e) => onInputItemChange(e, "name")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !item.name,
                        })}
                    />
                    {submitted && !item.name && (
                        <small className="p-error">
                            Item Name is required.
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="cost" className="font-bold">
                        Item Cost
                    </label>
                    <InputNumber
                        id="cost"
                        value={item.cost}
                        onChange={(e) => onInputNumItemChange(e, "cost")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && item.cost < 0,
                        })}
                    />
                    {submitted && item.cost < 0 && (
                        <small className="p-error">
                            Item Cost is required.
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="isPaid" className="font-bold">
                        Item Payment Status
                    </label>
                    <ToggleButton
                        id="isPaid"
                        checked={item.isPaid}
                        onChange={(e) => onInputPaidChange(e, "isPaid")}
                        required
                        autoFocus
                        style={{
                            backgroundColor: "#f561b0",
                            border: "#f561b0",
                            color: "#ffffff",
                        }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="category" className="font-bold">
                        Category
                    </label>
                    <Dropdown
                        id="category"
                        value={item.category}
                        onChange={(e) => onInputItemChange(e, "category")}
                        required
                        autoFocus
                        options={options}
                        className={classNames({
                            "p-invalid": submitted && !item.category,
                        })}
                    />
                    {submitted && !item.category && (
                        <small className="p-error">
                            Item Category is required.
                        </small>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteItemDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteItemDialogFooter}
                onHide={hideDeleteItemDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {item && (
                        <span>
                            Are you sure you want to delete <b>{item.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
