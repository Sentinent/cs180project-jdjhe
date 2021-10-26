import PieChartVCS from "../components/PieChartVCS";
import PieChartCBS from "../components/PieChartCBS";
import BarChartS from "../components/BarChartS";
// import PieChartVC from "../components/PieChartVC";
// import PieChartCB from "../components/PieChartCB";
// import BarChart from "../components/BarChart";
import { Row, Col, Button } from 'react-bootstrap';

function Analytics() {
    // const showPieChartVC = () => {
    //     <PieChartVC />
    // }

    // const showPieChartCB = () => {
    //     <PieChartCB />
    // }

    // const showBarChart = () => {
    //     <BarChart />
    // }

    return (


        <div className='main-view'>
            <Row>
                <Col>
                    {/* <Button variant="link" onClick={showPieChartVC}><PieChartVCS /></Button> */}
                    <PieChartVCS />
                </Col>
                <Col>
                    {/* <Button variant="link" onClick={showPieChartCB}><PieChartCBS /></Button> */}
                    <PieChartCBS />
                </Col>
                <Col>
                    {/* <Button variant="link" onClick={showBarChart}><BarChartS /></Button> */}
                    <BarChartS />
                </Col>
            </Row>
        </div>
    );
}

export default Analytics;