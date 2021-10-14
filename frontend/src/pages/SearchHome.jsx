import { useState, useEffect } from "react";
import axios from "axios";
import Result from "../components/Result.jsx";
import "../components/Search.css";
import "../App.css"
import { Button, Container, Row, Col, FloatingLabel, Form } from 'react-bootstrap';

function SearchHome() {
    const [pageNum, setPageNum] = useState(1)
    const [columnName, setColumnName] = useState("Plate ID")
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

        if (!searchTerms) {
            setPageNum(0)
            setColumnName("Plate ID")
            setSearchTerms("")
            setServerReturns([])
            alert('Please enter a search term')

            return
        }
        setPageNum(1)
        setColumnName("Plate ID")
        setServerReturns([])
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
                    <h1 className="text-center">Search</h1>
                </div>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col></Col>
                        <Col md>
                            <div className="center-box">
                                <FloatingLabel controlId="floatingSelectGrid" label="Column">
                                    <Form.Select aria-label="Floating label select example" onChange={(e) => setColumnName(e.target.value)} name="Column" id="Column" value={columnName}>
                                        <option value="Select One">Choose One</option>
                                        <option value="Plate ID">Plate ID</option>
                                        <option value="Registration State">Registration State</option>
                                        <option value="Issue Date">Issue Date</option>
                                        <option value="Violation Time">Violation Time</option>
                                        <option value="Violation Code">Violation Code</option>
                                        <option value="Vehicle Make">Vehicle Make</option>
                                        <option value="Vehicle Body Type">Vehicle Body Type</option>
                                        <option value="Vehicle Year">Vehicle Year</option>
                                        <option value="Street Name">Street Name</option>
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

                {serverReturns.length > 0 ? (
                    <table className="text-center result-table">
                        <tbody>
                            <tr>
                                <th>Plate ID</th>
                                <th>Registration State</th>
                                <th>Issue Date</th>
                                <th>Violation Time</th>
                                <th>Violation Code</th>
                                <th>Vehicle Make</th>
                                <th>Vehicle Body Type</th>
                                <th>Vehicle Year</th>
                                <th>Street Name</th>
                            </tr>
                            <>
                                {serverReturns.map((serverReturn) => (
                                    <Result key={serverReturn["Summons Number"]} server={serverReturn} />
                                ))}
                            </>
                        </tbody>
                    </table>
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


