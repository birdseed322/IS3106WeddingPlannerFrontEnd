import React, { useState } from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import backgroundImage from './Background/kinfolk-wedding-20.webp'

function SignUp() {
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
      <div className="flex justify-content-center pt-8 mt-8">
        <Card
          style={{
            minWidth: '400px',
            maxWidth: '600px',
            minHeight: '350px',
            maxHeight: '600px',
          }}
        >
          <h1 className="flex justify-content-center">Sign Up</h1>
          <div className="flex justify-content-center pt-5">
            <Link to="vendorsignup" className="noUnderline">
              <Button
                label="Vendor"
                style={{
                  width: '325px',
                  height: '50px',
                  backgroundColor: '#f561b0',
                  border: '#f561b0',
                }}
              />{' '}
            </Link>
          </div>

          <div className="flex justify-content-center pt-5">
            <Link to="weddingorganisersignup" className="noUnderline">
              <Button
                label="Wedding Organiser"
                style={{
                  width: '325px',
                  height: '50px',
                  backgroundColor: '#f561b0',
                  border: '#f561b0',
                }}
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
      <br />
    </div>
  )
}

export default SignUp
