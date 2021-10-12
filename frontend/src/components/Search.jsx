import { useState } from "react";
import axios from "axios";
import Result from "./Result";
import "./Search.css"

function Search(){
    const [pageNum, setPageNum] = useState("1")
    const [columnName, setColumnName] = useState("Plate ID")
    const [searchTerms, setSearchTerms] = useState("")
    const [serverReturns, setServerReturns] = useState([
        {
            "Summons Number": "1363745270",
            "Plate ID": "GGY6450",
            "Registration State": "99",
            "Plate Type": "PAS",
            "Issue Date": "2015-07-09T00:00:00.000",
            "Violation Code": "46",
            "Vehicle Body Type": "SDN",
            "Vehicle Make": "HONDA",
            "Issuing Agency": "P",
            "Street Code1": "0",
            "Street Code2": "40404",
            "Street Code3": "40404",
            "Vehicle Expiration Date": "20170602.0",
            "Violation Location": "0074",
            "Violation Precinct": "74",
            "Issuer Precinct": "301",
            "Issuer Code": "358160",
            "Issuer Command": "T301",
            "Issuer Squad": "0000",
            "Violation Time": "1037A",
            "Time First Observed": "",
            "Violation County": "K",
            "Violation In Front Of Or Opposite": "F",
            "House Number": "142",
            "Street Name": "MACDOUNGH ST",
            "Intersecting Street": "",
            "Date First Observed": "0",
            "Law Section": "408",
            "Sub Division": "D1",
            "Violation Legal Code": "",
            "Days Parking In Effect    ": "BBBBBBB",
            "From Hours In Effect": "ALL",
            "To Hours In Effect": "ALL",
            "Vehicle Color": "WHITE",
            "Unregistered Vehicle?": "0",
            "Vehicle Year": "2010",
            "Meter Number": "-",
            "Feet From Curb": "0",
            "Violation Post Code": "",
            "Violation Description": "",
            "No Standing or Stopping Violation": "",
            "Hydrant Violation": "",
            "Double Parking Violation": ""
        },
        {
            "Summons Number": "1363745293",
            "Plate ID": "KXD355",
            "Registration State": "SC",
            "Plate Type": "PAS",
            "Issue Date": "2015-07-09T00:00:00.000",
            "Violation Code": "21",
            "Vehicle Body Type": "SUBN",
            "Vehicle Make": "CHEVR",
            "Issuing Agency": "P",
            "Street Code1": "55730",
            "Street Code2": "67030",
            "Street Code3": "58730",
            "Vehicle Expiration Date": "20160288.0",
            "Violation Location": "0079",
            "Violation Precinct": "79",
            "Issuer Precinct": "301",
            "Issuer Code": "358160",
            "Issuer Command": "T301",
            "Issuer Squad": "0000",
            "Violation Time": "1206P",
            "Time First Observed": "",
            "Violation County": "K",
            "Violation In Front Of Or Opposite": "F",
            "House Number": "331",
            "Street Name": "LEXINGTON AVE",
            "Intersecting Street": "",
            "Date First Observed": "0",
            "Law Section": "408",
            "Sub Division": "F1",
            "Violation Legal Code": "",
            "Days Parking In Effect    ": "YBBYBBB",
            "From Hours In Effect": "1100A",
            "To Hours In Effect": "1230P",
            "Vehicle Color": "RED",
            "Unregistered Vehicle?": "0",
            "Vehicle Year": "0",
            "Meter Number": "-",
            "Feet From Curb": "0",
            "Violation Post Code": "",
            "Violation Description": "",
            "No Standing or Stopping Violation": "",
            "Hydrant Violation": "",
            "Double Parking Violation": ""
        }
    ])
    
    const increasePage = () => {
        setPageNum(parseInt(pageNum, 10) + 1)
    }

    const decreasePage = () => {
        setPageNum(parseInt(pageNum, 10) - 1)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!columnName) {
            alert('Please enter a columns name')
            setPageNum("1")
            setColumnName("Plate ID")
            setSearchTerms("")
            return
        }
        if (!searchTerms) {
            alert('Please enter a search terms')
            setPageNum("1")
            setColumnName("Plate ID")
            setSearchTerms("")
            return
        }

        fetchDatas()

        setPageNum("1")
        setColumnName("Plate ID")
        setSearchTerms("")
    }

    const fetchDatas = async () => {
        const res = await axios("http://localhost:5000/data/cols="+ columnName + "&page=" + pageNum + "&terms=" + searchTerms)
        console.log(res.data)
        setServerReturns(res.data)
    }

    return (
        <div className="search">
            <h3 className="search-title">Search From</h3>
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
                <div className='form-control'>
                    <label>Search Terms</label>
                    <input
                    type='text'
                    placeholder='Search Terms'
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                    />
                </div>
        
                <input type='submit' value='Search' className='btn btn-block' />
            </form>
            <div>
                {serverReturns.length > 0 ? (
                    <table className="result-table">
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
                            <Result server={serverReturn} />
                            ))}
                        </>
                    </table>
                ) : (
                    'No Result To Show'
                )}
            </div>
            <div className="change-page">
                <div className="change-page-block">
                    {/* eslint-disable-next-line*/}
                    {!(pageNum == "1") ?  (
                        <button className='btn btn-block' onClick={decreasePage}>&laquo; Previous</button>
                    ) : <></>}
                    <p> Page {pageNum} </p>
                    <button className='btn btn-block' onClick={increasePage}>Next &raquo;</button>
                </div>
            </div>
        </div>
    );
}

export default Search