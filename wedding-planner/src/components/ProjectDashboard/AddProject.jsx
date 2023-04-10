import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useForm, Controller } from "react-hook-form";
import WeddingProjectAPI from "../ProjectOverview/WeddingProjectAPI";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LoginTokenContext } from "../../context/LoginTokenContext";

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function AddProject() {
    const [token, setToken] = useContext(LoginTokenContext);
    const orgId = token.userId;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        WeddingProjectAPI.createWeddingProject(orgId, {
            name,
            description,
        }).then((weddingProject) => {
            navigate("/");
        });
    };

    return (
        <div
            style={{
                minWidth: "450px",
                maxWidth: "700px",
                minHeight: "150px",
                maxHeight: "350px",
            }}
        >
            <h2 className="flex justify-content-center">New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="field pt-1">
                    <span>
                        <label
                            htmlFor="name"
                            className={classNames({
                                "px-3": true,
                            })}
                        >
                            Project Name
                        </label>
                        <InputText
                            id="inputName"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </span>
                </div>
                <div className="field">
                    <label htmlFor="description" className="px-3">
                        Description
                    </label>
                    <span className="px-3">
                        <InputTextarea
                            className="px-2"
                            id="inputDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </span>
                </div>
                <span className="flex justify-content-center pb-3">
                    <Button
                        label="Add Project"
                        style={{
                            backgroundColor: "#f561b0",
                            border: "#f561b0",
                        }}
                    />{" "}
                </span>
            </form>
        </div>
    );
}

export default AddProject;
