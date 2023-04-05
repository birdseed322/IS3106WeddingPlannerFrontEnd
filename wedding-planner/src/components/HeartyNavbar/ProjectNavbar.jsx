import React, { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'

export default function ProjectNavbar(props) {
  // array of MenuItems
  // see https://www.primefaces.org/primereact-v8/menumodel/
  const [value, setValue] = useState('')
  // height="40" className="mr-2"

  // since we're only returning Menubar anyway, no need to wrap around a div or <>
  return (
    <div id="navbar">
      <div className="pt-2">
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
          <InputText value={value} onChange={(e) => setValue(e.target.value)} />
          <Button
            icon="pi pi-search"
            style={{
              color: '#f561b0',
            }}
            onClick={() => setValue('')}
            className="p-button-text"
          />
        </span>
      </div>
      <div className="top-right">
        <Link to="/login" className="noUnderline">
          <Button
            label="Logout"
            style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
          />{' '}
        </Link>
        <Link to="/viewprofile" className="noUnderline px-3">
          <Button
            icon="pi pi-user"
            rounded
            style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
          />
        </Link>
      </div>
    </div>
  )
}
