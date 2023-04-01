const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/tablemanagement";
const TableApi = {
    createTable(data, wId) {
        
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
    getTables(wId) {
        return fetch(`${SERVER_PREFIX}/query?` + new URLSearchParams({  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
            "weddingId": wId
        })).then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw new Error();
            }

        }).catch(error => {
            throw error;
        })
    },
    updateTables(tables, wId) {
        fetch(`${SERVER_PREFIX}/saveTables/${wId}`, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(tables)
          
            }).then(response => {
                console.log("success");
                return response;
            }).catch(error => {
                throw error;
            })
    }
};
export default TableApi;