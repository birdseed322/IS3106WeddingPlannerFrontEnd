import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

const footer = (
  <span className="flex justify-content-center ">
    <Link to="/vendor" className=" noUnderline">
      <Button
        label="Login"
        style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
      />{' '}
    </Link>
  </span>
)

function VendorLogin() {
  return (
    <div>
      <PublicHeartyNavbar />
      This is the Vendor login page.
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
          <h3 className="flex justify-content-center">Login</h3>
        </Card>
      </div>
    </div>
  )
}

export default VendorLogin
