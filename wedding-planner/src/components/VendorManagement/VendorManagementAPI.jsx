const WEDDING_SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/wedding-projects";
const REQUEST_SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/createRequest";
const BASE_REQUEST_SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests";


const VendorApi = {
           createRequest(data, projectId, vendorId) {
            const createRequestUrl = REQUEST_SERVER_PREFIX+
            `?projId=${projectId}`+ 
            `&vendorId=${vendorId}`

           return fetch(`${createRequestUrl}`,
            {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data)

                    })
        }, fetchWeddingDetails(pId){
            return fetch(`${WEDDING_SERVER_PREFIX}/${pId}`).then(response => {
                if (response.status === 200) {
                    return response;
                } else {
                    throw new Error();
                }
    
            }).catch(error => {
                throw error;
            });
        },
        checkIfRequestExists(projectId, vendorId){
            const url = BASE_REQUEST_SERVER_PREFIX+
            `?weddingProjId=${projectId}`+ 
            `&vendorId=${vendorId}`

            return fetch(`${url}`).then(
                response => {
                    return response; 
                }
            ).catch(error => {
                throw error;
            })
        }
    }
    export default VendorApi;