const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/guestmanagement";
const Api = {
        createGuest(data, wId) {
            return fetch(`${SERVER_PREFIX}/${wId}`, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                    /*
                    {
                        name : "Ezzzz",
                        rsvp : "NOTSENT",
                        email : "AAwsw",
                        numPax : 10,
                        attendingSide : "BRIDE"
                    }
                    */
                    });
        },
        updateGuest(data, wId) {
                return fetch(`${SERVER_PREFIX}/${wId}`, {
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(data),
                });
        },
getCustomer(cId) {
return fetch(`${SERVER_PREFIX}/customers/${cId}`);
},
addField(cId, data) {
return fetch(`${SERVER_PREFIX}/customers/${cId}/fields`, {
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(data),
});
},
addContact(cId, data) {
return fetch(`${SERVER_PREFIX}/customers/${cId}/contacts`, {
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(data),
});
},
deleteField(cId, fId) {
return fetch(`${SERVER_PREFIX}/customers/${cId}/fields/${fId}`, {
method: "DELETE",
});
},
deleteContact(contactId) {
return fetch(`${SERVER_PREFIX}/contacts/${contactId}`, {
method: "DELETE",
});
},
        deleteGuest(gId) {
                return fetch(`${SERVER_PREFIX}/${gId}`, {
                method: "DELETE",
                });
        },
        
        getAllCustomers() {
        return fetch(`${SERVER_PREFIX}/guestmanagement/query`);
        },
};
export default Api