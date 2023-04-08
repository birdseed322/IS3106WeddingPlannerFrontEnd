import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page.
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function EditProject({ currentProject, setCurrentProject, weddingProjectAPI }) {
    const [showMessage, setShowMessage] = useState(false);

    
    
    const dateProcessor = (dateString) => {
      if (typeof dateString === 'string') {
        // it works without this if-else but just in case sth goes wrong:
        if (dateString[dateString.length - 1] == "]") {
          return new Date(dateString.slice(0, -5));
        } else {
          return new Date(dateString);
        }
      } else {
        return undefined;
      }
    }
    // default values
    // we have to slice the string represented by currentProject.weddingDate, because
    // the [UTC] at the end ruins the parsing
    // eg. "2023-03-03T16:00:00Z[UTC]"
    const defaultValues = {
        name: currentProject.name,
        description: currentProject.description,
        venue: currentProject.venue,
        weddingDate: dateProcessor(currentProject.weddingDate), // we use ? here to avoid error from calling a method of undefined
        weddingStartTime: dateProcessor(currentProject.weddingStartTime),
        weddingEndTime: dateProcessor(currentProject.weddingEndTime),
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        const copyCurrentProject = {...currentProject};
        // console.log(copyCurrentProject); // for some reason the change is alrd here before Object.assign is even called but whatever

        Object.assign(copyCurrentProject, data)

        // we have to jsonify and parse again to convert Date object into String
        const jsonified = JSON.stringify(copyCurrentProject);
        const parsedCopy = JSON.parse(jsonified);
        
        console.log(parsedCopy.weddingDate);
        console.log(typeof(parsedCopy.weddingDate));
        console.log(currentProject);

        console.log(copyCurrentProject.weddingDate);
        console.log(typeof(copyCurrentProject.weddingDate));
        // console.log(currentProject);
        // console.log(copyCurrentProject);
        // console.log(data);
        setCurrentProject(parsedCopy);
        weddingProjectAPI.updateWeddingProject(parsedCopy);
        setShowMessage(true);
                
        // reset()
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    const dialogFooter = (
        <div className="flex justify-content-center">
            <Button
                label="OK"
                className="p-button-text"
                autoFocus
                onClick={() => setShowMessage(false)}
            />
        </div>
    );

    return (
        <div>
            <Dialog
                visible={showMessage}
                onHide={() => setShowMessage(false)}
                position="top"
                footer={dialogFooter}
                showHeader={false}
                breakpoints={{ "960px": "80vw" }}
                style={{ width: "30vw" }}
            >
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i
                        className="pi pi-check-circle"
                        style={{ fontSize: "5rem", color: "var(--green-500)" }}
                    ></i>
                    <h5>Project Edited!</h5>
                </div>
            </Dialog>
            <div
                style={{
                    minWidth: "450px",
                    maxWidth: "700px",
                    minHeight: "150px",
                    maxHeight: "350px",
                }}
            >
                {/* <h2 className="flex justify-content-center">New Project</h2> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field pt-1">
                        <span>
                            <label
                                htmlFor="name"
                                className={classNames({
                                    "p-error": errors.name,
                                    "px-3": true,
                                })}
                            >
                                Project Name
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Project name is required." }}
                                render={({ field, fieldState }) => (
                                    <InputText
                                        id={field.name}
                                        {...field}
                                        autoFocus
                                        className={classNames({
                                            "p-invalid": fieldState.invalid,
                                            "px-2": true,
                                        })}
                                    />
                                )}
                            />
                        </span>
                        {/* below is the error text that shows up when there is an error */}
                        {getFormErrorMessage("name")}
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="px-3">
                            Description{" "}
                        </label>
                        <span className="px-3">
                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <InputTextarea className="px-2" id={field.name} {...field} />
                                )}
                            />
                        </span>
                    </div>

                    <div className="field">
                        <label htmlFor="venue" className="px-3">
                            Venue{" "}
                        </label>
                        <span className="px-3">
                            <Controller
                                name="venue"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <InputTextarea className="px-2" id={field.name} {...field} />
                                )}
                            />
                        </span>
                    </div>

                    <div className="field">
                        <label htmlFor="weddingDate" className="px-3">
                            Wedding Date{" "}
                        </label>
                        <span className="px-3">
                            <Controller
                                name="weddingDate"
                                control={control}
                                render={({ field, fieldState }) => <Calendar {...field} />}
                            />
                        </span>
                    </div>

                    <div className="field">
                        <label htmlFor="weddingStartTime" className="px-3">
                            Wedding Start Time{" "}
                        </label>
                        <span className="px-3">
                            <Controller
                                name="weddingStartTime"
                                control={control}
                                render={({ field, fieldState }) => <Calendar {...field} timeOnly />}
                            />
                        </span>
                    </div>

                    <div className="field">
                        <label htmlFor="weddingEndTime" className="px-3">
                            Wedding End Time{" "}
                        </label>
                        <span className="px-3">
                            <Controller
                                name="weddingEndTime"
                                control={control}
                                render={({ field, fieldState }) => <Calendar {...field} timeOnly />}
                            />
                        </span>
                    </div>

                    <span className="flex justify-content-center pb-3">
                        <Button
                            label="Confirm Edit "
                            style={{ backgroundColor: "#f561b0", border: "#f561b0" }}
                        />{" "}
                    </span>
                </form>
            </div>
        </div>
    );
}

export default EditProject;
