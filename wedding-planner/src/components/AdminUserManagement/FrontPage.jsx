import { useEffect } from "react";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";

export default function AdminUserManagement() {
    
    // empty array so useEffect to set doc title only runs once
    useEffect(() => document.title = "Admin: User Management", []);
    
    // note that HeartyNavbar has an id specified in its component jsx file
    return (
        <div id="appContainer">
            <HeartyNavbar /> 
            <div id="bodyContainer">
                <div className="bodyTextColumn">
                    <p>admin user stuff</p>
                </div>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>

        </div>
    );
}
