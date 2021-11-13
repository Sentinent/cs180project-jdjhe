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

  const options = {
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

  return (
    <div className="barchart">
      <CanvasJSChart options={options}></CanvasJSChart>
    </div>
  );
}

export default BarChartHorS;
