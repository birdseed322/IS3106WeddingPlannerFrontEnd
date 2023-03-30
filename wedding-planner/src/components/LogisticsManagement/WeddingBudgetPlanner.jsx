import React, { useState } from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

export default function WeddingBudgetPlanner() {
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <h2>Budget Planner</h2>
                </div>
                <>
                    <BudgetPlannerPage></BudgetPlannerPage>
                </>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>
        </div>
    );
}

function BudgetPlannerPage() {
    const [showDialog, setShowDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [category, setCategory] = useState("");
    const [itemName, setItemName] = useState("");
    const [cost, setCost] = useState(0);

    const addItemDialog = () => {
        setShowDialog(true);
    };

    const onHide = () => {
        setShowDialog(!showDialog);
        setCategory("");
        setItemName("");
        setCost(0.0);
        setSubmitted(false);
    };

    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const onItemNameChange = (e) => {
        setItemName(e.target.value);
    };

    const onCostChange = (e) => {
        setCost(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // reset the form and hide the dialog
        if (itemName) {
            setCategory("");
            setItemName("");
            setCost("");
            setSubmitted(false);
            setShowDialog(false);
        }
    };

    // sample data
    const budget = 2000;
    let totalCost = () => {
        return BudgetPlannerPageData[0].logistics.reduce((acc, curr) => {
            return acc + curr.eventCost;
        }, 0);
    };

    let totalPaid = () => {
        return BudgetPlannerPageData[0].logistics.reduce((acc, curr) => {
            if (curr.paidStatus) {
                return acc + curr.eventCost;
            } else {
                return acc;
            }
        }, 0);
    };

    const BudgetPlannerPageData = [
        {
            logistics: [
                {
                    category: "Entertainment",
                    eventName: "Amazing Music Band",
                    eventCost: 250,
                    paidStatus: false,
                },
                {
                    category: "Food",
                    eventName: "Tan & Lee Catering",
                    eventCost: 600,
                    paidStatus: true,
                },
                {
                    category: "Food",
                    eventName: "Super Bartender and Drinks",
                    eventCost: 200,
                    paidStatus: true,
                },
            ],
        },
    ];

    const groupedByCategory = BudgetPlannerPageData[0].logistics.reduce(
        (acc, curr) => {
            const category = curr.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(curr);
            return acc;
        },
        {}
    );

    // sample
    const options = [
        { label: "Category 1", value: "category1" },
        { label: "Category 2", value: "category2" },
        { label: "Category 3", value: "category3" },
    ];
    return (
        <div>
            <div style={{ display: "flex" }}>
                <h4>Budget: {budget}</h4>
                <Button>Edit</Button>
            </div>
            <h4>Total Cost: {totalCost()}</h4>
            <h4>Total Paid: {totalPaid()}</h4>
            <Button onClick={addItemDialog}>Add Item</Button>
            {Object.entries(groupedByCategory).map(([category, logistics]) => (
                <div key={category}>
                    <h4>{category}</h4>
                    <ul>
                        {logistics.map((logistic) => (
                            <li key={logistic.eventName}>
                                {logistic.eventName} - {logistic.eventCost} (
                                {logistic.paidStatus ? "paid" : "unpaid"})
                            </li>
                        ))}
                    </ul>
                    <hr />
                </div>
            ))}

            <Dialog
                header="Add Item"
                visible={showDialog}
                onHide={onHide}
                modal
                draggable
                resizable
            >
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="category" className="font-bold">
                            Category:
                        </label>
                        <Dropdown
                            id="category"
                            value={category}
                            onChange={onCategoryChange}
                            options={options}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !category,
                            })}
                        />

                        <br />
                        <br />
                        <label htmlFor="itemName" className="font-bold">
                            Item Name:
                        </label>
                        <InputText
                            id="itemName"
                            value={itemName}
                            onChange={onItemNameChange}
                            required
                            className={classNames({
                                "p-invalid": submitted && !itemName,
                            })}
                        />

                        <br />
                        <br />
                        <label htmlFor="cost" className="font-bold">
                            Cost:
                        </label>
                        <InputText
                            id="cost"
                            value={cost}
                            onChange={onCostChange}
                            required
                            className={classNames({
                                "p-invalid": submitted && !cost,
                            })}
                        />
                    </div>
                    <Button type="submit" label="Add Item" />
                </form>
            </Dialog>
        </div>
    );
}
