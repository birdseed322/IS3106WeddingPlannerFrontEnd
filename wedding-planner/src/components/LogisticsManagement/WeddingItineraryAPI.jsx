const SERVER_PREFIX =
    "http://localhost:8080/IS3106WeddingPlanner-war/webresources/LogisticsManagement/WeddingItinerary";

const WeddingItineraryAPI = {
    createNewItinerary(data, weddingProjectId) {
        return fetch(`${SERVER_PREFIX}/create/${weddingProjectId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    getAllItineraries() {
        return fetch(`${SERVER_PREFIX}/itineraries`);
    },

    getItinerary(weddingItineraryId) {
        return fetch(`${SERVER_PREFIX}/${weddingItineraryId}`);
    },

    getItinerariesByWeddingProject(weddingProjectId) {
        return fetch(
            `${SERVER_PREFIX}/getItinerariesByWeddingProject/${weddingProjectId}`
        );
    },

    updateItinerary(data) {
        return fetch(`${SERVER_PREFIX}/update/itinerary`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteItinerary(weddingItineraryId) {
        return fetch(`${SERVER_PREFIX}/${weddingItineraryId}`, {
            method: "DELETE",
        });
    },
};

export default WeddingItineraryAPI;
