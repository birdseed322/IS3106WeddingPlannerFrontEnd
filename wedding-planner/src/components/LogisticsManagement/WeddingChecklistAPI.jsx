const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/LogisticsManagement/WeddingChecklist";

const WeddingChecklistAPI = {
    createWeddingChecklist(data, weddingProjectId) {
        return fetch(`${SERVER_PREFIX}/create/${weddingProjectId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    getAllWeddingChecklists() {
        return fetch(`${SERVER_PREFIX}/checklists`);
    },

    getWeddingChecklist(checklistId) {
        return fetch(`${SERVER_PREFIX}/checklist/${checklistId}`);
    },

    createTask(data, checklistId) {
        return fetch(`${SERVER_PREFIX}/${checklistId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    getAllParentTasks() {
        return fetch(`${SERVER_PREFIX}/tasks`);
    },

    getAllSubTasks(parentTaskId) {
        return fetch(`${SERVER_PREFIX}/subtasks/${parentTaskId}`);
    },

    updateTask(data) {
        return fetch(`${SERVER_PREFIX}/update/task`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },
};

export default WeddingChecklistAPI;
