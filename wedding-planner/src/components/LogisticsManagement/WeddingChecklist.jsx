import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import React, { useState } from "react";
import "./WeddingChecklist.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

export default function WeddingChecklist() {
    const [showDialog, setShowDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [taskName, setTaskName] = useState("");

    const createTaskDialog = () => {
        setShowDialog(true);
    };

    const onHide = () => {
        setShowDialog(!showDialog);
        setTaskName("");
        setSubmitted(false);
    };

    const onInputChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // reset the form and hide the dialog
        if (taskName) {
            setTaskName("");
            setSubmitted(false);
            setShowDialog(false);
        }
    };

    return (
        <div id="appContainer">
            <HeartyNavbar />
            <div id="bodyContainer">
                <div style={{ display: "flex" }}>
                    <h2>Wedding Checklist</h2>
                    <Button
                        style={{
                            width: "6.3em",
                            height: "2em",
                            margin: "auto",
                        }}
                        onClick={createTaskDialog}
                    >
                        Add Task
                    </Button>
                </div>
                <>
                    <Checklist></Checklist>
                </>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>

            <Dialog
                header="Add Task"
                visible={showDialog}
                onHide={onHide}
                modal
                draggable
                resizable
            >
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="taskName" className="font-bold">
                            Task Name
                        </label>
                        <InputText
                            id="taskName"
                            value={taskName}
                            onChange={onInputChange}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !taskName,
                            })}
                        />
                        {submitted && !taskName && (
                            <small className="p-error">
                                Task Name is required.
                            </small>
                        )}
                    </div>
                    <Button type="submit" label="Create Task" />
                </form>
            </Dialog>
        </div>
    );
}

function Checklist() {
    const [expanded, setExpanded] = useState(null);

    const handleCardClick = (index) => {
        if (index === expanded) {
            // If the card is already expanded, collapse it
            setExpanded(null);
        } else {
            // Otherwise, expand the clicked card
            setExpanded(index);
        }
    };

    // sample data
    const sampleChecklistData = [
        {
            title: "Invite guests",
            subTitle: [
                { title: "Import guest list" },
                { title: "Send Invitations" },
            ],
        },
        {
            title: "Find catering provider",
            subTitle: [
                { title: "Find at least 10 catering provider" },
                { title: "Contact the catering provider" },
            ],
        },
    ];

    return (
        <div>
            <div style={{ padding: "10px" }}>
                {sampleChecklistData.map((data, index) => (
                    <>
                        <Card
                            key={index}
                            className={index === expanded ? "expanded" : ""}
                            title={
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>{data.title}</span>
                                    <span>
                                        {index === expanded ? (
                                            <Button
                                                className="p-cursor-pointer"
                                                icon="pi pi-chevron-up"
                                            />
                                        ) : (
                                            <Button
                                                className="p-cursor-pointer"
                                                icon="pi pi-chevron-down"
                                            />
                                        )}
                                    </span>
                                </div>
                            }
                            onClick={() => handleCardClick(index)}
                        >
                            {index === expanded &&
                                data.subTitle.map((nestedItem, nestedIndex) => (
                                    <p key={nestedIndex}>{nestedItem.title}</p>
                                ))}
                        </Card>
                        <br />
                    </>
                ))}
            </div>
        </div>
    );
}

//  <Dialog
//                 visible={productDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Product Details"
//                 modal
//                 className="p-fluid"
//                 footer={productDialogFooter}
//                 onHide={hideDialog}
//             >
//                 {currentUser.image && (
//                     <img
//                         src={`https://primefaces.org/cdn/primereact/images/product/${currentUser.image}`}
//                         alt={currentUser.image}
//                         className="product-image block m-auto pb-3"
//                     />
//                 )}
//                 <div className="field">
//                     <label htmlFor="name" className="font-bold">
//                         Name
//                     </label>
//                     <InputText
//                         id="name"
//                         value={currentUser.name}
//                         onChange={(e) => onInputChange(e, "name")}
//                         required
//                         autoFocus
//                         className={classNames({ "p-invalid": submitted && !currentUser.name })}
//                     />
//                     {submitted && !currentUser.name && (
//                         <small className="p-error">Name is required.</small>
//                     )}
//                 </div>
//                 <div className="field">
//                     <label htmlFor="description" className="font-bold">
//                         Description
//                     </label>
//                     <InputTextarea
//                         id="description"
//                         value={currentUser.description}
//                         onChange={(e) => onInputChange(e, "description")}
//                         required
//                         rows={3}
//                         cols={20}
//                     />
//                 </div>

