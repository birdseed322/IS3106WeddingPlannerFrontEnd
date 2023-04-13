// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext, memo } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useParams } from "react-router-dom";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import heartyLogo from "../../images/favicon-heart-3.png";

function HeartyNavbar(props) {
  // array of MenuItems
  // see https://www.primefaces.org/primereact-v8/menumodel/
  const [token, setToken] = useContext(LoginTokenContext);

  // gets projectId from URL parameters
  const { projectId } = useParams();

  const items = [
    {
      label: "Project Overview",
      icon: "pi pi-fw pi-info-circle",
      url: `/${projectId}`,
      className: "menuItemStyle",
    },

    {
      label: "Vendor Management",
      icon: "pi pi-fw pi-file",
      className: "menuItemStyle",
      items: [
        {
          label: "Vendor Search Page",
          icon: "pi pi-search",
          url: `/${projectId}/VendorSearchPage`,
        },
        {
          label: "My requests",
          icon: "pi pi-comment",
          url: `/${projectId}/requests`,
        },
      ],
    },
    {
      label: "Guest Management",
      icon: "pi pi-fw pi-users",
      className: "menuItemStyle",
      items: [
        {
          label: "Guest List",
          icon: "pi pi-fw pi-users",
          url: `/${projectId}/guestlist`,
        },
        {
          label: "Table Planner",
          icon: "pi pi-fw pi-circle",
          url: `/${projectId}/tablelayout`,
        },
      ],
    },
    {
      label: "Logistics Management",
      icon: "pi pi-table",
      className: "menuItemStyle",
      items: [
        {
          label: "Wedding Checklist",
          icon: "pi pi-check",
          url: `/${projectId}/LogisticsManagement/WeddingChecklist`,
        },
        {
          label: "Budget Planner",
          icon: "pi pi-money-bill",
          url: `/${projectId}/LogisticsManagement/WeddingBudgetPlanner`,
        },
        {
          label: "Wedding Itinerary",
          icon: "pi pi-calendar",
          url: `/${projectId}/LogisticsManagement/WeddingItinerary`,
        },
      ],
    },
  ];
  const end = (
    // for border attribute, need to specify pixel, pattern  & colour(eg. border: 1px solid black)
    <>
      <Link to="/" className="noUnderline">
        <Button
          icon="pi pi-undo"
          label="Back to Projects"
          severity="secondary"
          text
          style={{ marginRight: "1rem" }}
        />
      </Link>
      <Link to="/login" className="noUnderline">
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          style={{
            backgroundColor: "#f561b0",
            border: "#f561b0",
            marginRight: "1rem",
          }}
          onClick={() => setToken(false)} // set token to false
        />{" "}
      </Link>

      {/*       <Link to="/viewprofile" className="noUnderline">
        <Button
          icon="pi pi-user"
          rounded
          style={{ backgroundColor: '#f561b0', border: '#f561b0' }}
        />
      </Link> */}
    </>
  );
  const start = (
    <>
    <Link to="/" className="noUnderline">
      <span className="flex my-1 mx-4 align-items-center">
        <img src={heartyLogo} className="mr-2" alt="hearty logo" />
        <h1 className="inline h-min text-3xl">Hearty</h1>
      </span>
    </Link>
  </>
  );
  // height="40" className="mr-2"
  //console.log(items)
  // since we're only returning Menubar anyway, no need to wrap around a div or <>
  return (
    <Menubar
      id="navbar"
      className="p-4"
      model={items}
      start={start}
      end={end}
    />
  );
}
export default memo(HeartyNavbar);

// example items
// const items = [
//     {
//         label: "Vendor Management",
//         icon: "pi pi-fw pi-file",
//         items: [
//             {
//                 label: "New",
//                 icon: "pi pi-fw pi-plus",
//                 items: [
//                     {
//                         label: "Bookmark",
//                         icon: "pi pi-fw pi-bookmark",
//                     },
//                     {
//                         label: "Video",
//                         icon: "pi pi-fw pi-video",
//                     },
//                 ],
//             },
//             {
//                 label: "Delete",
//                 icon: "pi pi-fw pi-trash",
//             },
//             {
//                 separator: true,
//             },
//             {
//                 label: "Export",
//                 icon: "pi pi-fw pi-external-link",
//             },
//         ],
//     },
//     {
//         label: "Logistics Management",
//         icon: "pi pi-fw pi-pencil",
//         items: [
//             {
//                 label: "Left",
//                 icon: "pi pi-fw pi-align-left",
//             },
//             {
//                 label: "Right",
//                 icon: "pi pi-fw pi-align-right",
//             },
//             {
//                 label: "Center",
//                 icon: "pi pi-fw pi-align-center",
//             },
//             {
//                 label: "Justify",
//                 icon: "pi pi-fw pi-align-justify",
//             },
//         ],
//     },
//     {
//         label: "Guest Management",
//         icon: "pi pi-fw pi-users",
//         items: [
//             {
//                 label: "New",
//                 icon: "pi pi-fw pi-user-plus",
//             },
//             {
//                 label: "Delete",
//                 icon: "pi pi-fw pi-user-minus",
//             },
//             {
//                 label: "Search",
//                 icon: "pi pi-fw pi-users",
//                 items: [
//                     {
//                         label: "Filter",
//                         icon: "pi pi-fw pi-filter",
//                         items: [
//                             {
//                                 label: "Print",
//                                 icon: "pi pi-fw pi-print",
//                             },
//                         ],
//                     },
//                     {
//                         icon: "pi pi-fw pi-bars",
//                         label: "List",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: "Events",
//         icon: "pi pi-fw pi-calendar",
//         items: [
//             {
//                 label: "Edit",
//                 icon: "pi pi-fw pi-pencil",
//                 items: [
//                     {
//                         label: "Save",
//                         icon: "pi pi-fw pi-calendar-plus",
//                     },
//                     {
//                         label: "Delete",
//                         icon: "pi pi-fw pi-calendar-minus",
//                     },
//                 ],
//             },
//             {
//                 label: "Archive",
//                 icon: "pi pi-fw pi-calendar-times",
//                 items: [
//                     {
//                         label: "Remove",
//                         icon: "pi pi-fw pi-calendar-minus",
//                     },
//                 ],
//             },
//         ],
//     }
// ]
