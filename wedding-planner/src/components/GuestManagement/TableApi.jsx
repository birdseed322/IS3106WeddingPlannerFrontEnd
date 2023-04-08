const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources";
const TableApi = {
    createStage(data, wId) {
        return fetch(`${SERVER_PREFIX}/stage/${wId}`, {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                    }).then(response => {
                        //clearTimeout(timer);                    
                        return response;
                    }).catch(error => {
                        //clearTimeout(timer);
                        throw error;
                    });
    },
    updateStages(stages, wId) {
        //console.log("tables " + tables);
        return fetch(`${SERVER_PREFIX}/stage/saveStages/${wId}`, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(stages)
          
            }).then(response => {
                //console.log("success");
                return response;
            }).catch(error => {
                throw error;
            });
    }, 
    getStages(wId) {
        return fetch(`${SERVER_PREFIX}/stage/query?` + new URLSearchParams({  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
            "weddingId": wId
        })).then(response => {
            
            if (response.status === 200) {
                return response;
            } else {
                throw new Error();
            }

        }).catch(error => {
            throw error;
        });
    },
    createTable(data, wId) {
    return fetch(`${SERVER_PREFIX}/tablemanagement/${wId}`, {
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
                });
    },
    getTables(wId) {
        return fetch(`${SERVER_PREFIX}/tablemanagement/query?` + new URLSearchParams({  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
            "weddingId": wId
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
    updateTables(tables, wId) {
        //console.log("tables " + tables);
        return fetch(`${SERVER_PREFIX}/tablemanagement/saveTables/${wId}`, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(tables)
          
            }).then(response => {
                //console.log("success");
                return response;
            }).catch(error => {
                throw error;
            });
    }
};
export default TableApi;