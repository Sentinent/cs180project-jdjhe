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
        <section className="bg-dark p-2">
            <div className="container">
                <div className="row text-center g-3 m-3">
                    <div className="col-xl">
                        <div className="card bg-light text-dark">
                            <div className="card-body text-center">
                                <h3 className="card-title mb-3">Most Common Types of Violations</h3>
                                <PieChartVCS />
                                <button className="btn btn-secondary justify-content-between mt-3" onClick={() => setShowPieChartVC(true)}>Learn more</button>
                                <PieChartVC show={showPieChartVC} onHide={() => setShowPieChartVC(false)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl">
                        <div className="card bg-light text-dark">
                            <div className="card-body text-center">
                                <h3 className="card-title mb-3">Most Common Violations by Car Brand</h3>
                                <PieChartCBS />
                                <button className="btn btn-secondary justify-content-between mt-3" onClick={() => setShowPieChartCB(true)}>Learn more</button>
                                <PieChartCB show={showPieChartCB} onHide={() => setShowPieChartCB(false)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center g-3 m-3">
                    <div className="col-xxl">
                        <div className="card bg-light text-dark">
                            <div className="card-body text-center">
                                <h3 className="card-title mb-3">Violations By Time of Date</h3>
                                <BarChartTODS />
                                <button className="btn btn-secondary justify-content-between mt-3" onClick={() => setShowBarChartTOD(true)}>Learn more</button>
                                <BarChartTOD show={showBarChartTOD} onHide={() => setShowBarChartTOD(false)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card bg-light text-dark">
                            <div className="card-body text-center">
                                <h3 className="card-title mb-3">Frequencies of Violations Per County</h3>
                                <PieChartVPCS />
                                <button className="btn btn-secondary justify-content-between mt-3" onClick={() => setShowPieChartVPC(true)}>Learn more</button>
                                <PieChartVPC show={showPieChartVPC} onHide={() => setShowPieChartVPC(false)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center g-4 m-3">
                    <div className="col-md">
                        <div className="card bg-light text-dark">
                            <div className="card-body text-center">
                                <h3 className="card-title mb-3">Repeat Offenders</h3>
                                <BarChartHorS />
                                <button className="btn btn-secondary justify-content-between mt-3" onClick={() => setShowBarChartHor(true)}>Learn more</button>
                                <BarChartHor show={showBarChartHor} onHide={() => setShowBarChartHor(false)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card bg-light text-dark">
                            <div className="card-body text-center">
                                <h3 className="card-title mb-3">Frequencies of Violations by Month</h3>
                                <BarChartMOYS />
                                <button className="btn btn-secondary justify-content-between mt-3" onClick={() => setShowBarChartMOY(true)}>Learn more</button>
                                <BarChartMOY show={showBarChartMOY} onHide={() => setShowBarChartMOY(false)} />
                            </div>
                        </div>
                    </div>
                    {/* <Row className="text-center">
                        <PieChartVCS />
                        <button type="button" className="btn btn-dark" onClick={() => setShowPieChartVC(true)}>Learn more</button>
                        <PieChartVC show={showPieChartVC} onHide={() => setShowPieChartVC(false)} />
                    </Row> */}
                    
                    {/* <Row className="text-center">
                        <PieChartCBS />
                        <button type="button" className="btn btn-dark" onClick={() => setShowPieChartCB(true)}>Learn more</button>
                        <PieChartCB show={showPieChartCB} onHide={() => setShowPieChartCB(false)} />
                    </Row> */}
                    {/* <Row className="text-center">
                        <BarChartTODS />
                        <button type="button" className="btn btn-dark" onClick={() => setShowBarChartTOD(true)}>Learn more</button>
                        <BarChartTOD show={showBarChartTOD} onHide={() => setShowBarChartTOD(false)} />
                    </Row> */}
                    {/* <Row className="text-center">
                        <PieChartVPCS />
                        <button type="button" className="btn btn-dark" onClick={() => setShowPieChartVPC(true)}>Learn more</button>
                        <PieChartVPC show={showPieChartVPC} onHide={() => setShowPieChartVPC(false)} />
                    </Row> */}
                    {/* <Row className="text-center">
                        <BarChartHorS />
                        <button type="button" className="btn btn-dark" onClick={() => setShowBarChartHor(true)}>Learn more</button>
                        <BarChartHor show={showBarChartHor} onHide={() => setShowBarChartHor(false)} />
                    </Row> */}
                    {/* <Row className="text-center">
                        <BarChartMOYS />
                        <button type="button" className="btn btn-dark" onClick={() => setShowBarChartMOY(true)}>Learn more</button>
                        <BarChartMOY show={showBarChartMOY} onHide={() => setShowBarChartMOY(false)} />
                    </Row> */}
                </div>
            </div>
        </section>
    );
}

export default Analytics;