//                 <div className="field">
//                     <label className="mb-3 font-bold">Category</label>
//                     <div className="formgrid grid">
//                         <div className="field-radiobutton col-6">
//                             <RadioButton
//                                 inputId="category1"
//                                 name="category"
//                                 value="Accessories"
//                                 onChange={onCategoryChange}
//                                 checked={currentUser.category === "Accessories"}
//                             />
//                             <label htmlFor="category1">Accessories</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton
//                                 inputId="category2"
//                                 name="category"
//                                 value="Clothing"
//                                 onChange={onCategoryChange}
//                                 checked={currentUser.category === "Clothing"}
//                             />
//                             <label htmlFor="category2">Clothing</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton
//                                 inputId="category3"
//                                 name="category"
//                                 value="Electronics"
//                                 onChange={onCategoryChange}
//                                 checked={currentUser.category === "Electronics"}
//                             />
//                             <label htmlFor="category3">Electronics</label>
//                         </div>
//                         <div className="field-radiobutton col-6">
//                             <RadioButton
//                                 inputId="category4"
//                                 name="category"
//                                 value="Fitness"
//                                 onChange={onCategoryChange}
//                                 checked={currentUser.category === "Fitness"}
//                             />
//                             <label htmlFor="category4">Fitness</label>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="formgrid grid">
//                     <div className="field col">
//                         <label htmlFor="price" className="font-bold">
//                             Price
//                         </label>
//                         <InputNumber
//                             id="price"
//                             value={currentUser.price}
//                             onValueChange={(e) => onInputNumberChange(e, "price")}
//                             mode="currency"
//                             currency="USD"
//                             locale="en-US"
//                         />
//                     </div>
//                     <div className="field col">
//                         <label htmlFor="quantity" className="font-bold">
//                             Quantity
//                         </label>
//                         <InputNumber
//                             id="quantity"
//                             value={currentUser.quantity}
//                             onValueChange={(e) => onInputNumberChange(e, "quantity")}
//                         />
//                     </div>
//                 </div>
//             </Dialog>

//             {/* <Dialog
//                 visible={deleteProductDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Confirm"
//                 modal
//                 footer={deleteProductDialogFooter}
//                 onHide={hideDeleteProductDialog}
//             >
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
//                     {currentUser && (
//                         <span>
//                             Are you sure you want to delete <b>{currentUser.name}</b>?
//                         </span>
//                     )}
//                 </div>
//             </Dialog>

//             <Dialog
//                 visible={deleteProductsDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Confirm"
//                 modal
//                 footer={deleteProductsDialogFooter}
//                 onHide={hideDeleteProductsDialog}
//             >
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
//                     {currentUser && <span>Are you sure you want to delete the selected products?</span>}
//                 </div>
//             </Dialog> */}
//             <Dialog
//                 visible={banUserDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Confirm"
//                 modal
//                 footer={banUserDialogFooter}
//                 onHide={hideBanUserDialog}
//             >
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
//                     {currentUser && (
//                         <span>
//                             Are you sure you want to ban <b>{currentUser.username}</b>?
//                         </span>
//                     )}
//                 </div>
//             </Dialog>

//             <Dialog
//                 visible={banUsersDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Confirm"
//                 modal
//                 footer={banUsersDialogFooter}
//                 onHide={hideBanUsersDialog}
//             >
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
//                     {currentUser && <span>Are you sure you want to ban the selected users?</span>}
//                 </div>
//             </Dialog>
//             <Dialog
//                 visible={unbanUserDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Confirm"
//                 modal
//                 footer={unbanUserDialogFooter}
//                 onHide={hideUnbanUserDialog}
//             >
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
//                     {currentUser && (
//                         <span>
//                             Are you sure you want to unban <b>{currentUser.username}</b>?
//                         </span>
//                     )}
//                 </div>
//             </Dialog>
//             <Dialog
//                 visible={unbanUsersDialog}
//                 style={{ width: "32rem" }}
//                 breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//                 header="Confirm"
//                 modal
//                 footer={unbanUsersDialogFooter}
//                 onHide={hideUnbanUsersDialog}
//             >
//                 <div className="confirmation-content">
//                     <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
//                     {currentUser && <span>Are you sure you want to unban the selected users?</span>}
//                 </div>
//             </Dialog>
//         </div>
//     );
// }
