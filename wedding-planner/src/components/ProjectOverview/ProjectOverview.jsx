import { useContext, useState, useEffect } from "react";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { useParams, useSearchParams } from "react-router-dom";
import WeddingProjectAPI from "./WeddingProjectAPI";
import GuestListAPI from "../GuestManagement/GuestListAPI";
import TableApi from "../GuestManagement/TableApi";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primeflex/primeflex.css";
import { classNames } from "primereact/utils";
import { Panel } from "primereact/panel";
import { computeGuestInfo } from "./ProjectOverviewHelperMethods";
import BrideGroomDataTable from "./BrideGroomGuestsDataTable";
import EditProject from "./EditProject";

const dateProcessor = (dateString) => {
    if (typeof dateString === "string") {
        // it works without this if-else but just in case sth goes wrong:
        if (dateString[dateString.length - 1] == "]") {
            return new Date(dateString.slice(0, -5));
        } else {
            return new Date(dateString);
        }
    } else {
        return undefined;
    }
};

const dateFormatter = (dateObject) => {
    if (dateObject == undefined) return '';
    
    return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
}
export default function ProjectOverview() {
    // note that HeartyNavbar has an id specified in its component jsx file
    const [token, setToken] = useContext(LoginTokenContext);
    const { projectId } = useParams();

    const [showCard, setShowCard] = useState(false);

    const emptyProject = {
        weddingProjectId: -1,
        name: "emptyName",
        description: "emptyDesc",
        completed: false,
    };
    const [currentProject, setCurrentProject] = useState(emptyProject);
    const [projectGuestList, setProjectGuestList] = useState([]);
    const [projectTables, setProjectTables] = useState([]);
    const [projectWeddingChecklist, setProjectWeddingChecklist] = useState([]);
    // const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.getAll("x"))
    // for (const x of searchParams.entries()) {
    //     console.log(x);
    // }

    const [brideGroomAttendingGuestInfo, setBrideGroomAttendingGuestInfo] = useState({
        total: {
            confirmed: 0,
            notAttending: 0,
            pending: 0,
            notSent: 0,
        },
        bride: {
            confirmed: 0,
            notAttending: 0,
            pending: 0,
            notSent: 0,
        },
        groom: {
            confirmed: 0,
            notAttending: 0,
            pending: 0,
            notSent: 0,
        },
    });

    useEffect(() => {
        let fetchedProject;
        // let fetchedGuestList;

        WeddingProjectAPI.getWeddingProjectById(projectId)
            .then((res) => res.json())
            .then((weddingProject) => {
                setCurrentProject(weddingProject);
                fetchedProject = weddingProject;
                console.log(weddingProject);
            })
            .catch(() => console.log("soemthing went wrong with fetching wedding project"))
            .then(() => GuestListAPI.getAllGuests(fetchedProject.weddingProjectId))
            .then((res) => res.json())
            .then((guestList) => {
                setProjectGuestList(guestList);
                // fetchedGuestList = guestList;
            })
            .then(() => TableApi.getTables(fetchedProject.weddingProjectId))
            .then((res) => res.json())
            .then((tables) => setProjectTables(tables))
            .catch(() => console.log("sth went wrong with fetching tables"));
    }, []);

    useEffect(() => {
        // const testGuests = [
        //     {
        //         id: 1,
        //         name: "foo",
        //         attendingSide: "BRIDE",
        //         email: "bar",
        //         numPax: 3,
        //         rsvp: "CONFIRMED",
        //     },
        //     {
        //         id: 2,
        //         name: "foo",
        //         attendingSide: "BRIDE",
        //         email: "bar",
        //         numPax: 3,
        //         rsvp: "PENDING",
        //     },
        //     {
        //         id: 4,
        //         name: "foo",
        //         attendingSide: "GROOM",
        //         email: "bar",
        //         numPax: 2,
        //         rsvp: "PENDING",
        //     },
        // ];
        const guestInfo = computeGuestInfo(projectGuestList);
        console.log(guestInfo);
        setBrideGroomAttendingGuestInfo(guestInfo);
    }, [projectGuestList]);

    useEffect(() => console.log(projectTables), [projectTables]);

    const headerToolbar = () => {
        const startContent = () => <b className="text-2xl">Project Overview</b>;

        const endContent = () => (
            <Button
                label="Edit"
                icon="pi pi-file-edit"
                style={{ backgroundColor: "blue", border: "#f561b0", marginRight: "1rem" }}
                onClick={() => setShowCard(true)}
            />
        );

        return <Toolbar start={startContent} end={endContent} />;
    };

    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                {/* <div className="bodyTextColumn"> */}
                <Dialog header="Edit Project" visible={showCard} onHide={() => setShowCard(false)}>
                    <EditProject
                        currentProject={currentProject}
                        setCurrentProject={setCurrentProject}
                        weddingProjectAPI={WeddingProjectAPI}
                    />
                </Dialog>
                <Card title={currentProject.name} header={headerToolbar}>
                    <p>{currentProject.description}</p>
                    
                    <p>Date of wedding: {dateFormatter(dateProcessor(currentProject.weddingDate))}</p>
                    
                    <div className="grid grid-nogutter">
                        <div className="col-12 md:col-6">
                            {/* there is no way to style header and content using headerStyle and contentStyle attributes */}
                            {/* This shit is literally bugged and there are many ppl online complaining as well */}
                            {/* To customise it u have to go in-depth into the CSS, and do some descendant selectors */}
                            {/* someAccordionStyle example is in the App.css */}
                            <Accordion multiple>
                                <AccordionTab className="m-1" header="Guests & Tables">
                                    <BrideGroomDataTable
                                        guestNumberInfo={brideGroomAttendingGuestInfo}
                                    />

                                    <br />
                                    <p>Number of tables: {projectTables.length}</p>

                                    <p>maybe buttons that links to guestlist & tables</p>
                                </AccordionTab>
                                {projectTables.length}
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
                {/* </div> */}
            </div>
        </div>
    );
}
