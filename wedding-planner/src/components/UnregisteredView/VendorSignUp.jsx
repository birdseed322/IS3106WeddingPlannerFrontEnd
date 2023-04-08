import React, { useState } from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

const categoryTypeItems = [
  { label: 'Entertainment', value: 'ENTERTAINMENT' },
  { label: 'Food', value: 'FOOD' },
  { label: 'Lighting', value: 'LIGHTING' },
  { label: 'Decoration', value: 'DECORATION' },
  { label: 'Clothes', value: 'CLOTHES' },
  { label: 'Venue', value: 'VENUE' },
]

function VendorSignUp() {
  const SERVER_PREFIX =
    'http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors'
  const vendorAPI = {
    createVendor(vendor) {
      return fetch(`${SERVER_PREFIX}/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(vendor),
      })
    },
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    vendorAPI
      .createVendor({
        username,
        email,
        password,
        description,
        banner,
        websiteUrl,
        instagramUrl,
        facebookUrl,
        whatsappUrl,
        categoryType,
      })
      .then((vendor) => {
        navigate('/login')
      })
  }

  const [categoryType, setCategoryType] = useState('ENTERTAINMENT')
  const [description, setDescription] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [banner, setBanner] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center pt-5">
        <Card
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '500px',
            maxHeight: '900px',
          }}
        >
          <h3 className="flex justify-content-center">Vendor Sign Up</h3>
          <form onSubmit={handleSubmit}>
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
                  required
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
                  required
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
                  required
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
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
            </div>
            <div className="field pt-2">
              <label htmlFor="banner" className="pl-3 pr-1">
                Banner
              </label>
              <span className="px-7">
                <InputText
                  className="px-5"
                  id="inputBanner"
                  required
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
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
                  required
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
                  required
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
                  required
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
                  required
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                />
              </span>
            </div>
            <div className="flex px-3 pt-2">
              <p style={{ lineHeight: '2.5em' }}>Category Type </p>
              <div className="px-3">
                <Dropdown
                  label="categoryType"
                  options={categoryTypeItems}
                  value={categoryType}
                  onChange={(e) => {
                    setCategoryType(e.value)
                  }}
                />
              </div>
            </div>
            <span>
              <div className="flex justify-content-center pt-4">
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

export default VendorSignUp
