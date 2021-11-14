import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface CarBrand {
  CarBrand: String;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function PieChartCBS() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/featurecb/data/carbrandviolations${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: CarBrand) => ({
          label: x['CarBrand'],
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
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        indexLabelFontSize: 9,
        dataPoints: dataPoints,
      },
    ],
  };
  const confg2 = {
    exportEnabled: true,
    animationEnabled: true,
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <h3 className="card-title mb-3">Most Common Violations by Car Brand</h3>
      <CanvasJSChart options={confg1}></CanvasJSChart>
      <button 
        type="button" 
        className="btn btn-secondary justify-content-between mt-3" 
        data-bs-toggle="modal" 
        data-bs-target="#CBSModal"
      >
        Learn more
      </button>

      <div className="modal fade" id="CBSModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title" id="exampleModalLabel">Most Common Violations by Car Brand</h5>
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
                    {/* datatable */}
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

export default PieChartCBS;
