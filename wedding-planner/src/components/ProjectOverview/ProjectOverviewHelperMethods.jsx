import WeddingProjectAPI from "./WeddingProjectAPI";

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
    if (dateObject == undefined) return "";

    return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
};

export const computeGuestInfo = (guestList) => {
    console.log("confirm that computeGuestInfo is called");

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
    guestInfo.total.notAttending =
        guestInfo.brideSide.notAttending + guestInfo.groomSide.notAttending;
    guestInfo.total.pending = guestInfo.brideSide.pending + guestInfo.groomSide.pending;
    guestInfo.total.notSent = guestInfo.brideSide.notSent + guestInfo.groomSide.notSent;

    console.log("logging right before returning guestInfo");
    console.log(guestInfo);

    return guestInfo;
};

export const computeRequestsInfo = (requestsList) => {
    const requestsInfo = {
        pending: 0,
        rejected: 0,
        accepted: 0,
        total: 0,
    };

    requestsList.forEach((req) => {
        requestsInfo.total++;
        if (req.isAccepted == undefined) {
            requestsInfo.pending++;
        } else if (req.isAccepted == true) {
            requestsInfo.accepted++;
        } else {
            requestsInfo.rejected++;
        }
    });

    return requestsInfo;
};

export const fetchAndSetVendoTransObjectList = async (requestsList, setVendoTransObjectList) => {
    // const vendorsPaidCostAndTotalCost = [0, 0];

    // we go thru the requests, and find the ACCEPTED requests.
    // then for each request, we traverse and find the associated Transaction,
    // then we add all the cost of ACCEPTED requests to total cost.
    // and find out if the Transaction isPaid or not.
    // if it is paid, we add to the PaidCost.

    const acceptedRequests = requestsList.filter((request) => request.isAccepted);
    console.log(acceptedRequests);

    // returns a Promise with value [[vendor1, transaction1], [vendor2, transaction2], ...]
    const vendorsAndTransactionsPromises = acceptedRequests.map((req) =>
        Promise.all([
            WeddingProjectAPI.getVendorOfRequest(req.requestId).then((res) => res.json()),
            WeddingProjectAPI.getTransactionOfAcceptedRequest(req.requestId).then((res) =>
                res.json()
            ),
        ])
    );
    // gets the 2d array out of the promise
    const vendorsAndTransactions2DArray = await Promise.all(vendorsAndTransactionsPromises);
    // maps the 2d array to a 1d array and converts 2nd layer into an object
    const vendoTransObjectList = vendorsAndTransactions2DArray.map(([vendor, transaction]) => {
        return {
            vendor: vendor,
            transaction: transaction,
        };
    });

    console.log(vendoTransObjectList);

    setVendoTransObjectList(vendoTransObjectList);
};

export const computeAndSetVendorsPaidAndTotalCost = (vendoTransObjectData, setData) => {
    const paidAndTotalCost = [0, 0];

    vendoTransObjectData.forEach(({ transaction }) => {
        // console.log('logging transaction')
        // console.log(transaction);
        if (transaction?.totalPrice != undefined) {
            paidAndTotalCost[1] += transaction.totalPrice;
            if (transaction.isPaid) {
                paidAndTotalCost[0] += transaction.totalPrice;
            }
        }
    });

    setData(paidAndTotalCost);
};

export const generateVendorCostPieChartData = (vendoTransObjectData, setPieChartData) => {
    const vendorUsernameArray = [];
    const transactionCostArray = [];

    vendoTransObjectData.forEach((pairObject) => {
        if (
            pairObject.transaction?.totalPrice != undefined
        ) {
            vendorUsernameArray.push(pairObject.vendor.username);
            transactionCostArray.push(pairObject.transaction.totalPrice);
        }
    });

    const pieChartData = {
        labels: vendorUsernameArray,
        // labels: ['foo', 'bar', 'baz'],
        datasets: [
            {
                // label: "Vendor Categories",
                data: transactionCostArray,
                // data: [1,2,3],
                // credit to chatGPT for coming up with this amazing solution for colours
                backgroundColor: vendorUsernameArray.map(
                    (_, index) => `hsl(${220 + ((index * 71) % 360)}, 70%, 50%)`
                ),
                hoverOffset: 4,
            },
        ],
    };
    setPieChartData(pieChartData);
};

export const requestAndComputeHiredVendors = async (requestsList, setHiredVendors) => {
    const promises = requestsList
        .filter((req) => req.isAccepted)
        .map((req) =>
            WeddingProjectAPI.getVendorOfRequest(req.requestId).then((res) => res.json())
        );

    const hiredVendorsList = await Promise.all(promises);

    setHiredVendors(hiredVendorsList);
    console.log("logging hired vendors");
    console.log(hiredVendorsList);
};

export const itineraryComparator = (a, b) => {
    if (a == b) {
        return 0;
    }
    const aEventDate = new Date(
        a.eventDate.getFullYear(),
        a.eventDate.getMonth(),
        a.eventDate.getDate()
    );
    const bEventDate = new Date(
        b.eventDate.getFullYear(),
        b.eventDate.getMonth(),
        b.eventDate.getDate()
    );

    if (aEventDate - bEventDate < 0) {
        return -1;
    } else if (aEventDate - bEventDate > 0) {
        return 1;
    } else {
        const aEventStartTime = new Date(0);
        aEventStartTime.setHours(a.eventStartTime.getHours());
        aEventStartTime.setMinutes(a.eventStartTime.getMinutes());
        const bEventStartTime = new Date(0);
        bEventStartTime.setHours(b.eventStartTime.getHours());
        bEventStartTime.setMinutes(b.eventStartTime.getMinutes());

        if (aEventStartTime - bEventStartTime < 0) {
            return -1;
        } else if (aEventStartTime - bEventStartTime > 0) {
            return 1;
        } else {
            return 0;
        }
    }
};
