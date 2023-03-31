const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources";
const AdminUserManagementAPI = {
    getAllVendors() {
        return fetch(`${SERVER_PREFIX}/vendors`);
    },

    getAllWeddingOrganisers() {
        return fetch(`${SERVER_PREFIX}/wedding-organisers`);
    },

    updateOneVendor(vendor) {
        return fetch(`${SERVER_PREFIX}/vendors`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(vendor),
        });
    },
    
    // updateListOfVendors(vendors) {
    //     // this is super inefficient because it makes 1 request per vendor LMAO
    //     for (let vendor of vendors) {
    //         this.updateOneVendor(vendor);
    //     }
    //     // also doesnt return a response, unless we want a list of responses?
    // },
    
    updateOneWeddingOrganiser(organiser) {
        return fetch(`${SERVER_PREFIX}/wedding-organisers`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(organiser),
        });
    },
    // updateListOfWeddingOrganisers(organisers) {
    //     // this is super inefficient because it makes 1 request per org LMAO
    //     for (let organiser of organisers) {
    //         this.updateOneWeddingOrganiser(organiser);
    //     }
    //     // also doesnt return a response, unless we want a list of responses?
    // },
};
export default AdminUserManagementAPI;
