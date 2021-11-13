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
import BarChartMOY from "../components/BarChartMOY";
import BarChartMOYS from "../components/BarChartMOYS";
import { Row } from 'react-bootstrap';
import React, { useState } from 'react';
// import "../App.css";

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
                <PieChartVCS />
                <button type="button" className="btn btn-dark" onClick={() => setShowPieChartVC(true)}>Learn more</button>
                <PieChartVC show={showPieChartVC} onHide={() => setShowPieChartVC(false)} />
            </Row>
            
            <Row className="text-center">
                <PieChartCBS />
                <button type="button" className="btn btn-dark" onClick={() => setShowPieChartCB(true)}>Learn more</button>
                <PieChartCB show={showPieChartCB} onHide={() => setShowPieChartCB(false)} />
            </Row>
            <Row className="text-center">
                <BarChartTODS />
                <button type="button" className="btn btn-dark" onClick={() => setShowBarChartTOD(true)}>Learn more</button>
                <BarChartTOD show={showBarChartTOD} onHide={() => setShowBarChartTOD(false)} />
            </Row>
            <Row className="text-center">
                <PieChartVPCS />
                <button type="button" className="btn btn-dark" onClick={() => setShowPieChartVPC(true)}>Learn more</button>
                <PieChartVPC show={showPieChartVPC} onHide={() => setShowPieChartVPC(false)} />
            </Row>
            <Row className="text-center">
                <BarChartHorS />
                <button type="button" className="btn btn-dark" onClick={() => setShowBarChartHor(true)}>Learn more</button>
                <BarChartHor show={showBarChartHor} onHide={() => setShowBarChartHor(false)} />
            </Row>
            <Row className="text-center">
                <BarChartMOYS />
                <button type="button" className="btn btn-dark" onClick={() => setShowBarChartMOY(true)}>Learn more</button>
                <BarChartMOY show={showBarChartMOY} onHide={() => setShowBarChartMOY(false)} />
            </Row>
        </div>
    );
}

export default Analytics;