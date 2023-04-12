import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function Contact() {
  const onCopyText = () => {
    setTimeout(() => {}, 100)
  }
  const onCopyText1 = () => {
    setTimeout(() => {}, 100)
  }

  const toast = useRef(null)

  const showToast = (severityValue, summaryValue, detailValue) => {
    toast.current.show({
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    })
  }

  return (
    <div>
      <PublicHeartyNavbar />
      <div className="flex justify-content-center">
        <p className="titleFont" style={{ lineHeight: 3, fontSize: '3em' }}>
          Any Questions
        </p>
      </div>
      <div className="flex justify-content-center">
        <div className="px-5">
          <Card
            className="px-5"
            style={{
              minWidth: '300px',
              maxWidth: '500px',
              height: '500px',
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
              <p className="font" style={{ lineHeight: 3, fontSize: '2em' }}>
                Talk to Sales
              </p>
            </div>
            <div className="flex justify-content-center">
              <p
                className="font"
                style={{
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                Contact our sales support now to answer your queries
              </p>
            </div>
            <div className="flex justify-content-center">
              <p className="font" style={{ lineHeight: 3, fontSize: '1.5em' }}>
                +65 87090289
              </p>
            </div>
            <div className="pl-5">
              <CopyToClipboard text={'12345678'} onCopy={onCopyText}>
                <div className="flex justify-content-center">
                  <Toast ref={toast} />
                  <Button
                    label="Contact Us"
                    size="large"
                    style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                    onClick={() =>
                      showToast(
                        'success',
                        'Successful',
                        'The phone number has been copied to your clipboard.',
                      )
                    }
                  />{' '}
                </div>
              </CopyToClipboard>
            </div>
          </Card>
        </div>

        <Card
          className="px-5"
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            height: '500px',
          }}
        >
          <div className="flex justify-content-center pt-3">
            <i
              className="pi pi-envelope px-5"
              style={{
                fontSize: '4em',
                color: '#f561b0',
              }}
            />
          </div>
          <div className="flex justify-content-center">
            <p className="font" style={{ lineHeight: 3, fontSize: '2em' }}>
              Email Us
            </p>
          </div>
          <div className="flex justify-content-center">
            <p
              className="font"
              style={{ fontSize: '1.5em', textAlign: 'center' }}
            >
              Send your questions to us and get an answer within 1-3 days
            </p>
          </div>
          <div className="flex justify-content-center">
            <p className="font" style={{ lineHeight: 3, fontSize: '1.5em' }}>
              heartysupport@gmail.com
            </p>
          </div>
          <div className="flex justify-content-center pl-3">
            <CopyToClipboard
              text={'heartysupport@gmail.com'}
              onCopy={onCopyText1}
            >
              <div className="px-3">
                <Toast ref={toast} />
                <Button
                  label="Email Us"
                  size="large"
                  style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
                  onClick={() =>
                    showToast(
                      'success',
                      'Successful',
                      'The email has been copied to your clipboard.',
                    )
                  }
                />{' '}
              </div>
            </CopyToClipboard>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Contact
