const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/wedding-projects";

const NORMAL_WEBRESOURCES_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources";

const WeddingProjectAPI = {
    getAllWeddingProjects() {
        return fetch(`${SERVER_PREFIX}/`);
    },

    getWeddingProjectById(id) {
        return fetch(`${SERVER_PREFIX}/${id}`);
    },

    // isCompleted here is optional, defaults to undefined
    getWeddingProjectsByWeddingOrganiserId(orgId, isCompleted) {
        if (isCompleted == undefined) {
            return fetch(`${SERVER_PREFIX}/query?wedding-organiser-id=${orgId}`);
        } else {
            return fetch(
                `${SERVER_PREFIX}/query?wedding-organiser-id=${orgId}&isCompleted=${isCompleted}`
            );
        }
    },
    
    getWeddingChecklistByWeddingProjectId(projectId) {
      return fetch(`${NORMAL_WEBRESOURCES_PREFIX}/LogisticsManagement/WeddingChecklist/checklist/getByWeddingProject/${projectId}`);
    },
    getRequestsByWeddingProjectId(projectId) {
      return fetch(`${NORMAL_WEBRESOURCES_PREFIX}/requests/weddingProjectRequests/${projectId}`);
    },
    
    getVendorOfRequest(requestId) {
      return fetch(`${NORMAL_WEBRESOURCES_PREFIX}/vendors/getByRequest/${requestId}`);
    },
    
    getTransactionOfAcceptedRequest(requestId) {
      return fetch(`${NORMAL_WEBRESOURCES_PREFIX}/transactions/getByRequest/${requestId}`);
    },

    updateWeddingProject(weddingProject) {
        return fetch(`${SERVER_PREFIX}/`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(weddingProject),
        });
    },

    createWeddingProject(orgId, weddingProject) {
        return fetch(`${SERVER_PREFIX}/query?wedding-organiser-id=${orgId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(weddingProject),
        });
    },

};
export default WeddingProjectAPI;
