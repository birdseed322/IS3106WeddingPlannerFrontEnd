

const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/guestmanagement";
const Api = {
           createGuest(data, wId) {
                //const controller = new AbortController();
                //const signal = controller.signal;
                //const timer = setTimeout(controller.abort(), 5000);  //timer abort credits to chatgpt
                
           return fetch(`${SERVER_PREFIX}/${wId}`, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                    /*
                    {
                        name : "Ezzzz",
                        rsvp : "NOTSENT",
                        email : "AAwsw",
                        numPax : 10,
                        attendingSide : "BRIDE"
                    }
                    */
                    }).then(response => {
                        //clearTimeout(timer);                    
                        return response;
                    }).catch(error => {
                        //clearTimeout(timer);
                        throw error;
                    })
        },
        updateGuest(data) {
                return fetch(`${SERVER_PREFIX}`, {
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(data)
                }).then((response) => {
                        return response;
                }).catch((error) => {
                        return error;
                })
        },
        updateGuestsRSVP(data) {
                return fetch(`${SERVER_PREFIX}/changersvp`, {
                headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        },
                method: "PUT",
                body: JSON.stringify(data)
                }).then((response) => {
                        return response;
                }).catch((error) => {
                        return error;
                })
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
                }).then(response => {
                        return response;
                }).catch(error => {
                        return error;
                });
        },
        
        getAllGuests(wId) {
                return fetch(`${SERVER_PREFIX}/query?` + new URLSearchParams({  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
                        "wId" : wId
                })).then(response => {
                        console.log(response);
                        if (response.status === 200) {
                                return response;
                        } else {
                                throw new Error();
                        }
                        
                }).catch(error => {
                        throw error;
                });
        },
};
export default Api