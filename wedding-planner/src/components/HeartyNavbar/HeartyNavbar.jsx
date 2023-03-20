import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function HeartyNavbar(props) {
    return (
        <Navbar id={props.id} variant="light" expand="md">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                {/* toggle here is for the responsive layout;
                when the screen is less than a certain width, it targets Navbar.Collapse and collapses it */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    
                {/* justify right for login/logout. it's also part of Collapse item*/}
                <Nav className="justify-content-end">
                    {/* probably do some <Button> component here instead of Nav.Item */}
                    <Nav.Item href="#"> Login button here </Nav.Item>
                </Nav>
                
                </Navbar.Collapse>
                

            </Container>
        </Navbar>
    );
}