import React, { useContext, useEffect, useRef, useState } from 'react'
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { classNames } from 'primereact/utils'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { LoginTokenContext } from '../../context/LoginTokenContext'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.
const SERVER_PREFIX =
  'http://localhost:8080/IS3106WeddingPlanner-war/webresources/wedding-organisers'
const OrganiserAPI = {
  getWeddingOrganiser(wId) {
    return fetch(`${SERVER_PREFIX}/${wId}`).then((response) => response.json())
  },
  updateWeddingOrganiser(wId, weddingOrganiser) {
    return fetch(`${SERVER_PREFIX}/${wId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(weddingOrganiser),
    })
  },
}

function EditProfile() {
  const [token, setToken] = useContext(LoginTokenContext)
  const wId = token.userId
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrl, setImageUrl] = useState([])
  const [visible, setVisible] = useState(false)

  const imageListRef = ref(storage, `wedding-organisers/${wId}`)
  useEffect(() => {
    OrganiserAPI.getWeddingOrganiser(wId).then((weddingOrganiser) => {
      const { username, email, password } = weddingOrganiser
      setUsername(username)
      setEmail(email)
      setPassword(password)
    })
  }, [wId])

  useEffect(() => {
    console.log('triggering image retreival from firebase')
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        // console.log(item);
        //setImageUrls((prev) => [...prev, item]);
        getDownloadURL(item).then((url) => {
          setImageUrl(url)
        })
      })
    })
  }, [])

  const uploadFile = () => {
    if (!imageUpload) return
    const imageRef = ref(
      storage,
      `wedding-organisers/${wId}/${imageUpload.name}`,
    ) // obtain the place to store the image in firebase
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef).then((url) => {
          setImageUrl([...imageUrl, url])
          setVisible(false)
        })
      })
      .catch((error) => {
        console.error(`Unable to upload image: ${error.message}`)
      }) //appends the image to the imageURLs list to display image once you upload
  }

  const handleImageUpload = (event) => {
    setImageUpload(event.target.files[0])
  }

  const defaultValues = {
    username: username,
    email: email,
    password: password,
  }
  const toast = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    OrganiserAPI.updateWeddingOrganiser(wId, {
      username,
      email,
      password,
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
              <Toast ref={toast} />
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
