import PieChartVCS from "../components/PieChartVCS";
import PieChartCBS from "../components/PieChartCBS";
import BarChartS from "../components/BarChartS";
import PieChartVC from "../components/PieChartVC";
import PieChartCB from "../components/PieChartCB";
import BarChart from "../components/BarChart";
import { Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import "../App.css";

function Analytics() {
    const [showPieChartVC, setShowPieChartVC] = useState(false);
    const [showPieChartCB, setShowPieChartCB] = useState(false);
    const [showBarChart, setShowBarChart] = useState(false);

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
                    <BarChartS />
                    <Button variant="dark" onClick={() => setShowBarChart(true)}>Click Here</Button>
                    <BarChart show={showBarChart} onHide={() => setShowBarChart(false)} />
                </Col>
            </Row>
        </div>
    );
}

export default Analytics;