import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../components/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Title {
  Title: String;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function Custom() {
  const [customOption, setCustomOption] = useState("Registration State");
  const [chartOption, setChartOption] = useState("pie");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/custom/term=${customOption}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: Title) => ({
          label: x['Title'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
    
  }, [customOption]);
  
  useEffect(() => {
    const configTemp = {
      exportEnabled: true,
      animationEnabled: true,
      axisX: {
        interval: 1,
        reversed: true,
      },
      axisY: {
        minimum: 0,
        includeZero: true,
      },
      axisYType: 'secondary',
      data: [
        {
          type: chartOption,
          dataPoints: dataPoints,
          startAngle: 75,
        },
      ],
    };
    setConfig(configTemp);
  }, [customOption, chartOption, dataPoints]);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const selection = {customOption};
    console.log(selection);
  }

  return (
    <>
      <section className="bg-light">
        <div className="container">
          <div className="row p-2">
            <form onSubmit={handleSubmit}>
              <label>Selection:</label>
              <select value={customOption} onChange={(e) => setCustomOption(e.target.value)}>
                <option value="Registration State">Registration State</option>
                <option value="Issue Date">Issue Date</option>
                <option value="Violation Time">Violation Time</option>
                <option value="Violation Code">Violation Code</option>
                <option value="Vehicle Make">Vehicle Make</option>
                <option value="Vehicle Body Type">Vehicle Body Type</option>
                <option value="Vehicle Year">Vehicle Year</option>
                <option value="Street Name">Street Name</option>
                <option value="Violation County">Violation County</option>
              </select>
              <select value={chartOption} onChange={(e) => setChartOption(e.target.value)}>
                <option value="pie">Pie</option>
                <option value="doughnut">Doughnut</option>
                <option value="bar">Bar</option>
                <option value="area">Area</option>
                <option value="scatter">Scatter</option>
                <option value="spline">Spline</option>
                <option value="stepLine">Step Line</option>
              </select>
              <button className="btn">gen</button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="row text-center g-3 m-3">
          <div className="col-xxl">
            <CanvasJSChart options={config}></CanvasJSChart>
          </div>
        </div>
      </section>
      <section>
        <div className="row text-center g-3 m-3">
          <div className="col-xxl">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>{customOption}</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {dataPoints.map((_, index) => (
                  <tr>
                    <td>{_.label}</td>
                    <td>{_.y}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Custom;
