import PieChartVCS from "../components/PieChartVCS";
import PieChartCBS from "../components/PieChartCBS";
import BarChartTODS from "../components/BarChartTODS";
import PieChartVC from "../components/PieChartVC";
import PieChartCB from "../components/PieChartCB";
import BarChartTOD from "../components/BarChartTOD";
import PieChartVPC from "../components/PieChartVPC";
import PieChartVPCS from "../components/PieChartVPCS";
import BarChartHor from "../components/BarChartHor";
import BarChartHorS from "../components/BarChartHorS";
import { Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import "../App.css";
import BarChartMOY from "../components/BarChartMOY";
import BarChartMOYS from "../components/BarChartMOYS";

function Analytics() {
    const [showPieChartVC, setShowPieChartVC] = useState(false);
    const [showPieChartCB, setShowPieChartCB] = useState(false);
    const [showBarChartTOD, setShowBarChartTOD] = useState(false);
    const [showPieChartVPC, setShowPieChartVPC] = useState(false);
    const [showBarChartHor, setShowBarChartHor] = useState(false);
    const [showBarChartMOY, setShowBarChartMOY] = useState(false);

    return (
        <div className='analytics-view'>
            <Row>
                <Col className="text-center">
                    <PieChartVCS />
                    <Button variant="dark" onClick={() => setShowPieChartVC(true)}>Click Here</Button>
                    <PieChartVC show={showPieChartVC} onHide={() => setShowPieChartVC(false)} />
                </Col>
                <Col className="text-center">
                    <PieChartCBS />
                    <Button variant="dark" onClick={() => setShowPieChartCB(true)}>Click Here</Button>
                    <PieChartCB show={showPieChartCB} onHide={() => setShowPieChartCB(false)} />
                </Col>
                <Col className="text-center">
                    <BarChartTODS />
                    <Button variant="dark" onClick={() => setShowBarChartTOD(true)}>Click Here</Button>
                    <BarChartTOD show={showBarChartTOD} onHide={() => setShowBarChartTOD(false)} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <PieChartVPCS />
                    <Button variant="dark" onClick={() => setShowPieChartVPC(true)}>Click Here</Button>
                    <PieChartVPC show={showPieChartVPC} onHide={() => setShowPieChartVPC(false)} />
                </Col>
                <Col className="text-center">
                    <BarChartHorS />
                    <Button variant="dark" onClick={() => setShowBarChartHor(true)}>Click Here</Button>
                    <BarChartHor show={showBarChartHor} onHide={() => setShowBarChartHor(false)} />
                </Col>
                <Col className="text-center">
                    <BarChartMOYS />
                    <Button variant="dark" onClick={() => setShowBarChartMOY(true)}>Click Here</Button>
                    <BarChartMOY show={showBarChartMOY} onHide={() => setShowBarChartMOY(false)} />
                </Col>
            </Row>
        </div>
    );
}

export default Analytics;