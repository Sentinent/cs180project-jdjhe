import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface TimeViolation {
  Time: String;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function sort(data: TimeViolation[]) {
  return data.sort((a: any, b: any) => {
    const aField = a['Time'];
    const bField = b['Time'];

    let timeA = Number.parseInt(aField.substr(0, 2));
    const modA = aField.substr(2, 2);
    let timeB = Number.parseInt(bField.substr(0, 2));
    const modB = bField.substr(2, 2);

    if (modA === 'PM') timeA += 12;
    if (modB === 'PM') timeB += 12;

    // datetimes suck
    if (aField === '12AM') timeA = 0;
    if (aField === '12PM') timeA = 12;
    if (bField === '12AM') timeB = 0;
    if (bField === '12PM') timeB = 12;

    return timeA - timeB;
  });
}

function LineGraphTOD() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/featuretime/data/timeviolations${window.location.search}`
      )
      .then((resp) => {
        const data = sort(resp.data);

        const mappedData = data.map((x: TimeViolation) => ({
          label: x['Time'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const config1 = {
    axisY: {
      title: '% of Violations',
    },
    data: [
      {
        type: 'line',
        dataPoints: dataPoints,
      },
    ],
  };
  const config2 = {
    exportEnabled: true,
    axisX: {
      title: 'Time of Day',
    },
    axisY: {
      title: '% of Violations',
    },
    data: [
      {
        type: 'line',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <h3 className="card-title mb-3">Violations By Time of Day</h3>
      <CanvasJSChart options={config1}></CanvasJSChart>
      <button
        type="button"
        className="btn btn-dark justify-content-between mt-3"
        data-bs-toggle="modal"
        data-bs-target="#TODModal"
      >
        Learn more
      </button>

      <div className="modal fade" id="TODModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title" id="exampleModalLabel">Violations By Time of Day</h5>
              <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row text-center g-3 m-3">
                  <div className="col-xxl">
                    <CanvasJSChart options={config2}></CanvasJSChart>
                  </div>
                </div>
                <div className="row text-center g-3 m-3">
                  <div className="col-xxl">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Time</th>
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
              </div>
            </div>
            <div className="modal-footer bg-dark text-light">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineGraphTOD;
