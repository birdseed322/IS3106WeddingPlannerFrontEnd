import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login Page/Login.jsx";
import FrontPage from "../components/FrontPage/FrontPage.jsx";
import Sample from "../Sample.jsx";
import VendorRequest from "../components/VendorView/Request Page/VendorRequest.jsx";
import Schedule from "../components/VendorView/Schedule Page/Schedule.jsx";
import SearchPage from "../components/VendorManagement/SearchPage.jsx";
import VendorDetailpage from "../components/VendorManagement/VendorDetailPage.jsx";
import CategoryDisplayPage from "../components/VendorManagement/CategoryDisplayPage.jsx";
import AdminUserManagement from "../components/AdminUserManagement/AdminUserManagement.jsx";
import GuestList from "../components/GuestManagement/GuestList.jsx";
import TableLayout from "../components/GuestManagement/TableLayout.jsx";
import WeddingChecklist from "../components/LogisticsManagement/WeddingChecklist.jsx";
import WeddingBudgetPlanner from "../components/LogisticsManagement/WeddingBudgetPlanner.jsx";
import WeddingItinerary from "../components/LogisticsManagement/WeddingItinerary.jsx";
import Homepage from "../components/UnregisteredView/Homepage.jsx";
import Contact from "../components/UnregisteredView/Contact.jsx";
import SignUp from "../components/UnregisteredView/SignUp.jsx";
import AboutUs from "../components/UnregisteredView/AboutUs.jsx";
import VendorLogin from "../components/Login Page/VendorLogin.jsx";
import ViewProfile from "../components/Profiles/ViewProfile.jsx";
import EditProfile from "../components/Profiles/EditProfile.jsx";
import ProjectDashboard from "../components/ProjectDashboard/ProjectDashboard.jsx";
import LoginAPI from "../components/Login Page/LoginAPI.jsx";
import useToken from "../useToken.jsx";
import { LoginTokenContext } from "../context/LoginTokenContext.jsx";
import ProjectOverview from "../components/ProjectOverview/ProjectOverview.jsx";

import RSVPForm from "../components/GuestManagement/RSVPForm.jsx";
import TestingImageFunctions from "../components/testingImageFunctions.js";
// Component to handle routing. Take note of the format of the pathing and how to add a Route (url endpoint). Login component is created as an example.
import GuestView from "../components/GuestManagement/GuestView.jsx";
import GuestViewItinerary from "../components/GuestManagement/GuestViewItinerary.jsx";
import GuestViewNavbar from "../components/HeartyNavbar/GuestViewNavbar.jsx";
import GuestQuery from "../components/GuestManagement/GuestQuery.jsx";
function EndPoints() {
    // for debugging, clear localStorage
    // localStorage.clear();

    // note that the {} object syntax instead of the typical [] array is intended
    // although we could just as easily use [] lol
    
    const { token, setToken } = useToken();
    console.log(token);
    if (!token) {
        return (
            <LoginTokenContext.Provider value={[token, setToken]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/guestview/:weddingId">
                        <Route index element={<GuestQuery></GuestQuery>}/>
                        <Route path="itinerary" element={<GuestViewItinerary></GuestViewItinerary>}/>
                        <Route path="seatplan" element={<GuestView></GuestView>}/>
                    </Route>
                    <Route path="/rsvpForm/:weddingId" element={<RSVPForm></RSVPForm>}></Route>
                    <Route path="/*" element={<Login setToken={setToken} />} />
                    <Route exact path="/VendorSearchPage" element={<SearchPage />} />
                            <Route
                                path="/VendorSearchPage/VendorName/:vendorName"
                                element={<VendorDetailpage />}
                            />
                            <Route
                                path="/VendorSearchPage/Category/:vendorCategory"
                                element={<CategoryDisplayPage />}
                            />
                    <Route path = "/testFirebase" element = {<TestingImageFunctions/>}></Route>
                </Routes>
            </BrowserRouter>
            </LoginTokenContext.Provider>
        );
    }

    switch (token.userType) {
        case "ADMIN":
            return (
                <>
                    <LoginTokenContext.Provider value={[token, setToken]}>
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/" element={<FrontPage />} />
                                <Route exact path="/login" element={<Login />} />
                                <Route
                                    exact
                                    path="/AdminUserManagement"
                                    element={<AdminUserManagement />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </LoginTokenContext.Provider>
                </>
            );
            break;
            
        case "WEDDING-ORGANISER":
            //http://localhost:3000/1/guestlist -> ROUTING PATTERN localhost:3000/:projectId/yourPage
            return (
                <LoginTokenContext.Provider value={[token, setToken]}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ProjectDashboard />} />
                            <Route path="/:projectId/">
                                <Route index element={<ProjectOverview />} />
                                    <Route
                                        path="LogisticsManagement/WeddingChecklist"
                                        element={<WeddingChecklist />}
                                    />
                                    <Route
                                        
                                        path="LogisticsManagement/WeddingBudgetPlanner"
                                        element={<WeddingBudgetPlanner />}
                                    />
                                    <Route
                                        
                                        path="LogisticsManagement/WeddingItinerary"
                                        element={<WeddingItinerary />}
                                    />
                                    <Route path="VendorSearchPage" element={<SearchPage />} />
                                    <Route
                                        path="VendorSearchPage/VendorName/:vendorName"
                                        element={<VendorDetailpage />}
                                    />
                                    <Route
                                        path="VendorSearchPage/Category/:vendorCategory"
                                        element={<CategoryDisplayPage />}
                                    />
                                    <Route path="tablelayout" element={<TableLayout />} />
                                    <Route path="guestlist" element={<GuestList />} />
                                    <Route path="homepage" element={<Homepage />} />
                                    <Route path="aboutuspage" element={<AboutUs />} />
                                    <Route path="contactpage" element={<Contact />} />
                                    <Route path="signup" element={<SignUp />} />
                                    <Route path="viewprofile" element={<ViewProfile />} />
                                    <Route path="editprofile" element={<EditProfile />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </LoginTokenContext.Provider>
            );
            break;
        case "VENDOR":
            //stuff
            return (
                <>
                    <LoginTokenContext.Provider value={[token, setToken]}>
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/" element={<VendorRequest />} />
                                <Route exact path="/schedule" element={<Schedule />} />
                            </Routes>
                        </BrowserRouter>
                    </LoginTokenContext.Provider>
                    ;
                </>
            );

            break;
    }
}

export default EndPoints;
