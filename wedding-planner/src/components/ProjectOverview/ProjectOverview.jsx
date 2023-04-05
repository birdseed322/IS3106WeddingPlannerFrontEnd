import { useContext, useState, useEffect } from "react";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { useParams, useSearchParams } from "react-router-dom";
import WeddingProjectAPI from "./WeddingProjectAPI";

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
    // const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.getAll("x"))
    // for (const x of searchParams.entries()) {
    //     console.log(x);
    // }

    useEffect(() => {
        WeddingProjectAPI.getWeddingProjectById(projectId)
            .then((res) => res.json())
            .then((weddingProject) => setCurrentProject(weddingProject));
    }, []);
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <h1>{currentProject.name}</h1>
                    <h2>Description</h2>
                    <p>{currentProject.description}</p>
                </div>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>
        </div>
    );
}
