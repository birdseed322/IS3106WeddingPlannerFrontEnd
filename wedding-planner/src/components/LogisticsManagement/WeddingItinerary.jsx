import React from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";

export default function WeddingItinerary() {
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <p>Wedding Checklist</p>
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
    return;
}
