import React from 'react'
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.
const footer = (
  <span className="flex justify-content-center ">
    <Link to="/viewprofile" className=" noUnderline">
      <Button
        label="Save Profile"
        style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
      />{' '}
    </Link>
  </span>
)

function EditProfile() {
  return (
    <div>
      <HeartyNavbar />
      <div className="flex justify-content-center pt-5">
        <Card
          footer={footer}
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '500px',
            maxHeight: '700px',
          }}
        >
          <h3 className="flex justify-content-center">Edit Profile</h3>
        </Card>
      </div>
    </div>
  )
}

export default EditProfile
