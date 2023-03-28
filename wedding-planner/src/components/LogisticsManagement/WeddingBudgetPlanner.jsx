import React from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";

export default function WeddingBudgetPlanner() {
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <p>Wedding Checklist</p>
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
    // sample data
    const BudgetPlannerPageData = [
        {
            budget: "$20,000.00",
            totalCost: "$15,250.00",
            totalPaid: "$1,500.00",
            logistics: [
                {
                    category: "Entertainment",
                    eventName: "Amazing Music Band",
                    eventCost: "$250.00",
                    paidStatus: NO,
                },
                {
                    category: "Food",
                    eventName: "Tan & Lee Catering",
                    eventCost: "$600.00",
                    paidStatus: YES,
                },
                {
                    category: "Food",
                    eventName: "Super Bartender and Drinks",
                    eventCost: "$200.00",
                    paidStatus: YES,
                },
            ],
        },
    ];

    return (
        <div>
            <h1>Budget Planner</h1>
            <h4>Budget: {budget}</h4>
        </div>
    );
}
