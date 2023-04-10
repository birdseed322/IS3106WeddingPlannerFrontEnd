import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import WeddingBudgetPlannerAPI from "./WeddingBudgetPlannerAPI";

export default function WeddingBudgetPlanner() {
    let emptyBudget = {
        weddingBudgetListId: null,
        budget: 0,
    };

    let emptyItem = {
        category: "",
        cost: 0,
        isPaid: false,
        name: "",
        weddingBudgetItemId: null,
    };

    const { weddingProjectId } = useParams();

    const [weddingBudgetListId, setWeddingBudgetListId] = useState(1);
    const [budget, setBudget] = useState(emptyBudget);
    const [budgets, setBudgets] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [items, setItems] = useState([]);

    const [budgetDialog, setBudgetDialog] = useState(false);
    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // useEffect(() => reloadData(), []);

    // const reloadData = () => {
    //     WeddingBudgetPlannerAPI.retrieveAllItems()
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((items) => {
    //             setItems(items);
    //             console.log(items);
    //         });
    // };

    useEffect(() => budgetData(), []);

    const budgetData = () => {
        WeddingBudgetPlannerAPI.getBudgetByWeddingProject(weddingProjectId)
            .then((res) => {
                return res.json();
            })
            .then((budgets) => {
                setBudgets(budgets);
                console.log(budgets);
            });
    };

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
        const val = e.target.checked;
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

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < budgets.length; i++) {
            if (budgets[i].weddingBudgetListId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

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
        let _budgets = [...budgets];
        console.log(_budget);
        console.log(_budgets);

        const jsonified = JSON.stringify(_budget);
        const parsedCopy = JSON.parse(jsonified);
        console.log(parsedCopy);

        if (budget.weddingBudgetListId != null) {
            const index = findIndexById(budget.weddingBudgetListId);
            WeddingBudgetPlannerAPI.updateBudget(parsedCopy).then(() => {
                _budgets[index] = _budget;
                setBudgets(_budgets);
                setBudgetDialog(false);
            });
        } else {
            WeddingBudgetPlannerAPI.createBudget(
                parsedCopy,
                weddingProjectId
            ).then((response) => {
                response.json().then((idObject) => {
                    _budget.weddingBudgetListId = idObject.WEDDINGBUDGETLISTID;
                    _budgets.push(_budget);
                    setBudgets(_budgets);
                    setBudgetDialog(false);
                });
            });
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
            });
        } else {
            WeddingBudgetPlannerAPI.createItem(
                parsedCopy,
                weddingBudgetListId
            ).then((response) => {
                response.json().then((idObject) => {
                    _item.weddingBudgetItemId = idObject.WEDDINGBUDGETITEMID;
                    _items.push(_item);
                    setItems(_items);
                    setItemDialog(false);
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
                onClick={hideBudgetDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
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
                onClick={hideItemDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
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
                <HeartyNavbar></HeartyNavbar>
                <Card className="flex justify-content-center">
                    <h3>
                        Budget:{" "}
                        {budget.budget.toLocaleString("en-SG", {
                            style: "currency",
                            currency: "SGD",
                        })}
                    </h3>
                    <Button label="edit" onClick={showBudgetDialog} />
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
                    ></Button>
                </Card>
            </div>

            <div>
                <DataTable
                    value={items}
                    header="Wedding Budget"
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
                    <Column field="weddingBudgetItemId" header="No."></Column>
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
                    <Checkbox
                        id="isPaid"
                        checked={item.isPaid}
                        onChange={(e) => onInputPaidChange(e, "isPaid")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !item.isPaid,
                        })}
                    />
                    {submitted && !item.isPaid && (
                        <small className="p-error">
                            Item Payment Status is required.
                        </small>
                    )}
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
