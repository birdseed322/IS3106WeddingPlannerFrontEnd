export const computeGuestInfo = (guestList) => {
    const guestInfo = {
        total: {
            confirmed: 0,
            notAttending: 0,
            pending: 0,
            notSent: 0,
        },
        brideSide: {
            confirmed: 0,
            notAttending: 0,
            pending: 0,
            notSent: 0,
        },
        groomSide: {
            confirmed: 0,
            notAttending: 0,
            pending: 0,
            notSent: 0,
        },
    };
    
    if (Object.keys(guestList).length == 0) {
        return guestInfo;
    }

    guestList.forEach((guest) => {
        if (guest.attendingSide == "BRIDE") {
            switch (guest.rsvp) {
                case "CONFIRMED":
                    guestInfo.brideSide.confirmed += guest.numPax;
                    break;
                case "NOTATTENDING":
                    guestInfo.brideSide.notAttending += guest.numPax;
                    break;
                case "PENDING":
                    guestInfo.brideSide.pending += guest.numPax;
                    break;
                case "NOTSENT":
                    guestInfo.brideSide.notSent += guest.numPax;
                    break;
            }
        } else {
            switch (guest.rsvp) {
                case "CONFIRMED":
                    guestInfo.groomSide.confirmed += guest.numPax;
                    break;
                case "NOTATTENDING":
                    guestInfo.groomSide.notAttending += guest.numPax;
                    break;
                case "PENDING":
                    guestInfo.groomSide.pending += guest.numPax;
                    break;
                case "NOTSENT":
                    guestInfo.groomSide.notSent += guest.numPax;
                    break;
            }
        }
    });
    
    guestInfo.total.confirmed = guestInfo.brideSide.confirmed + guestInfo.groomSide.confirmed;
    guestInfo.total.notAttending = guestInfo.brideSide.notAttending + guestInfo.groomSide.notAttending;
    guestInfo.total.pending = guestInfo.brideSide.pending + guestInfo.groomSide.pending;
    guestInfo.total.notSent = guestInfo.brideSide.notSent + guestInfo.groomSide.notSent;
    
    return guestInfo;
};
