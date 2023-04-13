import React, { useState, useContext, useEffect } from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { LoginTokenContext } from '../../context/LoginTokenContext'
import { Avatar } from 'primereact/avatar'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../firebase'
export default function ProjectNavbar(props) {
  // array of MenuItems
  // see https://www.primefaces.org/primereact-v8/menumodel/
  const [searchTerm, setSearchTerm] = useState('')

  // height="40" className="mr-2"
  const [token, setToken] = useContext(LoginTokenContext)
  const wId = token.userId
  const [imageUrl, setImageUrl] = useState([])

  const imageListRef = ref(storage, `wedding-organisers/${wId}/ProfilePic.png`)

  function handleSearch() {
    props.onSearch(searchTerm)
    setSearchTerm('')
  }

  useEffect(() => {
    console.log('triggering image retreival from firebase')
    getDownloadURL(imageListRef)
      .then((url) => {
        setImageUrl(url)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  // since we're only returning Menubar anyway, no need to wrap around a div or <>
  return (
    <div id="navbar" className="m-3">
      <div className="pt-2 inline-block">
        <Link to="/" className="noUnderline">
          <span className="px-3">
            <Button
              icon="pi pi-heart"
              rounded
              size="large"
              style={{
                backgroundColor: '#f561b0',
                border: '#f561b0',
              }}
            />
          </span>
        </Link>
        <span className="p-input  px-2.5">
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            icon="pi pi-search"
            style={{
              color: '#f561b0',
            }}
            className="p-button-text"
            onClick={handleSearch}
          />
        </span>
      </div>
      <div className="absolute right-0 inline-block pt-1">
        <Link to="/login" className="noUnderline">
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            style={{
              backgroundColor: '#f561b0',
              border: '#f561b0',
              marginRight: '1rem',
            }}
            onClick={() => setToken(false)} // set token to false
          />{' '}
        </Link>

        <Link to="/editprofile" className="noUnderline px-3">
          <Avatar
            image={imageUrl}
            size="large"
            shape="circle" // set token to false
          />
        </Link>
      </div>
    </div>
  )
}
