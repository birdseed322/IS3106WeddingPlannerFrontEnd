import { Button } from 'primereact/button'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ProjectNavbar from '../HeartyNavbar/ProjectNavbar'
import WeddingProjectAPI from '../ProjectOverview/WeddingProjectAPI'
import { LoginTokenContext } from '../../context/LoginTokenContext'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import moment from 'moment'
import { Toast } from 'primereact/toast'
import { Calendar } from 'primereact/calendar'

function ProjectDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const toast = useRef(null)

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const [token, setToken] = useContext(LoginTokenContext)
  const orgId = token.userId
  const [showCard, setShowCard] = useState(false)
  const [uncompletedProjects, setUncompletedProjects] = useState([])
  const [completedProjects, setCompletedProjects] = useState([])
  const dateProcessor = (dateString) => {
    if (typeof dateString === 'string') {
      // it works without this if-else but just in case sth goes wrong:
      if (dateString[dateString.length - 1] == ']') {
        return new Date(dateString.slice(0, -5))
      } else {
        return new Date(dateString)
      }
    } else {
      return undefined
    }
  }

  const dateFormatter = (dateObject) => {
    if (dateObject == undefined) return ''

    const year = dateObject.getFullYear()
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const day = dateObject.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }
  //const orgId = 10

  useEffect(() => {
    reloadData()
    WeddingProjectAPI.getWeddingProjectsByWeddingOrganiserId(orgId, true)
      .then((res) => res.json()) //change format to response
      .then((weddingProjects) => {
        for (const weddingProject of weddingProjects) {
          const { id, name, description, isCompleted } = weddingProject
          const existingProject1 = completedProjects.find((p) => p.id === id)
          if (!existingProject1) {
            setCompletedProjects((prev) => [...prev, weddingProject])
          }
        }
      })
      .catch((error) => {
        console.log(error)
        toast.current.show({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Project was not found',
        })
      })
  }, [])

  const reloadData = () => {
    WeddingProjectAPI.getWeddingProjectsByWeddingOrganiserId(orgId)
      .then((res) => res.json()) //change format to response
      .then((weddingProjects) => {
        for (const weddingProject of weddingProjects) {
          const { id, name, description, isCompleted } = weddingProject
          const existingProject = uncompletedProjects.find((p) => p.id === id)
          if (!existingProject) {
            setUncompletedProjects((prev) => [...prev, weddingProject])
          }
        }
      })
      .catch((error) => {
        console.log(error)
        toast.current.show({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Project was not found',
        })
      })
  }

  function AddProject() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [weddingDate, setWeddingDate] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()
      WeddingProjectAPI.createWeddingProject(orgId, {
        name,
        description,
        weddingDate,
      })
        .then((weddingProject) => {
          setShowCard(false)
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Project created',
          })
          reloadData()
        })
        .catch((error) => {
          console.log(error)
          toast.current.show({
            severity: 'error',
            summary: 'UnSuccessful',
            detail: `Error creating project: ${error.message}`,
          })
        })
    }

    return (
      <div
        style={{
          minWidth: '450px',
          maxWidth: '700px',
          minHeight: '150px',
          maxHeight: '350px',
        }}
      >
        <h2 className="flex justify-content-center">New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="field pt-1">
            <span>
              <label
                htmlFor="name"
                className={classNames({
                  'px-3': true,
                })}
              >
                Project Name
              </label>
              <InputText
                id="inputName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>
          </div>
          <div className="field">
            <label htmlFor="description" className="px-3">
              Description
            </label>
            <span className="px-3">
              <InputTextarea
                className="px-2"
                id="inputDescription"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </span>
          </div>
          <div className="field">
            <label htmlFor="weddingDate" className="px-3">
              Wedding Date
            </label>
            <Calendar
              dateFormat="dd/mm/yy"
              required
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
            />
          </div>
          <span className="flex justify-content-center pb-3">
            <Button
              label="Add Project"
              style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
            />{' '}
          </span>
        </form>
      </div>
    )
  }

  function handleShowCard() {
    setShowCard(true)
  }

  const header = (
    <div
      className="table-header"
      style={{
        backgroundColor: '#f561b0',
        color: '#ffffff',
        borderColor: '#f561b0',
        padding: '15px',
      }}
    >
      Current Projects
    </div>
  )
  const header2 = (
    <div
      className="table-header"
      style={{
        backgroundColor: '#f561b0',
        color: '#ffffff',
        borderColor: '#f561b0',
        padding: '15px',
      }}
    >
      Completed Projects
    </div>
  )

  const filteredData =
    searchTerm === ''
      ? completedProjects
      : completedProjects.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )

  const filteredData1 =
    searchTerm === ''
      ? uncompletedProjects
      : uncompletedProjects.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )

  return (
    <div>
      <ProjectNavbar searchTerm={searchTerm} onSearch={handleSearch} />
      <div id="bodyContainer" className="pt-5 px-3">
        <Toast ref={toast} />
        <Button
          className="top-right-button"
          label="Add Project"
          icon="pi pi-plus"
          style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
          onClick={handleShowCard}
        />

        <Dialog visible={showCard} onHide={() => setShowCard(false)}>
          <AddProject />
        </Dialog>

        <div className="flex justify-content-center">
          <p style={{ lineHeight: 1.5, fontSize: '2em' }}>My Projects</p>
        </div>
        <div>
          <DataTable
            className="px-2"
            responsiveLayout="scroll"
            header={header}
            value={filteredData1}
          >
            <Column className="px-5" field="name" header=" Project Name" />
            <Column
              field="weddingDate"
              header="Wedding Date"
              body={(rowData) => {
                const weddingDate = rowData.weddingDate
                if (!weddingDate) {
                  return <span> </span> // or any other default value you prefer
                }
                const formattedDate = dateFormatter(dateProcessor(weddingDate))
                return <span>{formattedDate}</span>
              }}
            />
            <Column
              field="id"
              header="Details"
              body={(rowData) => (
                <Link to={`/${rowData.weddingProjectId}`}>Overview</Link>
              )}
            />
          </DataTable>
        </div>
        <div>
          <DataTable
            className="px-2"
            responsiveLayout="scroll"
            header={header2}
            value={filteredData}
          >
            <Column className="px-5" field="name" header=" Project Name" />
            <Column
              field="weddingDate"
              header="Wedding Date"
              body={(rowData) => {
                const weddingDate = rowData.weddingDate
                if (!weddingDate) {
                  return <span> </span> // or any other default value you prefer
                }
                const formattedDate = dateFormatter(dateProcessor(weddingDate))
                return <span>{formattedDate}</span>
              }}
            />
            <Column
              field="id"
              header="Details"
              body={(rowData) => (
                <Link to={`/${rowData.weddingProjectId}`}>Overview</Link>
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default ProjectDashboard

/* const ProjectTable = ({ uncompletedProjects }) => {
    const filteredProjects = uncompletedProjects.filter((uncompletedProjects) =>
      uncompletedProjects.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    if (!searchTerm) {
      // If the search value is empty, display all projects
      filteredProjects = uncompletedProjects
    }
  }

  const ProjectTable2 = ({ completedProjects }) => {
    const filteredProjects2 = completedProjects.filter((completedProjects) =>
      completedProjects.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    if (!searchTerm) {
      // If the search value is empty, display all projects
      filteredProjects2 = completedProjects
    }
  }*/
