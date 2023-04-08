import React, { useState } from 'react'
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function EditProfile() {
  const wId = 9
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    /*ProfileAPI.updateWeddingOrganiser(wId, {
      username,
      email,
      password,
    }).then((profile) => {
      navigate('/')
    })*/
  }

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <HeartyNavbar />
      <div className="flex justify-content-center pt-5">
        <Card
          style={{
            minWidth: '200px',
            maxWidth: '400px',
            minHeight: '400px',
            maxHeight: '600px',
          }}
        >
          <h3 className="flex justify-content-center">Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="field pt-1">
              <span>
                <label
                  htmlFor="name"
                  className={classNames({
                    'px-3': true,
                  })}
                >
                  Username
                </label>
                <InputText
                  id="inputUsername"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="email" className="pl-3">
                Email
              </label>
              <span className="px-6">
                <InputText
                  id="inputEmail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="password" className="pl-3">
                Password
              </label>
              <span className="px-4">
                <InputText
                  id="inputPassword"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
            </div>
            <span className="flex justify-content-center pt-5">
              <Button
                label="Save Profile"
                style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
              />{' '}
            </span>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default EditProfile
