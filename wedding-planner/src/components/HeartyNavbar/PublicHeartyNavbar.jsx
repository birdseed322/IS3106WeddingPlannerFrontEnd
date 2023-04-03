// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import React from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

export default function PublicHeartyNavbar(props) {
  // array of MenuItems
  // see https://www.primefaces.org/primereact-v8/menumodel/
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: '/homepage',
      className: 'menuItemStyle',
    },
    {
      label: 'About Us',
      icon: 'pi pi-fw pi-users',
      url: '/aboutuspage',
      className: 'menuItemStyle',
    },
    {
      label: 'Contact',
      icon: 'pi pi-phone',
      url: '/contactpage',
      className: 'menuItemStyle',
    },
  ]
  const end = (
    // for border attribute, need to specify pixel, pattern  & colour(eg. border: 1px solid black)
    <>
      <Link to="/signup" className="p-1 noUnderline">
        <Button
          label="Sign Up"
          style={{
            backgroundColor: '#ffffff',
            border: '#ffffff',
            color: '#000000',
          }}
        />{' '}
      </Link>

      <Link to="/login" className="p-2 noUnderline">
        <Button
          label="Login"
          style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
        />{' '}
      </Link>
    </>
  )
  const start = (
    <>
      <Link to="/" className="noUnderline">
        <span>
          <Button
            icon="pi pi-heart"
            rounded
            size="large"
            style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
          />
        </span>
      </Link>
    </>
  )
  return <Menubar id="navbar" model={items} start={start} end={end} />
}
