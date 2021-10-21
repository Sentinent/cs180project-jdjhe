import React, { useState, useRef } from "react";
import { useOnClickOutside } from '../hooks';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Burger from "./Burger/Burger";
import Menu from "./Menu/Menu";
import '../App.css';

function ToolBar() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Row>
                        <Col>
                            <div ref={node}>
                                <Burger open={open} setOpen={setOpen} />
                                <Menu open={open} />
                            </div>
                        </Col>
                        <Col>
                            <Navbar.Brand>NY Parking Violations - Data</Navbar.Brand>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </div>
    );
}


export default ToolBar;
