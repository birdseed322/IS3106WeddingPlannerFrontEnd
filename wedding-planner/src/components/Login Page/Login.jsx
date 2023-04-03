import { Button } from "primereact/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicHeartyNavbar from "../HeartyNavbar/PublicHeartyNavbar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import LoginAPI from "./LoginAPI";
import { Dropdown } from "primereact/dropdown";

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

// moved footer inside function. If it references any state variables it needs to be inside the component function
// in this case, i added the onClick attribute which needs relevant state info, so i moved it inside

// not sure should put outside or not
const userTypeItems = [
    { label: "Admin", value: "ADMIN" },
    { label: "Wedding Organiser", value: "WEDDING-ORGANISER" },
    { label: "Vendor", value: "VENDOR" },
];
function Login({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("ADMIN");
    // Title component
    // lazy to style in external css, but if we want to
    // we can select card titles with p-card-title.
    // const title = (
    //   <div style= {{textAlign : "center" }}>
    //     <p>Login</p>
    //   </div>
    // )

    function handleLoginSuccessOrFail(successOrFailPromise) {
        return successOrFailPromise.then((successOrFailString) => {
            if (successOrFailString == "success") {
                // do some redirect to relevant page, but I think it should be done from the Router element
                console.log("success");
                return "success";
            } else {
                // stay on login page
                console.log("fail");
                return "fail";
            }
        });
    }
    const footer = (
        <span className="flex justify-content-center ">
            <div>
                <Link to="/" className="flex justify-content-center noUnderline">
                    <Button
                        label="Login"
                        style={{ backgroundColor: "#f561b0", border: "#f561b0" }}
                        onClick={() =>
                            handleLoginSuccessOrFail(
                                LoginAPI.loginSucceedOrNot(
                                    LoginAPI.loginAdmin(username, password),
                                    setToken
                                )
                            )
                        }
                    />{" "}
                </Link>
                <div className="flex justify-content-center px-5">
                    <p className="px-1">Don't Have an Account ?</p>
                    <Link to="/signup" className="noUnderline">
                        <p style={{ color: "#f561b0" }}>Sign Up</p>
                    </Link>
                </div>
            </div>
        </span>
    );

    return (
        <div>
            <PublicHeartyNavbar />
            <div className="flex justify-content-center pt-5">
                <Card
                    // title={title}
                    footer={footer}
                    style={{
                        minWidth: "300px",
                        maxWidth: "500px",
                        minHeight: "500px",
                        maxHeight: "700px",
                    }}
                >
                    <h3 className="flex justify-content-center">Login</h3>

                    <div className="flex justify-content-center">
                        {/* set flex grow to 1 */}
                        <p className="flex-1">Username: </p>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex justify-content-center">
                        <p className="flex-1">Password: </p>
                        <InputText value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex justify-content-center">
                        <p className="flex-1">User Type: </p>
                        <Dropdown
                            label="userType"
                            options={userTypeItems}
                            value={userType}
                            onChange={(e) => {
                                setUserType(e.value);
                            }}
                        />
                        {/* <Button label="log userType val" onClick={() => console.log(userType)}/> */}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Login;
