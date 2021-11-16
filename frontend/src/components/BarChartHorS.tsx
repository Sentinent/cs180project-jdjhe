import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface RepeatOffenders {
  ViolationCode: Number;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function BarChartHorS() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/featurerepeats/data/repeatcount${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: RepeatOffenders) => ({
          label: 'Violation ' + x['ViolationCode'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const confg1 = {
    animationEnabled: true,
    title: {
      text: '',
    },
    axisX: {
      title: 'Violation',
    },
    axisY: {
      title: '% of Repeats',
      includeZero: true,
    },
    axisYType: 'secondary',
    data: [
      {
        type: 'bar',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        indexLabelFontSize: 9,
        dataPoints: dataPoints,
      },
    ],
  };
  const confg2 = {
    exportEnabled: true,
    axisX: {
      title: 'Violation',
      reversed: true,
    },
    axisY: {
      title: '% of Repeats',
      includeZero: true,
    },
    axisYType: 'secondary',
    data: [
      {
        type: 'bar',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <h3 className="card-title mb-3">Repeat Offenders</h3>
      <CanvasJSChart options={confg1}></CanvasJSChart>
      <button
        type="button"
        className="btn btn-dark justify-content-between mt-3"
        data-bs-toggle="modal"
        data-bs-target="#HORModal"
      >
        Learn more
      </button>

      <div className="modal fade" id="HORModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title" id="exampleModalLabel">Repeat Offenders</h5>
              <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row text-center g-3 m-3">
                  <div className="col-xxl">
                    <CanvasJSChart options={confg2}></CanvasJSChart>
                  </div>
                </div>
                <div className="row text-center g-3 m-3">
                  <div className="col-xxl">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Violation Code</th>
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

export default BarChartHorS;
