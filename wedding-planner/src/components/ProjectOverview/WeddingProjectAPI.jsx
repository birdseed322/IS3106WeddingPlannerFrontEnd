const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/wedding-projects";
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
            return fetch(`${SERVER_PREFIX}/query?wedding-organiser-id=${orgId}&isCompleted=${isCompleted}`)
        }
    },

    // updateListOfVendors(vendors) {
    //     // this is super inefficient because it makes 1 request per vendor LMAO
    //     for (let vendor of vendors) {
    //         this.updateOneVendor(vendor);
    //     }
    //     // also doesnt return a response, unless we want a list of responses?
    // },

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

    createWeddingProject(weddingProject, orgId) {
        return fetch(`${SERVER_PREFIX}/query?wedding-organiser-id=${orgId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(weddingProject),
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
export default WeddingProjectAPI;
