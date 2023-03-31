const SERVER_PREFIX =
  "http://localhost:8080/IS3106WeddingPlanner-war/webresources";
const AdminUserManagementAPI = {

  getAllVendors() {
    return fetch(`${SERVER_PREFIX}/vendors`);
  },
  
  getAllWeddingOrganisers() {
    return fetch(`${SERVER_PREFIX}/wedding-organisers`)
  }
};
export default AdminUserManagementAPI;
