import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import AddProject from "./AddProject";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProjectNavbar from "../HeartyNavbar/ProjectNavbar";
import WeddingProjectAPI from "../ProjectOverview/WeddingProjectAPI";
import { LoginTokenContext } from "../../context/LoginTokenContext";

function ProjectDashboard() {
    const [token, setToken] = useContext(LoginTokenContext);
    const orgId = console.log(token.userId);
    const [showCard, setShowCard] = useState(false);

    const [uncompletedProjects, setUncompletedProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    //const orgId = 10
    useEffect(() => {
        const uncompletedData = () => {
            WeddingProjectAPI.getWeddingProjectsByWeddingOrganiserId(orgId)
                .then((res) => res.json()) //change format to
                .then((weddingProjects) => {
                    setUncompletedProjects(weddingProjects);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    }, []);

    /*useEffect(() => {
    const completedData = () => {
      WeddingProjectAPI.getWeddingProjectsByWeddingOrganiserId(orgId, true)
        .then((res) => res.json())
        .then((weddingProjects) => {
          setCompletedProjects(weddingProjects)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])*/

    function handleShowCard() {
        setShowCard(true);
    }

    const header = (
        <div
            className="table-header"
            style={{
                backgroundColor: "#f561b0",
                color: "#ffffff",
                borderColor: "#f561b0",
                padding: "15px",
            }}
        >
            Current Projects
        </div>
    );
    const header2 = (
        <div
            className="table-header"
            style={{
                backgroundColor: "#f561b0",
                color: "#ffffff",
                borderColor: "#f561b0",
                padding: "15px",
            }}
        >
            Completed Projects
        </div>
    );

    return (
        <div>
            <ProjectNavbar />
            <div id="bodyContainer" className="pt-5 px-3">
                <Button
                    className="top-right-button"
                    label="Add Project"
                    icon="pi pi-plus"
                    style={{ backgroundColor: "#f561b0", border: "#f561b0" }}
                    onClick={handleShowCard}
                />
                <Dialog visible={showCard} onHide={() => setShowCard(false)}>
                    <AddProject />
                </Dialog>

                <div className="flex justify-content-center">
                    <p style={{ lineHeight: 1.5, fontSize: "2em" }}>
                        My Projects
                    </p>
                </div>
                <div>
                    <DataTable
                        className="px-2"
                        responsiveLayout="scroll"
                        header={header}
                    >
                        <Column
                            className="px-5"
                            field="projectname"
                            header=" Project Name"
                            value={uncompletedProjects.name}
                        />
                        <Column field="cost" header="Budget" />
                    </DataTable>
                </div>
                <div>
                    <DataTable
                        className="px-2"
                        responsiveLayout="scroll"
                        header={header2}
                    >
                        <Column
                            className="px-5"
                            field="projectname"
                            header=" Project Name"
                            value={completedProjects.name}
                        />
                        <Column field="cost" header="Budget" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default ProjectDashboard;
