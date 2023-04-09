import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const BrideGroomGuestsDataTable = ({ guestNumberInfo }) => {
    const [formattedInfo, setFormattedInfo] = useState([]);

    useEffect(() => {
        // const guestNumberInfo = {
        //     total: {
        //         confirmed: 0,
        //         notAttending: 0,
        //         pending: 0,
        //         notSent: 0
        //     },
        //     bride: {
        //         confirmed: 0,
        //         notAttending: 0,
        //         pending: 0,
        //         notSent: 0
        //     },
        //     groom: {
        //         confirmed: 0,
        //         notAttending: 0,
        //         pending: 0,
        //         notSent: 0
        //     },
        // }

        const copyTotal = { ...guestNumberInfo.total };
        const copyBride = { ...guestNumberInfo.brideSide };
        const copyGroom = { ...guestNumberInfo.groomSide };
        // const copyTotal = {...testGuests.total};
        // const copyBride = {...testGuests.bride};
        // const copyGroom = {...testGuests.groom};
        console.log(copyTotal);

        copyTotal.id = "Total";
        copyBride.id = "Bride";
        copyGroom.id = "Groom";

        const convertedGuestInfo = [copyBride, copyGroom, copyTotal];

        setFormattedInfo(convertedGuestInfo);
    }, [guestNumberInfo]);

    const idTemplate = (rowData) => {
        return <b>{rowData.id}</b>;
    };

    const headerText = (
        <div style={{ textAlign: "center" }}>
            <b>Guests Status</b>
        </div>
    );
    return (
        <div>
            <div className="card">
                <DataTable value={formattedInfo} header={headerText} responsiveLayout="scroll">
                    <Column field="id" header="" body={idTemplate}></Column>
                    <Column field="confirmed" header="Confirmed"></Column>
                    <Column field="notAttending" header="Not Attending"></Column>
                    <Column field="pending" header="Pending"></Column>
                    <Column field="notSent" header="Not Sent"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default BrideGroomGuestsDataTable;
