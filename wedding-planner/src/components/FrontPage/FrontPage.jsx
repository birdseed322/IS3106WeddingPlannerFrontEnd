import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
import Container from "react-bootstrap/esm/Container";
import Footer from "../Footer/Footer.jsx";
import Sample from "../../Sample.jsx";


export default function FrontPage() {
    // note that HeartyNavbar has an id specified in its component jsx file
    return (
        <Container id="appContainer" fluid>
            <Container
                id="mainContainer"
                style={{ padding: 0, background: "var(--bs-gray)", "min-height": "100vh" }}
            >
                <HeartyNavbar id="navbar" />
                    <Container id="bodyContainer">
                        <p>foobar</p>
                        <br /> <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br /> <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p>foobar</p>
                    </Container>

            <div id="footer">
                <h2> some text</h2>
            </div>

                <Footer id="footer" />
            </Container>
            <Sample></Sample>
        </Container>
    );
}
