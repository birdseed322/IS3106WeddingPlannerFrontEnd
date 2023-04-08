import React from 'react'
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import Navbar from '../HeartyNavbar/Navbar'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function ViewProfile() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-content-center pt-5">
        <Card
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '500px',
            maxHeight: '700px',
          }}
        >
          <h2 className="flex justify-content-center">Profile</h2>

          <span className="flex justify-content-center ">
            <Link to="/editprofile" className=" noUnderline">
              <Button
                label="Edit Profile"
                style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
              />{' '}
            </Link>
          </span>
        </Card>
      </div>
    </div>
  )
}

export default ViewProfile
