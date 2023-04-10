import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function Contact() {
  const [isCopied, setIsCopied] = useState(false)
  const [isCopied1, setIsCopied1] = useState(false)
  const onCopyText = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }
  const onCopyText1 = () => {
    setIsCopied1(true)
    setTimeout(() => {
      setIsCopied1(false)
    }, 1000)
  }

  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center">
        <p style={{ lineHeight: 3, fontSize: '3em' }}>Any Questions</p>
      </div>
      <div className="flex justify-content-center">
        <div className="px-5">
          <Card
            className="px-5"
            style={{
              minWidth: '100px',
              maxWidth: '300px',
              minHeight: '300px',
              maxHeight: '400px',
            }}
          >
            <div className="flex justify-content-center pt-3">
              <i
                className="pi pi-phone"
                style={{
                  fontSize: '4em',
                  color: '#f561b0',
                }}
              />
            </div>
            <div className="flex justify-content-center">
              <p style={{ lineHeight: 3, fontSize: '1.75em' }}>12345678</p>
            </div>
            <div className="pl-5">
              <CopyToClipboard text={'12345678'} onCopy={onCopyText}>
                <div className="flex justify-content-center">
                  <Button
                    label="Contact Us"
                    size="large"
                    style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                  />{' '}
                  <span className="px-3" style={{ fontSize: '30px' }}>
                    {isCopied ? '  Copied!' : ''}
                  </span>
                </div>
              </CopyToClipboard>
            </div>
          </Card>
        </div>

        <Card
          className="px-5"
          style={{
            minWidth: '100px',
            maxWidth: '300px',
            minHeight: '300px',
            maxHeight: '400px',
          }}
        >
          <div className="flex justify-content-center pt-5">
            <i
              className="pi pi-envelope px-5"
              style={{
                fontSize: '4em',
                color: '#f561b0',
              }}
            />
          </div>
          <div className="flex justify-content-center">
            <p style={{ lineHeight: 3, fontSize: '1.3em' }}>
              heartysupport@gmail.com
            </p>
          </div>
          <div className="flex justify-content-center pl-3">
            <CopyToClipboard
              text={'heartysupport@gmail.com'}
              onCopy={onCopyText1}
            >
              <div className="px-3">
                <Button
                  label="Email Us"
                  size="large"
                  style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                />{' '}
                <span className="px-3" style={{ fontSize: '30px' }}>
                  {isCopied1 ? '  Copied!' : ''}
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Contact
