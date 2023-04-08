export const dateProcessor = (dateString) => {
    if (typeof dateString === "string") {
        // it works without this if-else but just in case sth goes wrong:
        if (dateString[dateString.length - 1] == "]") {
            return new Date(dateString.slice(0, -5));
        } else {
            return new Date(dateString);
        }
    } else {
        return undefined;
    }
};

export const dateFormatter = (dateObject) => {
    if (dateObject == undefined) return '';
    
    return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
}

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

export const computeRequestsInfo = (requestsList) => {
    
    const requestsInfo = {
        pending: 0,
        rejected: 0,
        accepted: 0,
        total: 0,
    }
    
    requestsList.forEach((req) => {
        requestsInfo.total++;
        if (req.isAccepted == undefined) {
            requestsInfo.pending++;
        } else if (req.isAccepted == true) {
            requestsInfo.accepted++;
        } else {
            requestsInfo.rejected++;
        }
    })
    
    return requestsInfo;
}