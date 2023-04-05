import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import { useForm, Controller } from 'react-hook-form'

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function AddProject() {
  const [showMessage, setShowMessage] = useState(false)
  const [formData, setFormData] = useState({})
  const defaultValues = {
    name: '',
    description: '',
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    setFormData(data)
    setShowMessage(true)

    reset()
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  )

  return (
    <div>
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: '5rem', color: 'var(--green-500)' }}
          ></i>
          <h5>Project Added!</h5>
        </div>
      </Dialog>
      <div
        style={{
          minWidth: '450px',
          maxWidth: '700px',
          minHeight: '150px',
          maxHeight: '350px',
        }}
      >
        <h2 className="flex justify-content-center">New Project</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field pt-1">
            <span>
              <label
                htmlFor="name"
                className={classNames({
                  'p-error': errors.name,
                  'px-3': true,
                })}
              >
                Project Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Project name is required.' }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({
                      'p-invalid': fieldState.invalid,
                      'px-2': true,
                    })}
                  />
                )}
              />
            </span>

            {getFormErrorMessage('name')}
          </div>
          <div className="field">
            <label htmlFor="description" className="px-3">
              Description{' '}
            </label>
            <span className="px-3">
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <InputTextarea className="px-2" id={field.name} {...field} />
                )}
              />
            </span>
          </div>
          <span className="flex justify-content-center pb-3">
            <Button
              label="Add Project"
              style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
            />{' '}
          </span>
        </form>
      </div>
    </div>
  )
}

export default AddProject
