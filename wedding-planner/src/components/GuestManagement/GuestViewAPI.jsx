

const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/LogisticsManagement/WeddingItinerary";
const GuestViewAPI = {   
        getItinerary(wId) {
                return fetch(`${SERVER_PREFIX}/wedding/${wId}`).then(response => {
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
export default GuestViewAPI