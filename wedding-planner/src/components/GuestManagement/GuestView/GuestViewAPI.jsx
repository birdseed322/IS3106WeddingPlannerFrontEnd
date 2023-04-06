const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/guestview?";

const GuestViewAPI = {
    getGuest(email, weddingId) {
        return fetch(`http://localhost:8080/IS3106WeddingPlanner-war/webresources/guestview?` + new URLSearchParams({  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
        "weddingId" : weddingId,
        "email" : email.trim()
        }));
    }
};
export default GuestViewAPI;