import React, { useContext, useEffect, useRef, useState } from 'react'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { LoginTokenContext } from '../../context/LoginTokenContext'
import VendorNavbar from '../VendorView/VendorNavbar/VendorNavbar'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { Dialog } from 'primereact/dialog'
import { Avatar } from 'primereact/avatar'
import { Galleria } from 'primereact/galleria'
import { Toast } from 'primereact/toast'

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

  const toast = useRef(null)

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
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Profile Updated',
        })
      })
      .catch((error) => {
        console.log(error)
        toast.current.show({
          severity: 'error',
          summary: 'Not Successful',
          detail: 'Profile Not Updated',
        })
      })
  }

  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrl, setImageUrl] = useState([])
  const [imageUploads, setImageUploads] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [visible, setVisible] = useState(false)
  const [addPhoto, setAddPhoto] = useState(false)
  const imageListRef = ref(storage, `Vendor/${vId}/ProfilePic/ProfilePic.png`)
  const imagesListRef1 = ref(storage, `Vendor/${vId}/Photos/`)
  const defaultImage = ref(storage, `testing/Default.jpeg`)
  const itemTemplate = (item) => {
    return (
      <img src={item} alt={item} style={{ width: '100%', display: 'block' }} />
    )
  }

  useEffect(() => {
    console.log('triggering image retreival from firebase')
    getDownloadURL(imageListRef)
      .then((url) => {
        setImageUrl(url)
      })
      .catch((error) => {
        console.error(`Unable to retrieve default image: ${error.message}`)
        getDownloadURL(defaultImage).then((url) => {
          setImageUrl(url)
        })
      })
  }, [])

  useEffect(() => {
    console.log('triggering image retreival from firebase')
    listAll(imagesListRef1).then((response) => {
      response.items.forEach((item) => {
        // console.log(item);
        //setImageUrls((prev) => [...prev, item]);
        getDownloadURL(item).then((url) => {
          console.log(url)
          setImageUrls((prev) => [...prev, url])
        })
      })
    })
  }, [])

  const uploadFile1 = () => {
    if (!imageUploads) return
    const imageRef1 = ref(storage, `Vendor/${vId}/Photos/${imageUploads.name}`) // obtain the place to store the image in firebase
    uploadBytes(imageRef1, imageUploads)
      .then(() => {
        getDownloadURL(imageRef1).then((url) => {
          setImageUrls([...imageUrls, url])
          setAddPhoto(false)
        })
      })
      .catch((error) => {
        console.error(`Unable to upload image: ${error.message}`)
      }) //appends the image to the imageURLs list to display image once you upload
  }

  const uploadFile = () => {
    if (!imageUpload) return
    const imageRef = ref(storage, `Vendor/${vId}/ProfilePic/ProfilePic.png`) // obtain the place to store the image in firebase
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef).then((url) => {
          setImageUrl(url)
          setVisible(false)
        })
      })
      .catch((error) => {
        console.error(`Unable to upload image: ${error.message}`)
      })
  }

  const handleImageUpload = (event) => {
    setImageUpload(event.target.files[0])
  }

  const handleImageUpload1 = (event) => {
    setImageUploads(event.target.files[0])
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
            maxHeight: '1500px',
          }}
        >
          <h3 className="flex justify-content-center">Edit Profile</h3>
          <div className="flex justify-content-center pb-3">
            <Avatar
              image={imageUrl}
              size="xlarge"
              shape="circle"
              onClick={() => setVisible(true)}
            />
            <Dialog visible={visible} onHide={() => setVisible(false)}>
              <Card
                style={{
                  minWidth: '200px',
                  maxWidth: '400px',
                  minHeight: '400px',
                  maxHeight: '600px',
                }}
              >
                <div>
                  <input type="file" onChange={handleImageUpload} />
                  <button onClick={uploadFile}> Upload Image</button>
                  {imageUrl && <img src={imageUrl} />}
                </div>
              </Card>
            </Dialog>
          </div>
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
            <div className="field pt-2">
              <label htmlFor="whatsapp" className="pl-3 pr-1">
                Photos:
              </label>
              <span className="px-3 flex justify-content-center">
                <Galleria
                  value={imageUrls}
                  numVisible={5}
                  circular
                  style={{ maxWidth: '100px', maxHeight: '50px' }}
                  showThumbnails={false}
                  showItemNavigators
                  item={itemTemplate}
                />
                <div className="pl-5 pt-7 flex justify-content-center">
                  <Button
                    label="Add Photo"
                    style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                    onClick={() => setAddPhoto(true)}
                  />{' '}
                </div>
              </span>
              <Dialog visible={addPhoto} onHide={() => setAddPhoto(false)}>
                <Card
                  style={{
                    minWidth: '200px',
                    maxWidth: '400px',
                    minHeight: '400px',
                    maxHeight: '600px',
                  }}
                >
                  <div>
                    <input type="file" onChange={handleImageUpload1} />
                    <button onClick={uploadFile1}> Upload Image</button>
                    {imageUrls && <img src={imageUrls} />}
                  </div>
                </Card>
              </Dialog>
            </div>
            <div className="flex px-3 pt-7">
              <p style={{ lineHeight: '2.5em' }}>Category </p>
              <div className="px-3 pt-0">
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
                <Toast ref={toast} />
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
