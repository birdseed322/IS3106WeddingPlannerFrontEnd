const SERVER_PREFIX =
  "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";
const Api = {

  getAllVendorsInCategory(category) {
    console.log("inside vendor api, category = " + category);
    return fetch(`${SERVER_PREFIX}/allCategories/${category}`);
  },

  getAllVendors() {
    return fetch(`${SERVER_PREFIX}/guestmanagement/query`);
  },
};
export default Api;
