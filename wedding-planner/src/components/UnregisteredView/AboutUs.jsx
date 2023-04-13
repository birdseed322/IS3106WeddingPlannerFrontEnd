import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React from 'react'
import { Link } from 'react-router-dom'
import PublicHeartyNavbar from '../HeartyNavbar/PublicHeartyNavbar'
import backgroundImage from './Background/aboutus.png'
//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function AboutUs() {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
  }
  return (
    <div>
      <PublicHeartyNavbar />
      <div style={styles}>
        <div>
          <div className="flex justify-content-left pt-5 px-7">
            <i
              className="pi pi-heart"
              style={{
                fontSize: '5em',
                color: '#ffffff',
                backgroundColor: '#f561b0',
                borderRadius: 10,
                padding: 30,
                border: '#f561b0',
              }}
            />
            <p
              className="titleFont"
              style={{
                lineHeight: 1.75,
                textIndent: '0.25em',
                fontSize: '5em',
              }}
            >
              Hearty
            </p>
          </div>
          <div className="flex justify-content-right pb-8">
            <p
              className="font"
              style={{ lineHeight: 0, textIndent: '7em', fontSize: '2em' }}
            >
              Have a hearty time with us
            </p>
          </div>
          <div className="pt-5 px-0">
            <Card
              style={{
                width: '757px',
                minHeight: '200px',
                maxHeight: '700px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0)',
              }}
            >
              <div className="flex pt-0">
                <p
                  className="font"
                  style={{ textIndent: '1em', fontSize: '2em' }}
                >
                  What We Do
                </p>
              </div>
              <div className="flex px-5">
                <p
                  className="font"
                  style={{
                    lineHeight: 1.5,
                    textIndent: '2em',
                    fontSize: '1.25em',
                  }}
                >
                  Let us help you create the wedding of your dreams! From
                  creating a budget and guest list, to finding the perfect venue
                  and vendors, our platform is designed to assist wedding
                  planners in organizing a memorable and stress-free wedding.
                </p>
              </div>

              <div className="flex px-5">
                <Link to="/login" className="noUnderline">
                  <p
                    className="fontextra"
                    style={{
                      lineHeight: 4,
                      textIndent: '1em',
                      fontSize: '1.5em',
                    }}
                  >
                    Start a Project
                  </p>
                </Link>
              </div>
            </Card>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
