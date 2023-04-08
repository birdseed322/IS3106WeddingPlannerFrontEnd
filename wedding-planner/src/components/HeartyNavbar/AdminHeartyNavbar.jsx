// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useParams } from "react-router-dom";
import { LoginTokenContext } from "../../context/LoginTokenContext";

export default function AdminHeartyNavbar(props) {
    // array of MenuItems
    // see https://www.primefaces.org/primereact-v8/menumodel/
    // const [token, setToken] = useContext(LoginTokenContext);

    // gets projectId from URL parameters
    const { projectId } = useParams();

    const items = [
        {
            label: "User Management",
            icon: "pi pi-fw pi-users",
            url: `/adminUserManagement`,
            className: "menuItemStyle",
        },

        {
            label: "Statistics",
            icon: "pi pi-fw pi-server",
            url: "/adminStatistics",
            className: "menuItemStyle",
        },
    ];
    const end = (
        // for border attribute, need to specify pixel, pattern  & colour(eg. border: 1px solid black)
        <>
            <Link to="/login" className="noUnderline">
                <Button
                    label="Logout"
                    style={{ backgroundColor: "#f561b0", border: "#f561b0" }}
                    // onClick={() => setToken(false)} // set token to false
                />{" "}
            </Link>
            <Link to="/viewprofile" className="noUnderline">
                <Button
                    icon="pi pi-user"
                    rounded
                    style={{ backgroundColor: "#f561b0", border: "#f561b0" }}
                />
            </Link>
        </>
    );
    const start = (
        <>
            <Link to="/" className="noUnderline">
                <span>
                    <Button
                        icon="pi pi-heart"
                        rounded
                        size="large"
                        style={{
                            backgroundColor: "#f561b0",
                            border: "#f561b0",
                        }}
                    />
                </span>
            </Link>
        </>
    );
    // height="40" className="mr-2"
    //console.log(items)
    // since we're only returning Menubar anyway, no need to wrap around a div or <>
    return <Menubar id="navbar" model={items} start={start} end={end} />;
}
