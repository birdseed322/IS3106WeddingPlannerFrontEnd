import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import backgroundImage from './Background/aboutus.png'
import { Card } from 'primereact/card'
//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function Homepage() {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  }
  return (
    <div style={styles}>
      <PublicHeartyNavbar />
      <br />
      <br />
      <br />
      <div>
        <Card
          style={{
            width: '757px',
            minHeight: '200px',
            maxHeight: '700px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0)',
          }}
        >
          <div className="flex justify-content-center pt-7 pb-2">
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
            <p
              className="titleFont"
              style={{
                lineHeight: 1.5,
                textIndent: '0.25em',
                fontSize: '5em',
                fontWeight: 'bold',
              }}
            >
              Hearty
            </p>
          </div>
          <div className="flex justify-content-center">
            <p className="font" style={{ lineHeight: 3, fontSize: '2em' }}>
              Have a hearty time with us
            </p>
          </div>
          <div className="flex justify-content-center">
            <p className="font" style={{ lineHeight: 1, fontSize: '2em' }}>
              creating the wedding of your dreams !
            </p>
          </div>
          <div className="flex justify-content-center pt-5">
            <Link to="/login" className="p-2 noUnderline">
              <Button
                size="large"
                label="Start Now"
                style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
              />{' '}
            </Link>
          </div>
        </Card>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Homepage
