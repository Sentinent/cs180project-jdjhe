import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import { Modal, Button } from 'react-bootstrap';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface MonthOfYear {
  Month: String;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function BarChartMOY(props: any) {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/featuremonth/data/monthviolations${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;
        const mappedData = data.map((x: MonthOfYear) => ({
          label: x['Month'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const options = {
    exportEnabled: true,
    // title: {
    //   text: 'Frequencies of Violations by Month',
    // },
    axisX: {
      title: 'Month',
      interval: 1,
    },
    axisY: {
      title: '% of Violations',
      minimum: 0,
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Frequencies of Violations by Month
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="barchart">
          <CanvasJSChart options={options}></CanvasJSChart>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BarChartMOY;
