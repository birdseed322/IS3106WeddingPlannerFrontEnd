import React from "react";
import "bootstrap/dist/css/bootstrap.css"; // loads the default bootstrap CSS
import HeartyNavbar from "./components/HeartyNavbar/HeartyNavbar";
import EndPoints from "./routes/EndPoints.jsx";
import Container from "react-bootstrap/esm/Container";
import Footer from "./components/Footer/footer";

import "./App.css"
//Main App component

function App() {
    // gotta set & declare heights here, so that the main body Container can adjust min-height
    // i think the rest we can do in CSS

    return (
        <Container
            id="appContainer"
            fluid
        >
            <Container
                id="mainContainer"
                style={{ padding: 0, background: "var(--bs-gray)", "min-height": "100vh" }}
            >
                <HeartyNavbar id="navbar"/>
                <Container id="bodyContainer">
                    <p>foobar</p>
                    <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                    <p>foobar</p>
                </Container>
                {/* <EndPoints /> */}
                
                <Footer id="footer" /> 
                
            </Container>
        </Container>
    );
}

export default App;
