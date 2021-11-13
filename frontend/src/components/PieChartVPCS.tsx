import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ViolationCount {
  County: String;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function PieChartVPCS() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/featureVPC/data/violationspercounty${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: ViolationCount) => ({
          label: x['County'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const options = {
    // exportEnabled: true,
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

  return (
    <div className="piechart">
      <CanvasJSChart options={options}></CanvasJSChart>
    </div>
  );
}

export default PieChartVPCS;
