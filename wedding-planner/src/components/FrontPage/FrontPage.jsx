<<<<<<< HEAD
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar";
=======
import Container from "react-bootstrap/esm/Container";
import Footer from "../Footer/footer.jsx";
import Sample from "../../Sample.jsx";
import HeartyNavbar from "../HeartyNavbar/HeartyNavbar"

>>>>>>> d143f7fdb86338cf5b88cf2cb07b07e81ea83e9e

export default function FrontPage() {
    // note that HeartyNavbar has an id specified in its component jsx file
    return (
<<<<<<< HEAD
        <div id="appContainer">
            <HeartyNavbar /> 
            <div id="bodyContainer">
                <div className="bodyTextColumn">
=======
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
>>>>>>> d143f7fdb86338cf5b88cf2cb07b07e81ea83e9e
                    <p>foobar</p>
                </div>
            </div>

            <div id="footer">
                <h2> some text</h2>
            </div>

<<<<<<< HEAD
        </div>
=======
                <Footer id="footer" />
            </Container>
            <Sample></Sample>
        </Container>
        </>
>>>>>>> d143f7fdb86338cf5b88cf2cb07b07e81ea83e9e
    );
}
