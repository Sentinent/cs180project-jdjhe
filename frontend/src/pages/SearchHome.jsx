import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchHome.css";
import "../App.css"
import { Button, Container, Row, Col, FloatingLabel, Form, Table } from 'react-bootstrap';

function SearchHome() {
    const [pageNum, setPageNum] = useState(1)
    const [columnName, setColumnName] = useState("Choose one")
    const [searchTerms, setSearchTerms] = useState("")
    const [serverReturns, setServerReturns] = useState([])

    useEffect(() => {
        if (searchTerms) {
            fetchDatas()
        }
        /* eslint-disable-next-line*/
    }, [pageNum]);

    const onSubmit = async (e) => {
        e.preventDefault()

        setPageNum(1)
        fetchDatas()
    }

    const fetchDatas = async () => {
        const res = await axios("http://localhost:5000/data/cols=" + columnName + "&page=" + pageNum + "&terms=" + searchTerms)
        console.log(res.data)
        setServerReturns(res.data)
    }

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1 className="text-center">Search</h1>
                    </div>
                </div>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col></Col>
                        <Col md>
                            <div className="center-box">
                                <FloatingLabel controlId="floatingSelectGrid" label="Column">
                                    <Form.Select aria-label="Floating label select example" onChange={(e) => setColumnName(e.target.value)} name="Column" id="Column" value={columnName}>
                                        <option value="Choose One">Choose One</option>
                                        <option value="Summons Number">Summons Number</option>
                                        <option value="Plate ID">Plate ID</option>
                                        <option value="Registration State">Registration State</option>
                                        <option value="Issue Date">Issue Date</option>
                                        <option value="Violation Time">Violation Time</option>
                                        <option value="Violation Code">Violation Code</option>
                                        <option value="Vehicle Make">Vehicle Make</option>
                                        <option value="Vehicle Body Type">Vehicle Body Type</option>
                                        <option value="Vehicle Year">Vehicle Year</option>
                                        <option value="Street Name">Street Name</option>
                                        <option value="Violation County">Violation County</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <div className="center-box">
                                <FloatingLabel controlId="floatingInputGrid" label="Search Terms">
                                    <Form.Control required type="text" placeholder="violations" value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </Col>
                        <Col>
                            <Button className="center-box d-grid gap-2" variant="dark" size="lg" type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>

                {serverReturns ? (
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>Summons Number</th>
                                <th>Plate ID</th>
                                <th>Registration State</th>
                                <th>Issue Date</th>
                                <th>Violation Time</th>
                                <th>Violation Code</th>
                                <th>Vehicle Make</th>
                                <th>Vehicle Body Type</th>
                                <th>Vehicle Year</th>
                                <th>Street Name</th>
                                <th>Violation County</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serverReturns.map(el => {
                                return (
                                    <tr>
                                        <td>{el["Summons Number"]}</td>
                                        <td>{el["Plate ID"]}</td>
                                        <td>{el["Registration State"]}</td>
                                        <td>{el["Issue Date"]}</td>
                                        <td>{el["Violation Time"]}</td>
                                        <td>{el["Violation Code"]}</td>
                                        <td>{el["Vehicle Make"]}</td>
                                        <td>{el["Vehicle Body Type"]}</td>
                                        <td>{el["Vehicle Year"]}</td>
                                        <td>{el["Street Name"]}</td>
                                        <td>{el["Violation County"]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </Table>
                ) : (
                    <div className="text-center">No Result To Show</div>
                )}
                <div className="text-center">
                    <div className="change-page">
                        <div className="change-page-block">
                            {/* eslint-disable-next-line*/}
                            {(pageNum > 1) ? (
                                <Button variant="outline-dark" onClick={() => setPageNum(pageNum - 1)}>&laquo; Previous</Button>
                            ) : <></>}
                            <h5>{' '}Page {pageNum}{' '}</h5>
                            <Button variant="outline-dark" onClick={() => setPageNum(pageNum + 1)}>Next &raquo;</Button>
                        </div>
                    </div >
                </div>
            </Container>

        </div >
    );
}

export default SearchHome;


