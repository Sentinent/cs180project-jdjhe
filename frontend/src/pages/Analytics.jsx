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
import { Row, Button } from 'react-bootstrap';
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
            <Row className="text-center">
                <PieChartVCS className="chart"/>
                <Button variant="dark" onClick={() => setShowPieChartVC(true)}>Click Here</Button>
                <PieChartVC show={showPieChartVC} onHide={() => setShowPieChartVC(false)} />
            </Row>
            <Row className="text-center">
                <PieChartCBS className="chart"/>
                <Button variant="dark" onClick={() => setShowPieChartCB(true)}>Click Here</Button>
                <PieChartCB show={showPieChartCB} onHide={() => setShowPieChartCB(false)} />
            </Row>
            <Row className="text-center">
                <BarChartTODS className="chart"/>
                <Button variant="dark" onClick={() => setShowBarChartTOD(true)}>Click Here</Button>
                <BarChartTOD show={showBarChartTOD} onHide={() => setShowBarChartTOD(false)} />
            </Row>
            <Row className="text-center">
                <PieChartVPCS className="chart"/>
                <Button variant="dark" onClick={() => setShowPieChartVPC(true)}>Click Here</Button>
                <PieChartVPC show={showPieChartVPC} onHide={() => setShowPieChartVPC(false)} />
            </Row>
            <Row className="text-center">
                <BarChartHorS className="chart"/>
                <Button variant="dark" onClick={() => setShowBarChartHor(true)}>Click Here</Button>
                <BarChartHor show={showBarChartHor} onHide={() => setShowBarChartHor(false)} />
            </Row>
            <Row className="text-center">
                <BarChartMOYS className="chart"/>
                <Button variant="dark" onClick={() => setShowBarChartMOY(true)}>Click Here</Button>
                <BarChartMOY show={showBarChartMOY} onHide={() => setShowBarChartMOY(false)} />
            </Row>
        </div>
    );
}

export default Analytics;