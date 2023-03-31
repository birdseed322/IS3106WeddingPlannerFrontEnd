import React, { useEffect, useState, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

export default function WeddingVendorsDataTable({fetchedData}) {
    let emptyProduct = {
        id: null,
        name: "",
        image: null,
        description: "",
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: "INSTOCK",
    };

    let emptyUser = {
        id: null,
        username: "",
        email: "",
        password: "",
        contact: "",
        isBanned: false,
    };

    //test data
    // should be a ref hook here I think?
    const usersData = useRef(fetchedData);

    // Products list (to be used as value in DataTable)
    const [userObjects, setUserObjects] = useState(null);

    // currently selected product and selected products.
    // the first one is for "temporary editing" during dialog boxes & selections
    // but ultimately the 2nd one is the one that gets edited & sent?? (at least in PrimeReact implementation)
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);

    // Dialog boolean states
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [banUserDialog, setBanUserDialog] = useState(false);
    const [banUsersDialog, setBanUsersDialog] = useState(false);
    const [unbanUserDialog, setUnbanUserDialog] = useState(false);
    const [unbanUsersDialog, setUnbanUsersDialog] = useState(false);

    // Other states
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null); // this is datatable

    // SETTING DEFAULT PRODUCTS
    useEffect(() => {
        setUserObjects(usersData.current);
    }, []);

    // === helper method for currency ===
    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    // === methods that manipulate the setState methods of the useState hooks ===
    const openNew = () => {
        setCurrentUser(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const hideBanUserDialog = () => {
        setBanUserDialog(false);
    };

    const hideBanUsersDialog = () => {
        setBanUsersDialog(false);
    };

    const hideUnbanUserDialog = () => {
        setUnbanUserDialog(false);
    };

    const hideUnbanUsersDialog = () => {
        setUnbanUsersDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (currentUser.name.trim()) {
            let _products = [...userObjects];
            let _product = { ...currentUser };

            if (currentUser.id) {
                const index = findIndexById(currentUser.id);

                _products[index] = _product;
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Updated",
                    life: 3000,
                });
            } else {
                _product.id = createId();
                _product.image = "product-placeholder.svg";
                _products.push(_product);
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Created",
                    life: 3000,
                });
            }

            setUserObjects(_products);
            setProductDialog(false);
            setCurrentUser(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setCurrentUser({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setCurrentUser(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = userObjects.filter((val) => val.id !== currentUser.id);

        setUserObjects(_products);
        setDeleteProductDialog(false);
        setCurrentUser(emptyProduct);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = userObjects.filter((val) => !selectedUsers.includes(val));

        setUserObjects(_products);
        setDeleteProductsDialog(false);
        setSelectedUsers(null);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Products Deleted",
            life: 3000,
        });
    };

    // === Ban-related state setting functions ===
    const confirmBanUser = (user) => {
        setCurrentUser(user); // keeping the variable as setProduct. maybe later we need a User state to handle logged-in state
        setBanUserDialog(true);
    };
    const banUser = () => {
        // for each product item inside products, filter out the selected product (which is just called product)
        let _products = userObjects.map((user) => {
            if (user.id === currentUser.id) {
                // if the user in the list matches the selected user
                user.isBanned = true;
            }
            return user;
        });
        // let _products = products.filter((prod) => prod.id !== product.id);

        setUserObjects(_products);
        setBanUserDialog(false);
        setCurrentUser(emptyUser);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User Banned",
            life: 3000,
        });
    };

    const confirmBanSelectedUsers = () => {
        setBanUsersDialog(true);
    };
    const banSelectedUsers = () => {
        let _users = userObjects.map((user) => {
            if (selectedUsers.includes(user)) {
                user.isBanned = true;
            }
            return user;
        });

        setUserObjects(_users);
        setBanUsersDialog(false);
        setCurrentUser(emptyUser);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Users Banned",
            life: 3000,
        });
    };

    const confirmUnbanUser = (user) => {
        setCurrentUser(user);
        setUnbanUserDialog(true);
    };

    const unbanUser = () => {
        // for each product item inside products, filter out the selected product (which is just called product)
        let _products = userObjects.map((user) => {
            if (user.id === currentUser.id) {
                // if the user in the list matches the selected user
                user.isBanned = false;
            }
            return user;
        });
        // let _products = products.filter((prod) => prod.id !== product.id);

        setUserObjects(_products);
        setUnbanUserDialog(false);
        setCurrentUser(emptyUser);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User Unbanned",
            life: 3000,
        });
    };

    const confirmUnbanSelectedUsers = () => {
        setUnbanUsersDialog(true);
    };
    const unbanSelectedUsers = () => {
        let _users = userObjects.map((user) => {
            if (selectedUsers.includes(user)) {
                user.isBanned = false;
            }
            return user;
        });

        setUserObjects(_users);
        setUnbanUsersDialog(false);
        setCurrentUser(emptyUser);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Users Unbanned",
            life: 3000,
        });
    };

    // --- end of Ban-related state setting functions ---

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < userObjects.length; i++) {
            if (userObjects[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const onCategoryChange = (e) => {
        let _product = { ...currentUser };

        _product["category"] = e.value;
        setCurrentUser(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...currentUser };

        _product[`${name}`] = val;

        setCurrentUser(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...currentUser };

        _product[`${name}`] = val;

        setCurrentUser(_product);
    };

    // TOOLBAR TEMPLATE for DataTable!
    // these are the buttons used to manipulate multiple items (eg. banning many users at once)

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {/* <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} /> */}

                {/* DELETE button, the whole delete thing is quite useful so i kept it commented */}
                {/* <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedUsers || !selectedUsers.length} 
                /> */}

                <Button
                    label="Ban"
                    icon="pi pi-ban"
                    severity="danger"
                    onClick={confirmBanSelectedUsers}
                    // **** this is a pretty clever way to disable the button
                    //
                    disabled={!selectedUsers || !selectedUsers.length}
                />
                <Button
                    label="Unban"
                    icon="pi pi-ban"
                    severity="info"
                    onClick={confirmUnbanSelectedUsers}
                    disabled={!selectedUsers || !selectedUsers.length}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
            />
        );
    };

    // keeping this bcos it seems useful

    // const imageBodyTemplate = (rowData) => {
    //     return (
    //         <img
    //             src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
    //             alt={rowData.image}
    //             className="shadow-2 border-round"
    //             style={{ width: "64px" }}
    //         />
    //     );
    // };

    const bannedStatusTemplate = (user) => {
        const severity = user.isBanned ? "danger" : "info";
        const textToDisplay = user.isBanned ? "Banned" : "Not Banned";
        return <Tag value={textToDisplay} severity={severity}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editProduct(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteProduct(rowData)}
                /> */}
                <Button
                    icon="pi pi-ban"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmBanUser(rowData)}
                />
                <Button
                    icon="pi pi-undo"
                    rounded
                    outlined
                    severity="info"
                    onClick={() => confirmUnbanUser(rowData)}
                />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Wedding Organisers</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    // === Dialog Footers ===

    // FOR REFERENCE PURPOSES
    //
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    // const deleteProductDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
    //         <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    //     </React.Fragment>
    // );
    // const deleteProductsDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
    //         <Button
    //             label="Yes"
    //             icon="pi pi-check"
    //             severity="danger"
    //             onClick={deleteSelectedProducts}
    //         />
    //     </React.Fragment>
    // );

    const banUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideBanUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={banUser} />
        </React.Fragment>
    );

    const banUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideBanUsersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={banSelectedUsers} />
        </React.Fragment>
    );

    const unbanUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideUnbanUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={unbanUser} />
        </React.Fragment>
    );

    const unbanUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideUnbanUsersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={unbanSelectedUsers} />
        </React.Fragment>
    );

    // --- end of Dialog Footers ---

    // === actual DataTable Component ===
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={userObjects}
                    selection={selectedUsers}
                    onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="userId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>

                    <Column field="userId" header="ID" sortable style={{ minWidth: "12rem" }}></Column>
                    <Column
                        field="username"
                        header="Username"
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        field="email"
                        header="Email"
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        field="contact"
                        header="Contact"
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        field="isBanned"
                        header="Ban Status"
                        sortable
                        body={bannedStatusTemplate}
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    {/* <Column
                        field="code"
                        header="Code"
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ minWidth: "16rem" }}
                    ></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column
                        field="category"
                        header="Category"
                        sortable
                        style={{ minWidth: "10rem" }}
                    ></Column>
                    <Column
                        field="inventoryStatus"
                        header="Status"
                        body={statusBodyTemplate}
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
    */}
                </DataTable>
            </div>

            <Dialog
                visible={productDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Product Details"
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                {currentUser.image && (
                    <img
                        src={`https://primefaces.org/cdn/primereact/images/product/${currentUser.image}`}
                        alt={currentUser.image}
                        className="product-image block m-auto pb-3"
                    />
                )}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText
                        id="name"
                        value={currentUser.name}
                        onChange={(e) => onInputChange(e, "name")}
                        required
                        autoFocus
                        className={classNames({ "p-invalid": submitted && !currentUser.name })}
                    />
                    {submitted && !currentUser.name && (
                        <small className="p-error">Name is required.</small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea
                        id="description"
                        value={currentUser.description}
                        onChange={(e) => onInputChange(e, "description")}
                        required
                        rows={3}
                        cols={20}
                    />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category1"
                                name="category"
                                value="Accessories"
                                onChange={onCategoryChange}
                                checked={currentUser.category === "Accessories"}
                            />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category2"
                                name="category"
                                value="Clothing"
                                onChange={onCategoryChange}
                                checked={currentUser.category === "Clothing"}
                            />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category3"
                                name="category"
                                value="Electronics"
                                onChange={onCategoryChange}
                                checked={currentUser.category === "Electronics"}
                            />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category4"
                                name="category"
                                value="Fitness"
                                onChange={onCategoryChange}
                                checked={currentUser.category === "Fitness"}
                            />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber
                            id="price"
                            value={currentUser.price}
                            onValueChange={(e) => onInputNumberChange(e, "price")}
                            mode="currency"
                            currency="USD"
                            locale="en-US"
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber
                            id="quantity"
                            value={currentUser.quantity}
                            onValueChange={(e) => onInputNumberChange(e, "quantity")}
                        />
                    </div>
                </div>
            </Dialog>

            {/* <Dialog
                visible={deleteProductDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {currentUser && (
                        <span>
                            Are you sure you want to delete <b>{currentUser.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteProductsDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteProductsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {currentUser && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> */}
            <Dialog
                visible={banUserDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={banUserDialogFooter}
                onHide={hideBanUserDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {currentUser && (
                        <span>
                            Are you sure you want to ban <b>{currentUser.username}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={banUsersDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={banUsersDialogFooter}
                onHide={hideBanUsersDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {currentUser && <span>Are you sure you want to ban the selected users?</span>}
                </div>
            </Dialog>
            <Dialog
                visible={unbanUserDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={unbanUserDialogFooter}
                onHide={hideUnbanUserDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {currentUser && (
                        <span>
                            Are you sure you want to unban <b>{currentUser.username}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            <Dialog
                visible={unbanUsersDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={unbanUsersDialogFooter}
                onHide={hideUnbanUsersDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {currentUser && <span>Are you sure you want to unban the selected users?</span>}
                </div>
            </Dialog>
        </div>
    );
}