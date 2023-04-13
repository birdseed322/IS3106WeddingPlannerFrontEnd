import React, { useRef, useContext, useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import heartyLogo from '../../../images/favicon-heart-3.png';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { LoginTokenContext } from '../../../context/LoginTokenContext';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';
import { Avatar } from 'primereact/avatar';

function VendorNavbar(props) {
  const [token, setToken] = useContext(LoginTokenContext)
  const vId = token.userId
  const [imageUrl, setImageUrl] = useState([])
  const defaultImage = ref(storage, `testing/Default.jpeg`)

  const imageListRef = ref(storage, `Vendor/${vId}/ProfilePic/ProfilePic.png`)

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

  const items = [
    {
      label: 'Schedule',
      icon: 'pi pi-fw pi-calendar',
      url: '/schedule',
      className: 'menuItemStyle',
    },
    {
      label: 'Requests',
      icon: 'pi pi-fw pi-book',
      url: '/',
      className: 'menuItemStyle',
    },
  ]
  const end = (
    // for border attribute, need to specify pixel, pattern  & colour(eg. border: 1px solid black)
    <>
      <Link to="/login" className="noUnderline">
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
          onClick={() => setToken(false)} // set token to false
        />
      </Link>
      <Link to="/editprofile" className="noUnderline">
        <Avatar
          image={imageUrl}
          size="large"
          shape="circle" // set token to false
        />
      </Link>
    </>
  )
  const start = (
    <>
      <Link to="/" className="noUnderline">
        <span className="flex my-1 mx-4 align-items-center">
          <img src={heartyLogo} className="mr-2" alt="hearty logo" />
          <h1 className="inline h-min text-3xl">Hearty</h1>
        </span>
      </Link>
    </>
  )
  // height="40" className="mr-2"

  // since we're only returning Menubar anyway, no need to wrap around a div or <>
  return (
    <Menubar
      className="sticky top-0 z-5"
      id="navbar"
      model={items}
      start={start}
      end={end}
    />
  )
}

export default VendorNavbar
