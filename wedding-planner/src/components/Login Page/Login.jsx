import { Button } from "primereact/button";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicHeartyNavbar from "../HeartyNavbar/PublicHeartyNavbar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import LoginAPI from "./LoginAPI";
import { Dropdown } from "primereact/dropdown";
import { LoginTokenContext } from "../../context/LoginTokenContext";

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
function Login() {
    
    const [token, setToken] = useContext(LoginTokenContext);
    let navigate = useNavigate(); 

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
                const indexPageString = "/";
                navigate(indexPageString)
                console.log("success");
                return "success";
            } else {
                // stay on login page
                console.log("fail");
                const loginPageString = "/login";
                navigate(loginPageString)
                return "fail";
            }
        });
    }

    const doLogin = (ev) => {
        console.log(ev);
        ev.preventDefault();
        switch (userType) {
            case "ADMIN":
                handleLoginSuccessOrFail(
                    LoginAPI.loginSucceedOrNot(LoginAPI.loginAdmin(username, password), setToken)
                );
                break;
            case "WEDDING-ORGANISER":
                handleLoginSuccessOrFail(
                    LoginAPI.loginSucceedOrNot(
                        LoginAPI.loginWeddingOrganiser(username, password),
                        setToken
                    )
                );
                break;
            case "VENDOR":
                handleLoginSuccessOrFail(
                    LoginAPI.loginSucceedOrNot(LoginAPI.loginVendor(username, password), setToken)
                );
                break;
        }
    }

    const footer = (
        <span className="flex justify-content-center ">
            <div>
                <Link to="/" className="flex justify-content-center noUnderline">
                    <Button
                        label="Login"
                        type="submit"
                        style={{ backgroundColor: "#f561b0", border: "#f561b0" }}
                        onClick={(e) => doLogin(e)}
                    />{" "}
                </Link>
                <div className="flex justify-content-center px-5 mt-5">
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
<<<<<<< HEAD
            <div className="flex justify-content-center pt-5">
                <form onSubmit={doLogin}>
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
                            <InputText
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-content-center">
                            <p className="flex-1">Password: </p>
                            <InputText
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
                            {/* for debugging */}
                            {/* <Button label="log userType val" onClick={() => console.log(userType)}/> */}
                            {/* <Button label="log setToken val" onClick={() => console.log(setToken)} /> */}
                        </div>
                    </Card>
                </form>
=======
            <div className="flex justify-content-center pt-3 mt-5">
                <Card
                    // title={title}
                    footer={footer}
                    style={{
                        minWidth: "300px",
                        maxWidth: "500px",
                        minHeight: "500px",
                        maxHeight: "600px",
                    }} 
                >
                    <h1 className="flex justify-content-center">Login</h1>

                    <div className="flex justify-content-center mt-5">
                        {/* set flex grow to 1 */}
                        <p className="flex-1 mt-2">Username: </p>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex justify-content-center mt-5">
                        <p className="flex-1 mt-2">Password: </p>
                        <InputText value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex justify-content-center mt-5">
                        <p className="flex-1 mt-2">User Type: </p>
                        <Dropdown
                            label="userType"
                            options={userTypeItems}
                            value={userType}
                            onChange={(e) => {
                                setUserType(e.value);
                            }}
                        />
                        {/* for debugging */}
                        {/* <Button label="log userType val" onClick={() => console.log(userType)}/> */}
                        {/* <Button label="log setToken val" onClick={() => console.log(setToken)} /> */}
                    </div>
                </Card>
>>>>>>> e4805825ed6b6e1a4b1b6207fecde533f3a85921
            </div>
        </div>
    );
}

export default Login;
