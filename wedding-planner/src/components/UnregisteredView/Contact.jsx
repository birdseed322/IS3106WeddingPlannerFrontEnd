import React from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function Contact() {
  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center">
        <p style={{ lineHeight: 3, fontSize: '3em' }}>Any Questions</p>
      </div>
      <div className="flex justify-content-left">
        <i
          className="pi pi-phone px-8"
          style={{
            fontSize: '4em',
            color: '#f561b0',
          }}
        />
        <p style={{ lineHeight: 7, fontSize: '2em' }}>Contact Us</p>
      </div>
      <div className="flex justify-content-right">
        <i
          className="pi pi-envelope px-8"
          style={{
            fontSize: '4em',
            color: '#f561b0',
          }}
        />
      </div>
    </div>
  )
}

export default Contact
