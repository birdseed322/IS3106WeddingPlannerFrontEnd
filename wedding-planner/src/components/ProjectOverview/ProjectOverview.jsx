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
import { Fieldset } from "primereact/fieldset";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primeflex/primeflex.css";
import { classNames } from "primereact/utils";
import { Panel } from "primereact/panel";
import { Chart } from "primereact/chart";
import {
    computeAndSetVendorsPaidAndTotalCost,
    computeGuestInfo,
    computeRequestsInfo,
    fetchAndSetVendoTransObjectList,
    fetchAndSetVendorsTransactionsList,
    generateVendorCostPieChartData,
    requestAndComputeHiredVendors,
} from "./ProjectOverviewHelperMethods";
import BrideGroomDataTable from "./ProjectOverviewDataTables/BrideGroomGuestsDataTable";
import EditProject from "./EditProject";
import RequestsDataTable from "./ProjectOverviewDataTables/RequestsDataTable";
import WeddingBudgetPlannerAPI from "../LogisticsManagement/WeddingBudgetPlannerAPI";

const dateProcessor = (dateString) => {
    if (typeof dateString === "string") {
        // it works without this if-else but just in case sth goes wrong:
        if (dateString[dateString.length - 1] == "]") {
            return new Date(dateString.slice(0, -5));
        } else {
            return new Date(dateString);
        }
    } else {
        return new Date(0); // return 0 so undefined doesnt crash the whole thing when trying to render before data is fetched
    }
};

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

    const emptyBudget = {
        //weddingBudgetListId: -1,
        budget: 0,
        weddingBudgetItems: [],
    };

    const [currentProject, setCurrentProject] = useState(emptyProject);
    const [projectGuestList, setProjectGuestList] = useState([]);
    const [projectTables, setProjectTables] = useState([]);
    const [projectWeddingChecklist, setProjectWeddingChecklist] = useState({});
    const [projectBudgetList, setProjectBudgetList] = useState(emptyBudget);
    const [projectRequests, setProjectRequests] = useState([]);
    const [projectHiredVendors, setProjectHiredVendors] = useState([]);
    const [projectVendorsPaidCostAndTotalCost, setProjectPaidCostAndTotalCost] = useState([]);
    // ^ this is of the form [paidCost, totalCost]
    const [projectVendoTransObjectList, setProjectVendoTransObjectList] = useState([]);
    // ^ vendoTransObj is an object of the form: {vendor: VendorObject, transaction: TransactionObject}
    const [vendorsCostPieChartData, setVendorsCostPieChartData] = useState();

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

    const [projectRequestsInfo, setProjectRequestsInfo] = useState({
        pending: 0,
        rejected: 0,
        accepted: 0,
        total: 0,
    });

    // --- INITIAL DATA FETCHING ---
    useEffect(() => {
        let fetchedProject;

        // actually no need to use fetchedProject variable but if it works it worrks
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
                console.log("logging guestList");
                console.log(guestList);
                setProjectGuestList(guestList);
            })
            .then(() => TableApi.getTables(fetchedProject.weddingProjectId))
            .then((res) => res.json())
            .then((tables) => setProjectTables(tables))
            .catch(() => console.log("sth went wrong with fetching tables"))
            .then(() =>
                WeddingProjectAPI.getRequestsByWeddingProjectId(fetchedProject.weddingProjectId)
            )
            .then((res) => res.json())
            .then((requests) => {
                // console.log('logging requests');
                // console.log(requests);
                setProjectRequests(requests);
            })
            .catch(() => console.log("something went wrong with fetching requests"));

        WeddingProjectAPI.getWeddingChecklistByWeddingProjectId(projectId)
            .then((res) => res.json())
            .then((weddingChecklist) => {
                console.log("loggin weddingchecklist");
                console.log(weddingChecklist);
                setProjectWeddingChecklist(weddingChecklist);
            });

        WeddingBudgetPlannerAPI.getBudgetByWeddingProject(projectId)
            .then((res) => res.json())
            .then((budgetList) => {
                console.log("logging budgetlist");
                console.log(budgetList);
                setProjectBudgetList(budgetList);
            })
            .catch((e) => console.log("sth went wrong w fetching budget: " + e));
    }, []);

    useEffect(() => {
        const guestInfo = computeGuestInfo(projectGuestList);
        console.log(guestInfo);
        setBrideGroomAttendingGuestInfo(guestInfo);
    }, [projectGuestList]);

    useEffect(() => {
        const requestsInfo = computeRequestsInfo(projectRequests);
        console.log("Requests info is: ");
        console.log(requestsInfo);
        setProjectRequestsInfo(requestsInfo);

        // these 2 fns dont need to call set fn directly, they are passed in as callback fn
        requestAndComputeHiredVendors(projectRequests, setProjectHiredVendors);
        fetchAndSetVendoTransObjectList(projectRequests, setProjectVendoTransObjectList);
    }, [projectRequests]);

    // generating pie chart data for vendor costs, once projectVendoTransObjectList is updated
    // also generate the paid and total cost data
    useEffect(() => {
        generateVendorCostPieChartData(projectVendoTransObjectList, setVendorsCostPieChartData);
        computeAndSetVendorsPaidAndTotalCost(
            projectVendoTransObjectList,
            setProjectPaidCostAndTotalCost
        );
    }, [projectVendoTransObjectList]);

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
                    <Fieldset legend="Description">
                        <p>{currentProject.description}</p>
                    </Fieldset>
                    <Fieldset legend="Date">
                        <p>
                            Date of wedding:{" "}
                            <b>
                                {dateProcessor(currentProject.weddingDate).toLocaleString(
                                    undefined,
                                    { year: "numeric", month: "numeric", day: "numeric" }
                                )}
                            </b>{" "}
                            <br />
                            Start time:{" "}
                            <b>
                                {dateProcessor(currentProject.weddingStartTime).toLocaleString(
                                    undefined,
                                    { hour: "2-digit", minute: "2-digit" }
                                )}{" "}
                            </b>
                            <br />
                            End time:
                            <b>
                                {" "}
                                {dateProcessor(currentProject.weddingEndTime).toLocaleString(
                                    undefined,
                                    { hour: "2-digit", minute: "2-digit" }
                                )}{" "}
                            </b>
                            <br />
                        </p>
                    </Fieldset>
                    <Fieldset legend="Venue & Directions">
                        <p>{currentProject.venue}</p>
                    </Fieldset>

                    <div className="grid grid-nogutter">
                        <div className="col-12 md:col-6">
                            {/* there is no way to style header and content using headerStyle and contentStyle attributes */}
                            {/* This shit is literally bugged and there are many ppl online complaining as well */}
                            {/* To customise it u have to go in-depth into the CSS, and do some descendant selectors */}
                            {/* someAccordionStyle example is in the App.css */}
                            <Accordion multiple activeIndex={[0, 1]}>
                                <AccordionTab className="m-1" header="Guests & Tables">
                                    <BrideGroomDataTable
                                        guestNumberInfo={brideGroomAttendingGuestInfo}
                                    />

                                    <br />
                                    <p>Number of tables: {projectTables.length}</p>

                                    <p>maybe buttons that links to guestlist & tables</p>
                                </AccordionTab>
                                <AccordionTab className="m-1" header="Tasks & Budget">
                                    {/* check if the checklist parent tasks list is undefined , or if it exists, then check if it has any parent tasks*/}
                                    {(projectWeddingChecklist.weddingParentTasks == undefined ||
                                        projectWeddingChecklist.weddingParentTasks.length == 0) && (
                                        <p>You do not have any tasks set.</p>
                                    )}
                                    {/* checking the opposite of the above*/}
                                    {projectWeddingChecklist.weddingParentTasks != undefined &&
                                        projectWeddingChecklist.weddingParentTasks.length > 0 && (
                                            <>
                                                <p>
                                                    Current task progress:{" "}
                                                    <b>
                                                        {
                                                            projectWeddingChecklist.weddingParentTasks.filter(
                                                                (task) => task.isDone
                                                            ).length
                                                        }
                                                    </b>{" "}
                                                    out of{" "}
                                                    <b>
                                                        {
                                                            projectWeddingChecklist
                                                                .weddingParentTasks.length
                                                        }
                                                    </b>{" "}
                                                    main tasks done
                                                </p>
                                            </>
                                        )}

                                    <p>
                                        Budget set: <b>${projectBudgetList.budget}</b>
                                    </p>
                                    <p>
                                        Current cost:{" "}
                                        <b>
                                            $
                                            {projectBudgetList.weddingBudgetItems.reduce(
                                                (prev, currObj) => {
                                                    return prev + currObj.cost;
                                                },
                                                0
                                            )}
                                        </b>
                                    </p>
                                </AccordionTab>
                            </Accordion>
                        </div>
                        <div className="col-12 md:col-6">
                            <Accordion multiple activeIndex={[0, 1]}>
                                <AccordionTab className="m-1 someAccordionStyle" header="Vendors">
                                    {projectHiredVendors.length == 0 && (
                                        <p>You currently have not hired any vendors.</p>
                                    )}
                                    {projectHiredVendors.length != 0 && (
                                        <>
                                            <p>
                                                Vendors hired: <b>{projectHiredVendors.length}</b>
                                            </p>
                                            <p>
                                                Paid/Total cost of vendors:{" "}
                                                <b>
                                                    ${projectVendorsPaidCostAndTotalCost[0]}
                                                    {" / "}${projectVendorsPaidCostAndTotalCost[1]}
                                                </b>
                                            </p>
                                            <Card title="Cost Breakdown By Vendor">
                                                <Chart
                                                    type="pie"
                                                    data={vendorsCostPieChartData}
                                                    options={{ animation: true }}
                                                    className="w-full"
                                                />
                                            </Card>
                                            <p>maybe buttons that link to vendors</p>
                                        </>
                                    )}
                                </AccordionTab>
                                <AccordionTab className="m-1" header="Requests Overview">
                                    <RequestsDataTable requestsInfo={projectRequestsInfo} />
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
