import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import GuestViewNavbar from '../HeartyNavbar/GuestViewNavbar';
import flower from './src/flower.png';
import { ScrollPanel } from 'primereact/scrollpanel';
import GuestQuery from './GuestQuery';
import { Routes, Route, useParams } from 'react-router-dom';
export default function GuestViewItinerary() {
    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#FBE3E8', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#FBE3E8' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FBE3E8' },
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#FBE3E8', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#FBE3E8' },
    ];
    const {weddingId} = useParams();
    if (sessionStorage.getItem("guestId") != null && weddingId != null) {
        return (
            <>
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