const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources";
const Api = {
        createGuest(data, wId) {
            return fetch(`${SERVER_PREFIX}/guestmanagement/${wId}`, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                    });
        },
updateGuest(data, wId) {
return fetch(`${SERVER_PREFIX}/customers/${wId}`, {
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
deleteCustomer(cId) {
return fetch(`${SERVER_PREFIX}/customers/${cId}`, {
method: "DELETE",
});
},
getAllCustomers() {
return fetch(`${SERVER_PREFIX}/customers`);
},
};
export default Api