import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';
import rsvp from './src/rsvp.jpg';
import background from './src/background.mp4';
import EmailAPI from './EmailAPI.jsx';
import { Toast } from 'primereact/toast';
import GuestViewAPI from './GuestView/GuestViewAPI';
export default function GuestQuery() {
    const {weddingId} = useParams();
    const toast = useRef(null);
    const [rsvpStatus, setRSVPStatus] = useState(null);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const header = (
        <img src={rsvp} style= {{maxWidth:"100%", maxHeight:"40%", marginTop:"0%"}}></img>
        );
    const handleEmail = () => {
        GuestViewAPI.getGuest(email, weddingId).then(response => {
            return response.json();
        }).then(g => {
            console.log(g);
            if (g.id != null && g.id != undefined) {
                const id = g.id;
                sessionStorage.setItem("guestId", id);
                navigate("/guestview/" + weddingId + "/itinerary");
            } else {
                throw new Error();
            }
        }).catch(error => {
            toast.current.show({ severity: 'warning', summary: 'Error', detail: 'Invalid Email ' , life: 3000 });
        });
    }
    const footer = (
        <div className="flex flex-wrap justify-content-center">
            <Button label="Submit" icon="pi pi-check" onClick={handleEmail} />
        </div>
    );
    return (
        <div class="grid align-content-center justify-content-center text-center">
            <Toast ref={toast} className="z-5" style={{backgroundColor:"#FFFFFF"}}/>
            <div className="col-4 mt-10"></div>
                <div className="col-4 z-5 mt-6">
                    <Card footer={footer} header={header} className="md:w-25rem opacity-95">
                        <div className='m-3'>
                            <label htmlFor="email" className="block mb-6 font-italic text-xl">Access Wedding Details</label>
                            <InputText id="email" type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                    </Card>
                </div>            
            <div className="col-4 mt-10"></div>
            <div className="absolute top-0 z-0">
                <video autoPlay="true" loop="true" preload="auto" width="100%" height="100%" muted="true" >
                    <source src={background} type="video/mp4"></source>
                </video>
            </div>
        </div>

    );
}