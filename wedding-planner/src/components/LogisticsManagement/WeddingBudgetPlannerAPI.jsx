const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/LogisticsManagement/WeddingBudget";

const WeddingBudgetPlannerAPI = {
    createBudget(data, weddingProjectId) {
        return fetch(`${SERVER_PREFIX}/create/${weddingProjectId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    createItem(data, weddingBudgetListId) {
        return fetch(`${SERVER_PREFIX}/${weddingBudgetListId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    retrieveAllBudgets() {
        return fetch(`${SERVER_PREFIX}/budgets`);
    },

    retrieveBudget(weddingBudgetListId) {
        return fetch(`${SERVER_PREFIX}/budget/${weddingBudgetListId}`);
    },

    getBudgetByWeddingProject(weddingProjectId) {
        return fetch(
            `${SERVER_PREFIX}/getBudgetByWeddingProject/${weddingProjectId}`
        );
    },

    retrieveAllItems() {
        return fetch(`${SERVER_PREFIX}/items`);
    },

    retrieveItem(weddingBudgetItemId) {
        return fetch(`${SERVER_PREFIX}/${weddingBudgetItemId}`);
    },

    updateBudget(data) {
        return fetch(`${SERVER_PREFIX}/update/budget`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    updateItem(data) {
        return fetch(`${SERVER_PREFIX}/update/item`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteItem(weddingBudgetItemId) {
        return fetch(`${SERVER_PREFIX}/${weddingBudgetItemId}`, {
            method: "DELETE",
        });
    },
};

export default WeddingBudgetPlannerAPI;
