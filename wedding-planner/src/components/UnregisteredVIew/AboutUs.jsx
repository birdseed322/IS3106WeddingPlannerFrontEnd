import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function AboutUs() {
  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center pt-5">
        <i
          className="pi pi-heart"
          style={{
            fontSize: '5em',
            color: '#ffffff',
            backgroundColor: '#f561b0',
            borderRadius: 10,
            padding: 20,
            border: '#f561b0',
          }}
        />
        <p style={{ lineHeight: 1.5, textIndent: '0.25em', fontSize: '5em' }}>
          Hearty
        </p>
      </div>
      <div className="flex justify-content-center pb-8">
        <p style={{ lineHeight: 0, textIndent: '8.5em', fontSize: '2em' }}>
          Have a hearty time with us
        </p>
      </div>
      <div className="flex pt-8">
        <p style={{ textIndent: '1em', fontSize: '2em' }}>What We Do</p>
      </div>
      <div className="flex px-5">
        <p style={{ lineHeight: 1.5, textIndent: '2em', fontSize: '1.25em' }}>
          Let us help you create the wedding of your dreams! From creating a
          budget and guest list, to finding the perfect venue and vendors, our
          platform is designed to assist wedding planners in organizing a
          memorable and stress-free wedding.
        </p>
      </div>
    </div>
  )
}

export default AboutUs
