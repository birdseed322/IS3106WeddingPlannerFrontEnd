const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/weddingchecklist";

const WeddingChecklistAPI = {
    getWeddingChecklist(checklistId) {
        return fetch(`${SERVER_PREFIX}/weddingchecklist/${checklistId}`);
    },

    createTask(data, checklistId) {
        return fetch(`${SERVER_PREFIX}/weddingchecklist/${checklistId}/task`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};

export default WeddingChecklistAPI;
