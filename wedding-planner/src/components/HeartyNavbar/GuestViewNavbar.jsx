// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { LoginTokenContext } from "../../context/LoginTokenContext";
import { useParams } from "react-router-dom";
import heartyLogo from "../../images/favicon-heart-3.png";

export default function GuestViewNavbar() {
  // array of MenuItems
  // see https://www.primefaces.org/primereact-v8/menumodel/
  const { weddingId, guestId } = useParams();
  const items = [
    {
      label: "Seating Plan",
      icon: "pi pi-fw pi-file",
      url: "/guestview/" + weddingId + "/seatplan",
      className: "menuItemStyle",
    },
    {
      label: "Wedding Itinerary",
      icon: "pi pi-fw pi-file",
      url: "/guestview/" + weddingId + "/itinerary",
      className: "menuItemStyle",
    },
  ];
  const end = (
    // for border attribute, need to specify pixel, pattern  & colour(eg. border: 1px solid black)
    <></>
  );
  const start = (
    <>
      <>
        <Link to="/" className="noUnderline">
          <span className="flex my-1 mx-4 align-items-center">
            <img src={heartyLogo} className="mr-2" alt="hearty logo" />
            <h1 className="inline h-min text-3xl">Hearty</h1>
          </span>
        </Link>
      </>
    </>
  );
  // height="40" className="mr-2"
  //console.log(items)
  // since we're only returning Menubar anyway, no need to wrap around a div or <>
  return <Menubar id="navbar" model={items} start={start} end={end} />;
}

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
