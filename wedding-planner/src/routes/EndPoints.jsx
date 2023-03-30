import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login Page/Login.jsx";
import FrontPage from "../components/FrontPage/FrontPage.jsx";
import Sample from "../Sample.jsx";
import VendorRequest from "../components/VendorView/Request Page/VendorRequest.jsx";
import SearchPage from "../components/VendorManagement/SearchPage.jsx";
import VendorDetailpage from "../components/VendorManagement/VendorDetailPage.jsx";
import CategoryDisplayPage from "../components/VendorManagement/CategoryDisplayPage.jsx";
import AdminUserManagement from "../components/AdminUserManagement/AdminUserManagement.jsx";
import GuestList from "../components/GuestManagement/GuestList.jsx";
import TableLayout from "../components/GuestManagement/TableLayout.jsx";
import WeddingChecklist from "../components/LogisticsManagement/WeddingChecklist.jsx";
import WeddingBudgetPlanner from "../components/LogisticsManagement/WeddingBudgetPlanner.jsx";
// Component to handle routing. Take note of the format of the pathing and how to add a Route (url endpoint). Login component is created as an example.

function EndPoints() {
    // FOR IMPLEMENTING LOGIN: work in progress!!
    // const [token, setToken] = useState();

    // if(!token) {
    //     return(
    //     <BrowserRouter>
    //         <Routes>
    //             <Route exact path="/"  element={<FrontPage />}/>
    //             <Route exact path="/login" element={<Login setToken={setToken} />} />
    //         </Routes>
    //     </BrowserRouter>)
    //   }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<FrontPage />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/sample" element={<Sample />} />
                    <Route
                        exact
                        path="/vendor/request"
                        element={<VendorRequest />}
                    />
                    <Route
                        exact
                        path="/AdminUserManagement"
                        element={<AdminUserManagement />}
                    />
                    <Route
                        exact
                        path="/LogisticsManagement/WeddingChecklist"
                        element={<WeddingChecklist />}
                    />
                    <Route
                        exact
                        path="/LogisticsManagement/WeddingBudgetPlanner"
                        element={<WeddingBudgetPlanner />}
                    />
                    <Route
                        exact
                        path="/VendorSearchPage"
                        element={<SearchPage />}
                    />
                    <Route
                        path="/VendorSearchPage/VendorName/:vendorName"
                        element={<VendorDetailpage />}
                    />
                    <Route
                        path="/VendorSearchPage/Category/:vendorCategory"
                        element={<CategoryDisplayPage />}
                    />
                    <Route exact path="/guestlist" element={<TableLayout />} />
                    <Route exact path="/guestlist" element={<GuestList />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default EndPoints;
