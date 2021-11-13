import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import { Modal, Button } from 'react-bootstrap';

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

function BarChartTOD(props: any) {
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

  const options = {
    exportEnabled: true,
    // title: {
    //   text: 'Violations By Time of Date',
    // },
    axisX: {
      title: 'Time of Day',
    },
    axisY: {
      title: '% of Violations',
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
          Violations By Time of Date
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

export default BarChartTOD;
