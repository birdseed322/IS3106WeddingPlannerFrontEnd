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

    getWeddingChecklistByWeddingProjectId(projectId) {
        return fetch(
            `${SERVER_PREFIX}/checklist/getByWeddingProject/${projectId}`
        );
    },

    getParentTaskByWeddingChecklist(checklistId) {
        return fetch(`${SERVER_PREFIX}/tasks/${checklistId}`);
    },

    createParentTask(data, checklistId) {
        return fetch(`${SERVER_PREFIX}/${checklistId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    createSubtask(data, parentTaskId) {
        return fetch(`${SERVER_PREFIX}/subtask/${parentTaskId}`, {
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

    getAllSubTasks() {
        return fetch(`${SERVER_PREFIX}/subtasks`);
    },

    // getAllSubTasks(weddingParentTaskId) {
    //     return fetch(`${SERVER_PREFIX}/subtasks/${weddingParentTaskId}`);
    // },

    updateParentTask(data) {
        return fetch(`${SERVER_PREFIX}/update/parentTask`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    updateSubtask(data) {
        return fetch(`${SERVER_PREFIX}/update/subtask`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteParentTask(parentTaskId) {
        return fetch(`${SERVER_PREFIX}/task/${parentTaskId}`, {
            method: "DELETE",
        });
    },

    deleteSubtask(subtaskId) {
        return fetch(`${SERVER_PREFIX}/subtask/${subtaskId}`, {
            method: "DELETE",
        });
    },
};

export default WeddingChecklistAPI;
