import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";

function Violations() {
    const [tableCodes, setTableCodes] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/table/data/table`
            )
            .then((resp) => {
                const data = resp.data;
                setTableCodes(data);
            });
    }, []);

    return (
        <div className="violation-background">
            <div className="background-backdrop">
                <section id="header-box" className="box text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
                    <div className="container">
                        <div className="d-sm-flex align-items-center">
                            <div className="container-fluid content-justify-center text-center">
                                <h1>Violation Codes and What They Stand For</h1>
                                <p className="lead my-4">
                                    A table of all the violation codes and what each of them mean!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="container align-items-center text-center my-4 pb-4">
                <table className="code-table container-fluid content-justify-center table table-hover table-background">
                    <thead className="violation-code-header table-info">
                        <tr>
                            <th className="violation-code">Violation Code</th>
                            <th className="violation-code">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableCodes.map(e => {
                            return (
                                <tr>
                                    <td className="violation-code">{e["ViolationCode"]}</td>
                                    <td className="violation-code">{e["Title"]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Violations;