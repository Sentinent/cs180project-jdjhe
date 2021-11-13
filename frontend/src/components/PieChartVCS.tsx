import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ViolationCount {
  ViolationCode: Number;
  Percentage: Number;
}

interface DataPoint {
  label: String;
  y: Number;
}

function PieChartVCS() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/feature1/data/violationcount${window.location.search}`
      )
      .then((resp) => {
        const data = resp.data;

        const mappedData = data.map((x: ViolationCount) => ({
          label: 'Violation ' + x['ViolationCode'],
          y: x['Percentage'],
        }));
        setDataPoints(mappedData);
      });
  }, []);

  const options = {
    // exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "",
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        // showInLegend: "true",
        // legendText: "{label}",
        indexLabelFontSize: 15,
        // indexLabel: "{label} - {y}%",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options}></CanvasJSChart>
    </div>
  );
}

export default PieChartVCS;
