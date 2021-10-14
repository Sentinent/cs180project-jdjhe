import { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result";
import "./Search.css";
import { Button, Row, Col, FloatingLabel, Form } from 'react-bootstrap';

function Search() {
    const [pageNum, setPageNum] = useState(1)
    const [columnName, setColumnName] = useState("Plate ID")
    const [searchTerms, setSearchTerms] = useState("temp")
    const [serverReturns, setServerReturns] = useState([])

    useEffect(() => {
        if (searchTerms) {
            fetchDatas()
        }
        /* eslint-disable-next-line*/
    }, [pageNum]);

    const onSubmit = async (e) => {
        e.preventDefault()


        // if (!searchTerms) {
        //     setPageNum(0)
        //     setColumnName("Plate ID")
        //     setServerReturns([])
        //     alert('Please enter a search terms')
            
        //     return
        // } 
        setPageNum(1)
        fetchDatas()
    }

    const fetchDatas = async () => {
        const res = await axios("http://localhost:5000/data/cols=" + columnName + "&page=" + pageNum + "&terms=" + searchTerms)
        console.log(res.data)
        setServerReturns(res.data)
    }

    return (
        <div className="search">
            <Row>
                <h3 className="search-title">Search From</h3>
            </Row>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Column</label>
                    <select 
                        name="Column" 
                        id="Column"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                    >
                        <option value="Plate ID">Plate ID</option>
                        <option value="Registration State">Registration State</option>
                        <option value="Issue Date">Issue Date</option>
                        <option value="Violation Time">Violation Time</option>
                        <option value="Violation Code">Violation Code</option>
                        <option value="Vehicle Make">Vehicle Make</option>
                        <option value="Vehicle Body Type">Vehicle Body Type</option>
                        <option value="Vehicle Year">Vehicle Year</option>
                        <option value="Street Name">Street Name</option>
                    </select>
                </div>
                {/* <div className='form-control'>
                    <label>Search Terms</label>
                    <input
                    type='text'
                    placeholder='Search Terms'
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                    />
                </div> */}
        
                <input type='submit' value='Search' className='btn btn-block' />
            </form>
            <div>
                {serverReturns.length > 0 ? (
                    <table className="result-table">
                        <tbody>
                            <tr>
                                {/* <th>{columnName}</th> */}
                                {/* <th>Registration State</th>
                                <th>Issue Date</th>
                                <th>Violation Time</th>
                                <th>Violation Code</th>
                                <th>Vehicle Make</th>
                                <th>Vehicle Body Type</th>
                                <th>Vehicle Year</th>
                                <th>Street Name</th> */}
                            </tr>
                            <>
                                {serverReturns.map((serverReturn) => (
                                    <Result key={serverReturn["Summons Number"]} server={serverReturn}/>
                                ))}
                            </>
                        </tbody>
                    </table>
                ) : (
                    'No Result To Show'
                )}
            </div>
            <div className="change-page">
                <div className="change-page-block">
                    {/* eslint-disable-next-line*/}
                    {(pageNum > 1) ? (
                        <Button className='btn btn-block' onClick={() => setPageNum(pageNum - 1)}>&laquo; Previous</Button>
                    ) : <></>}
                    <p> Page {pageNum} </p>
                    <button className='btn btn-block' onClick={() => setPageNum(pageNum + 1)}>Next &raquo;</button>
                </div>
            </div>
        </div >
    );
}

export default Search