import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../components/Login Page/Login.jsx';
import FrontPage from '../components/FrontPage/FrontPage.jsx';

// Component to handle routing. Take note of the format of the pathing and how to add a Route (url endpoint). Login component is created as an example. 

function EndPoints(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"  element={<FrontPage />}/>
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default EndPoints;