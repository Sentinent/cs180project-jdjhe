import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import { Modal, Button, ModalProps } from 'react-bootstrap';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface RepeatOffenders {
  ViolationCode: Number;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function BarChartHor(props: any) {
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

  const options = {
    exportEnabled: true,
    // title: {
    //   text: 'Violations By Time of Date',
    // },
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Repeat Offenders
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

export default BarChartHor;
