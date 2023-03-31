import React from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

const footer = (
  <span className="flex justify-content-center ">
    <div>
      <Link to="/signup" className="flex justify-content-center noUnderline">
        <Button
          label="Sign Up"
          style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
        />{' '}
      </Link>

      <div className="flex justify-content-center px-5">
        <p className="px-1">Have an Account ?</p>
        <Link to="/login" className="noUnderline">
          <p style={{ color: '#f561b0' }}>Login</p>
        </Link>
      </div>
    </div>
  </span>
)

function SignUp() {
  return (
    <div>
      <PublicHeartyNavbar />
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
          <h3 className="flex justify-content-center">Sign Up</h3>
        </Card>
      </div>
    </div>
  )
}

export default SignUp
