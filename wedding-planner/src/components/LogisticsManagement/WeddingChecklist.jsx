import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import React, { useState } from "react";
import "../../App.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function WeddingChecklist() {
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <p>Wedding Checklist</p>
                </div>
                <>
                    <Checklist></Checklist>
                </>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>
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
        <div style={{ padding: "10px" }}>
            {sampleChecklistData.map((data, index) => (
                <>
                    <Card
                        key={index}
                        className={index === expanded ? "expanded" : ""}
                        title={data.title}
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
    );
}
