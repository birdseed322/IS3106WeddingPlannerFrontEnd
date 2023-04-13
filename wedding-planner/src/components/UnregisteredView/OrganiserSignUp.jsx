import React, { useRef, useState } from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function OrganiserSignUp() {
  const SERVER_PREFIX =
    'http://localhost:8080/IS3106WeddingPlanner-war/webresources/wedding-organisers'
  const OrganiserAPI = {
    createWeddingOrganiser(weddingOrganiser) {
      return fetch(`${SERVER_PREFIX}/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(weddingOrganiser),
      })
    },
  }

  const navigate = useNavigate()
  const toast = useRef(null)

  const checkingPassword = (e) => {
    e.preventDefault()
    if (password1 === password2) {
      setPassword(password1)
      handleSubmit(e, password1)
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Not Successful',
        detail: 'Passwords are not the same',
      })
    }
  }
  const handleSubmit = (e, password1) => {
    e.preventDefault()
    OrganiserAPI.createWeddingOrganiser({
      username,
      email,
      password: password1,
    })
      .then((weddingOrganiser) => {
        if (weddingOrganiser.status === 200) {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Account Created',
          })
          navigate('/login')
        } else {
          toast.current.show({
            severity: 'error',
            summary: 'Not Successful',
            detail: 'Username or email has been taken',
          })
        }
      })
      .catch((error) => {
        toast.current.show({
          severity: 'error',
          summary: 'Not Successful',
          detail: 'Account Not Created',
        })
        console.log(error)
      })
  }

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center pt-5">
        <Card
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '500px',
            maxHeight: '700px',
          }}
        >
          <h3 className="flex justify-content-center">
            Wedding Organiser Sign Up
          </h3>
          <form onSubmit={checkingPassword}>
            <div className="field pt-1">
              <label
                htmlFor="name"
                className={classNames({
                  'px-3': true,
                })}
              >
                Username
              </label>
              <span className="px-7">
                <InputText
                  id="inputUsername"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2 px-3">
              <label htmlFor="email" className="pr-5">
                Email
              </label>
              <span className="px-8">
                <InputText
                  id="inputEmail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2 px-3">
              <label htmlFor="password" className="pr-1">
                Password
              </label>
              <span className="px-8">
                <InputText
                  id="inputPassword"
                  type="password"
                  required
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="password" className="pl-3">
                Confirm Password
              </label>
              <span className="px-4">
                <InputText
                  id="confirmInputPassword"
                  type="password"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </span>
            </div>
            <span>
              <div className="flex justify-content-center pt-4">
                <Toast ref={toast} />
                <Button
                  label="Sign Up"
                  style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                />{' '}
              </div>
              <div className="flex justify-content-center px-5 pt-3">
                <p className="px-1">Have an Account ?</p>
                <Link to="/login" className="noUnderline">
                  <p style={{ color: '#f561b0' }}>Login</p>
                </Link>
              </div>
            </span>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default OrganiserSignUp
