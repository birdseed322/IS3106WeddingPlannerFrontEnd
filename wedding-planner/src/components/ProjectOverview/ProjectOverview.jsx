import { useContext, useState, useEffect } from "react";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { useParams, useSearchParams } from "react-router-dom";
import WeddingProjectAPI from "./WeddingProjectAPI";
import GuestListAPI from "../GuestManagement/GuestListAPI";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primeflex/primeflex.css";
import { classNames } from "primereact/utils";
import { Panel } from "primereact/panel";

export default function ProjectOverview() {
    // note that HeartyNavbar has an id specified in its component jsx file
    const [token, setToken] = useContext(LoginTokenContext);
    const { projectId } = useParams();

    const emptyProject = {
        weddingProjectId: -1,
        name: "emptyName",
        description: "emptyDesc",
        completed: false,
    };
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
            .catch(() => console.log("soemthing went wrong with fetching wedding project"))
            .then(GuestListAPI.getAllGuests(currentProject.weddingProjectId))
            .then((res) => res.json())
            .then((guestList) => setProjectGuestList(guestList))
            .catch(() => {
                console.log("something went wrong with fetching guest list, setting list to empty");
                setProjectGuestList([]);
            });
    }, []);
    
    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <Card title={currentProject.name}>
                        <p>{currentProject.description}</p>
                        <div className="grid grid-nogutter">
                            <div className="col-12 md:col-6">
                                {/* there is no way to style header and content using headerStyle and contentStyle attributes */}
                                {/* This shit is literally bugged and there are many ppl online complaining as well */}
                                {/* To customise it u have to go in-depth into the CSS, and do some descendant selectors */}
                                {/* someAccordionStyle example is in the App.css */}
                                <Accordion multiple>
                                    <AccordionTab className="m-1" header="Guests & Tables">
                                        <p>Number of guests: {projectGuestList.length}</p>
                                        <p>Number of tables: X</p>
                                        <p>maybe buttons that links to guestlist & tables</p>
                                    </AccordionTab>
                                    <AccordionTab className="m-1" header="Tasks & Budget">
                                        <p>Current task progress: X out of Y tasks done</p>
                                        <p>Budget set: $X</p>
                                        <p>Current cost: $Y</p>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                            <div className="col-12 md:col-6">
                                <Accordion multiple>
                                    <AccordionTab className="m-1 someAccordionStyle" header="Vendors">
                                        <p>Vendors hired: X</p>
                                        <p>Total cost of vendors: $X</p>
                                        <p>maybe buttons that link to vendors</p>
                                    </AccordionTab>
                                    <AccordionTab className="m-1" header="Pending Requests">
                                        <p>Number of pending request: X</p>
                                        <p>maybe buttons that link to requests</p>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                        </div>
                        
                        {/* Panel alternative, slightly easier but still ridiculous customisation hurdles */}
                        {/* <div className="grid grid-nogutter">
                            <div className="col-12 md:col-6">

                                    <Panel className="m-1 testPanelStyle" header="Guests & Tables" toggleable> 
                                        <div className="bg-primary"> test</div>
                                        <p>Number of guests: {projectGuestList.length}</p>
                                        <p>Number of tables: X</p>
                                        <p>maybe buttons that links to guestlist & tables</p>
                                    </Panel>
                                    <Panel className="m-1" header="Tasks & Budget" toggleable>
                                        <p>Current task progress: X out of Y tasks done</p>
                                        <p>Budget set: $X</p>
                                        <p>Current cost: $Y</p>
                                    </Panel>
                            </div>
                        </div> */}
                        
                        
                    </Card>
                    
                </div>
            </div>
        </div>
    );
}
