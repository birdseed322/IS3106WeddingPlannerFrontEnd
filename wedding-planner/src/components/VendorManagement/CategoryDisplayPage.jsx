import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import SearchBar from "./SearchBar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "../firebase";
import { Image } from 'primereact/image';

const CategoryDisplayPage = () => {
    const { vendorCategory } = useParams(); //category name assumed to be unique
    const [vendors, setVendors] = useState([]);
    const { projectId } = useParams();
    const [profilePicUrl, setProfilePicUrl] = useState([]);
    const icon = (<i className="pi pi-check"></i>)

    //const vendorProfilePic = ref(storage, `Vendor/${vendorName}/ProfilePic/`);
    //i want it to be Vendor/${vendorName}/ProfilePic/

    //console.log("selected category = " + vendorCategory);
    const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources/vendors";

    useEffect(() => {
        //getAllProfilePictures();
        getAllVendorsInCategory().then((vendorsData) => getAllProfilePictures(vendorsData));
        //Promise.all([getAllVendorsInCategory(), getAllProfilePictures()])
    }, []);

    const getAllProfilePictures = (vendorsData) => {
        return vendorsData.forEach((vendor) => {
            const vendorName = vendor.username;
            //console.log("vendor username type = " + typeof vendorName);
            //console.log("vendor username = " + vendorName)
            const vendorProfilePic = ref(storage, `Vendor/${vendorName}/ProfilePic/`);
            listAll(vendorProfilePic).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        console.log("ienidnwei " + url);
                        setProfilePicUrl((prev) => [...prev, url]);
                    });
                });
            });
        }); //console.log("diwueniwun" + vendor.username)))
    };

    function getSpecificUrl(username) {
        for (let index = 0; index < profilePicUrl.length; index++) {
            const largeString = profilePicUrl[index];
            console.log("large string = " + largeString);
            const startIndex = largeString.indexOf("Vendor") + 9; // add 8 to skip over "/Vendor/"
            const endIndex = largeString.indexOf("ProfilePic") - 3;
            const extractedString = largeString.substring(startIndex, endIndex);
            console.log("extracted string = " + extractedString);
            if (username === extractedString) {
                return largeString;
            }
        }
    }

    const getAllVendorsInCategory = () => {
        return (
            fetch(`${SERVER_PREFIX}/allCategories/${vendorCategory}`)
                .then((response) => response.json())
                //then((data)=>console.log(data))
                .then((data) => {
                    setVendors(data);
                    return data;
                })
        );
    };

    const GridItem = (vendors) => {
        console.log("the vendor is = " + vendors);
        const navigate = useNavigate();

        function redirectTo(vendor) {
            //console.log("step 0 = " + vendor.username);
            //console.log("step 1 = " + JSON.stringify(vendor));
            //console.log("Step 1 type = " + typeof JSON.stringify(vendor));
            //console.log(" step 2 = " + JSON.parse(JSON.stringify(vendor)).username);
            //console.log("CLICKED THE BUTTON > " + vendorJson.username);
            navigate(`/${projectId}/VendorSearchPage/VendorName/${vendor.username}`); //adds on to the current endpoint
        }

        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{vendors.username}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">
                            <Image
                                src={getSpecificUrl(vendors.username)}
                                template={icon}
                                preview width="210"
                            />
                        </div>
                    </div>
                    <Button
                        icon="pi pi-shopping-cart"
                        className="p-button-rounded"
                        onClick={() => redirectTo(vendors)}
                    />
                </div>
            </div>
        );
    };

    const itemTemplate = (product) => {
        return GridItem(product);
    };

    return (
        <div>
            <HeartyNavbar />
            <br />
            <br />
            <SearchBar />
            <div className="card">
                <div className="card flex justify-content-center"></div>
                <br/>
                <DataView value={vendors} itemTemplate={itemTemplate} />
            </div>
        </div>
    );
};

export default CategoryDisplayPage;
