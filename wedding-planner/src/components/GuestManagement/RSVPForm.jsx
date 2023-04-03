import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';
import rsvp from './src/rsvp.jpg';
import background from './src/background.mp4';


export default function RSVPForm() {
    const [rsvpStatus, setRSVPStatus] = useState(null);
    const [email, setEmail] = useState("");
    const {weddingId} = useParams();
    
    const header = (
        <img src={rsvp} style= {{maxWidth:"100%", maxHeight:"40%", marginTop:"0%"}}></img>
        );
    const footer = (
        <div className="flex flex-wrap justify-content-center">
            <Button label="Submit" icon="pi pi-check" />
        </div>
    );
    return (
        <div class="grid align-content-center justify-content-center text-center">
            <video autoplay="true" loop="true" preload="auto" width="100%" height="100%" muted="true">
                <source src={background} type="video/mp4"></source>
            </video>

            <div class="col-4 absolute top-0"></div>
                <div class="col-4 absolute top-0">
                    <Card footer={footer} header={header} className="md:w-25rem opacity-95">
                        <div className='m-5'>
                        <label htmlFor="email" className="block mb-2 font-italic text-xl">Email</label>
                        <InputText id="email" type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                        <label htmlFor="rsvp" className="block mb-2 m-3 font-italic text-xl">RSVP</label>
                        <div className='m-5'>
                            <RadioButton inputId="yes" name="yes" value="CONFIRMED" onChange={(e) => setRSVPStatus(e.target.value)} checked={rsvpStatus === 'CONFIRMED'} />
                            <label htmlFor="yes" className="ml-2">Attending the wedding</label>
                            </div>               
                        <div className='m-5'>
                            <RadioButton inputId="no" name="no" value="NOTATTENDING" onChange={(e) => setRSVPStatus(e.target.value)} checked={rsvpStatus === 'NOTATTENDING'} />
                            <label htmlFor="no" className="ml-2">Not attending the wedding</label>
                        </div>
                    </Card>
                    </div>            
            <div class="col-4 absolute top-0"></div>

        </div>

    );
}