import { useContext, useState, useEffect } from "react";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { useParams, useSearchParams } from "react-router-dom";
import WeddingProjectAPI from "./WeddingProjectAPI";
import GuestListAPI from "../GuestManagement/GuestListAPI";
import { Card } from "primereact/card";

export default function ProjectOverview() {
    // note that HeartyNavbar has an id specified in its component jsx file
    const [token, setToken] = useContext(LoginTokenContext);
    const { projectId } = useParams();
    
    const emptyProject = {
        
        weddingProjectId: -1,
        name: "emptyName",
        description: "emptyDesc",
        completed: false,
        
    }
    const [currentProject, setCurrentProject] = useState(emptyProject);
    const [projectGuestList, setProjectGuestList] = useState([]);
    const [projectWeddingChecklist, setProjectWeddingChecklist] = useState([]);
    // const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.getAll("x"))
    // for (const x of searchParams.entries()) {
    //     console.log(x);
    // }

    useEffect(() => {
        WeddingProjectAPI.getWeddingProjectById(projectId)
            .then((res) => res.json())
            .then((weddingProject) => setCurrentProject(weddingProject))
            .then(GuestListAPI.getAllGuests(currentProject.weddingProjectId))
            .then((res) => res.json())
            .then((guestList) => setProjectGuestList(guestList));
    }, []);
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">

        
                <div className="bodyTextColumn">
                <Card title={currentProject.name}>
                    <p>{currentProject.description}</p>
                    <p>Number of guests: {projectGuestList.length}</p>
                </Card>
                </div>
            </div>
        </div>
    );
}
