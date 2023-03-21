import Container from "react-bootstrap/esm/Container";
import Footer from "../Footer/footer.jsx";
import Sample from "../../Sample.jsx";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar"


export default function FrontPage() {
    return (
        <>
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

                <Footer id="footer" />
            </Container>
        </Container>
        <Sample></Sample>
        </>
    );
}
