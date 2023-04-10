import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/Login Page/Login.jsx'
import FrontPage from '../components/FrontPage/FrontPage.jsx'
import Sample from '../Sample.jsx'
import VendorRequest from '../components/VendorView/Request Page/VendorRequest.jsx'
import SearchPage from '../components/VendorManagement/SearchPage.jsx'
import VendorDetailpage from '../components/VendorManagement/VendorDetailPage.jsx'
import CategoryDisplayPage from '../components/VendorManagement/CategoryDisplayPage.jsx'
import AdminUserManagement from '../components/AdminUserManagement/AdminUserManagement.jsx'
import GuestList from '../components/GuestManagement/GuestList.jsx'
import TableLayout from '../components/GuestManagement/TableLayout.jsx'
import WeddingChecklist from '../components/LogisticsManagement/WeddingChecklist.jsx'
import WeddingBudgetPlanner from '../components/LogisticsManagement/WeddingBudgetPlanner.jsx'
import WeddingItinerary from '../components/LogisticsManagement/WeddingItinerary.jsx'
import Homepage from '../components/UnregisteredView/Homepage.jsx'
import Contact from '../components/UnregisteredView/Contact.jsx'
import AboutUs from '../components/UnregisteredView/AboutUs.jsx'
import VendorLogin from '../components/Login Page/VendorLogin.jsx'
import EditProfile from '../components/Profiles/EditProfile.jsx'
import ProjectDashboard from '../components/ProjectDashboard/ProjectDashboard.jsx'
import LoginAPI from '../components/Login Page/LoginAPI.jsx'
import useToken from '../useToken.jsx'
import RSVPForm from '../components/GuestManagement/RSVPForm.jsx'
import MainTable from '../components/GuestManagement/MainTable.jsx'

import { LoginTokenContext } from '../context/LoginTokenContext.jsx'
import Schedule from '../components/VendorView/Schedule Page/Schedule.jsx'
import SpecificRequestPage from '../components/VendorView/Specific Request Page/SpecificRequestPage.jsx'
import AdminSignUp from '../components/UnregisteredView/AdminSignUp.jsx'
import VendorSignUp from '../components/UnregisteredView/VendorSignUp.jsx'
import OrganiserSignUp from '../components/UnregisteredView/OrganiserSignUp.jsx'
import SignUp from '../components/UnregisteredView/SignUp.jsx'
function TempEndPoints() {
  // for debugging, clear localStorage
  // localStorage.clear();
  const { token, setToken } = useToken()
  return (
    <>
      <LoginTokenContext.Provider value={token}></LoginTokenContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/rsvpForm/:weddingId"
            element={<RSVPForm></RSVPForm>}
          ></Route>
          <Route exact path="/" element={<ProjectDashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/vendorlogin" element={<VendorLogin />} />
          <Route exact path="/vendor/requests" element={<VendorRequest />} />
          <Route
            exact
            path="/vendor/request/:id"
            element={<SpecificRequestPage />}
          />
          <Route exact path="/vendor/schedule" element={<Schedule />} />
          <Route
            exact
            path="/AdminUserManagement"
            element={<AdminUserManagement />}
          />
          <Route exact path="/" element={<ProjectDashboard />} />
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
            path="/LogisticsManagement/WeddingItinerary"
            element={<WeddingItinerary />}
          />
          <Route exact path="/VendorSearchPage" element={<SearchPage />} />
          <Route
            path="/VendorSearchPage/VendorName/:vendorName"
            element={<VendorDetailpage />}
          />
          <Route
            path="/VendorSearchPage/Category/:vendorCategory"
            element={<CategoryDisplayPage />}
          />
          <Route exact path="/tablelayout" element={<MainTable />} />
          <Route exact path="/guestlist" element={<GuestList />} />
          <Route exact path="/homepage" element={<Homepage />} />
          <Route exact path="/aboutuspage" element={<AboutUs />} />
          <Route exact path="/contactpage" element={<Contact />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signup/vendorsignup" element={<VendorSignUp />} />
          <Route
            exact
            path="/signup/organisersignup"
            element={<OrganiserSignUp />}
          />
          <Route exact path="/signup/adminsignup" element={<AdminSignUp />} />
          <Route exact path="/editprofile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default TempEndPoints
