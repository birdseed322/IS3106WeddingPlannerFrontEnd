import React from 'react';

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page. 
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function Login(){
    return (
        <div>
            This is the login page.
        </div>
    )
}

export default Login;