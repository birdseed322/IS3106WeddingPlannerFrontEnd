import React, { useContext, useEffect, useState } from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { LoginTokenContext } from '../../context/LoginTokenContext'
import VendorNavbar from '../VendorView/VendorNavbar/VendorNavbar'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

const categoryTypes = [
  { label: 'Entertainment', value: 'ENTERTAINMENT' },
  { label: 'Food', value: 'FOOD' },
  { label: 'Lighting', value: 'LIGHTING' },
  { label: 'Decoration', value: 'DECORATION' },
  { label: 'Clothes', value: 'CLOTHES' },
  { label: 'Venue', value: 'VENUE' },
]

function VendorEditProfile() {
  const [token, setToken] = useContext(LoginTokenContext)
  const vId = token.userId
  const SERVER_PREFIX =
    'http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors'
  const vendorAPI = {
    getVendorbyId(vId) {
      return fetch(`${SERVER_PREFIX}/query?vendor-id=${vId}`).then((response) =>
        response.json(),
      )
    },
    updateVendor(vId, vendor) {
      return fetch(`${SERVER_PREFIX}/query?vendor-id=${vId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(vendor),
      })
    },
  }
  console.log(vendorAPI.getVendorbyId(vId))

  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  useEffect(() => {
    vendorAPI.getVendorbyId(vId).then((vendor) => {
      const {
        category,
        description,
        username,
        email,
        password,
        websiteUrl,
        facebookUrl,
        instagramUrl,
        whatsappUrl,
      } = vendor
      setCategory(category)
      setUsername(username)
      setEmail(email)
      setPassword(password)
      setDescription(description)
      setFacebookUrl(facebookUrl)
      setInstagramUrl(instagramUrl)
      setWebsiteUrl(websiteUrl)
      setWhatsappUrl(whatsappUrl)
    })
  }, [vId])

  const defaultValues = {
    username,
    email,
    password,
    description,
    category,
    facebookUrl,
    instagramUrl,
    websiteUrl,
    whatsappUrl,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    vendorAPI
      .updateVendor(vId, {
        userId: vId,
        username,
        email,
        password,
        description,
        category,
        facebookUrl,
        instagramUrl,
        websiteUrl,
        whatsappUrl,
        isBanned: false,
      })
      .then((profile) => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Error updating profile:', error)
      })
  }

  return (
    <div>
      <VendorNavbar />
      <div className="flex justify-content-center pt-5">
        <Card
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '500px',
            maxHeight: '900px',
          }}
        >
          <h3 className="flex justify-content-center">Edit Profile</h3>
          <form onSubmit={handleSubmit} defaultValue={defaultValues}>
            <div className="field pt-1 pr-5">
              <label
                htmlFor="name"
                className={classNames({
                  'px-3': true,
                })}
              >
                Username
              </label>
              <span className="px-5">
                <InputText
                  className="px-5"
                  id="inputUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="email" className="pl-3 pr-8">
                Email
              </label>
              <span>
                <InputText
                  className="px-5"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="password" className="pl-3 ">
                Password
              </label>
              <span className="px-6">
                <InputText
                  className="px-5"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="description" className="pl-3 pr-1">
                Description
              </label>
              <span className="px-5">
                <InputText
                  className="px-5"
                  id="inputDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="websiteUrl" className="pl-3 pr-1">
                Website Url
              </label>
              <span className="px-5">
                <InputText
                  className="px-5"
                  id="inputWebsiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="instagramUrl" className="pl-3 pr-1">
                Instagram Url
              </label>
              <span className="px-3">
                <InputText
                  className="px-5"
                  id="inputInstagram"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="facebook" className="pl-3 pr-2">
                Facebook Url
              </label>
              <span className="px-3">
                <InputText
                  className="px-5"
                  id="inputFacebook"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="whatsapp" className="pl-3 pr-1">
                WhatsApp Url
              </label>
              <span className="px-3">
                <InputText
                  className="px-5"
                  id="inputWhatsapp"
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                />
              </span>
            </div>
            <div className="flex px-3 pt-2">
              <p style={{ lineHeight: '2.5em' }}>Category </p>
              <div className="px-3">
                <Dropdown
                  label="categoryType"
                  options={categoryTypes}
                  value={category}
                  onChange={(e) => {
                    setCategory(e.value)
                  }}
                />
              </div>
            </div>
            <span>
              <div className="flex justify-content-center pt-4">
                <Button
                  label="Save Profile"
                  style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                />{' '}
              </div>
            </span>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default VendorEditProfile
