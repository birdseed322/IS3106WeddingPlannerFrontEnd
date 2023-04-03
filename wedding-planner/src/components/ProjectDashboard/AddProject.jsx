import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React from 'react'
import { Link } from 'react-router-dom'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function AddProject() {
  const footer = (
    <span className="flex justify-content-center ">
      <Button
        label="Add Project"
        style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
      />{' '}
    </span>
  )
  return (
    <div>
      <Card
        footer={footer}
        style={{
          minWidth: '500px',
          maxWidth: '700px',
          minHeight: '200px',
          maxHeight: '400px',
        }}
      >
        <h2 className="flex justify-content-center">New Project</h2>
        <div className="flex justify-content-center">
          <h4>Project Name</h4>
        </div>
        <div className="flex justify-content-center">
          <h4>Description</h4>
        </div>
      </Card>
    </div>
  )
}

export default AddProject
