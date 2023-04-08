import React, { useState } from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

function SignUp() {
  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center pt-5 mt-8">
        <Card
          style={{
            minWidth: '200px',
            maxWidth: '300px',
            minHeight: '200px',
            maxHeight: '300px',
          }}
        >
          <h3 className="flex justify-content-center">Sign Up</h3>
          <div className="flex justify-content-center">
            <Link to="/vendorsignup" className="noUnderline">
              <Button
                className="px-7"
                label="Vendor"
                style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
              />{' '}
            </Link>
          </div>

          <div className="flex justify-content-center pt-3">
            <Link to="/weddingorganisersignup" className="noUnderline">
              <Button
                className="px-3 pt-2"
                label="Wedding Organiser"
                style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
              />{' '}
            </Link>
          </div>
          <div className="flex justify-content-center pt-3">
            <Link to="/adminsignup" className="noUnderline">
              <Button
                className="px-7"
                label="Admin"
                style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
              />{' '}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SignUp
