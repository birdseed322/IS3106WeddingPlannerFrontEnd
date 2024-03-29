import React, {useEffect, useState, useRef} from 'react'; 
import { Timeline } from 'primereact/timeline';
import GuestViewNavbar from '../HeartyNavbar/GuestViewNavbar';
import flower from './src/flower.png';
import { ScrollPanel } from 'primereact/scrollpanel';
import GuestQuery from './GuestQuery';
import { Routes, Route, useParams } from 'react-router-dom';
import GuestViewAPI from './GuestViewAPI.jsx';
import moment from "moment";
import { Toast } from 'primereact/toast';
export default function GuestViewItinerary() {
    const toast = useRef(null);
    const [events, setEvents] = useState([]);
    const {weddingId} = useParams();
    useEffect(() => {
        GuestViewAPI.getItinerary(weddingId).then(res => {
            return res.json();
        })
        .then(itineraries => {
            console.log(itineraries);
            const list = [];
            for (const itinerary of itineraries) {
                const {eventStartTime, eventEndTime, eventDate, eventName} = itinerary;
                const start =  moment(eventStartTime, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate();
                const end = moment(eventEndTime, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate();
                let d = moment(eventDate, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate();
                d.setHours(start.getHours());
                d.setMinutes(start.getMinutes());
                list.push({
                    status : eventName,
                    date : d.toLocaleDateString() + " " + d.toLocaleTimeString(),
                    color : "#FFFFFF",
                    dateNonString : d
                });
            }
            setEvents(list);  
        }).catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unable to load itinerary ' , life: 3000 });
        });
    }, []);
    if (sessionStorage.getItem("guestId") != null && weddingId != null) {
        return (
            <>
            <Toast ref={toast} />
            <GuestViewNavbar></GuestViewNavbar>
            <div className="mt-10 p-8 top-0 min-h-full" style={{backgroundImage:`url(${flower})`, backgroundSize:"cover", backgroundRepeat:"repeat"}}> {/*background styles partly credits to chatgpt*/}
                <ScrollPanel style={{ width: '100%', height: '40rem' }}>
                    <Timeline value={events} opposite={(item) => item.status} content={(item) => <small className="text-color-primary">{item.date}</small>} />
                </ScrollPanel>
            </div>
            </>
        );
    } else {
        return <GuestQuery></GuestQuery>;
    }
}