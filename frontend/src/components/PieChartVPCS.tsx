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
      text: 'Frequencies of Violations Per County',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        // showInLegend: "true",
        // legendText: "{label}",
        indexLabelFontSize: 9,
        // indexLabel: "{label} - {y}%",
        dataPoints: dataPoints,
      },
    ],
  };
  const containerProps = {
    height: '700px',
    wight: '200px',
  };

  return (
    <div className="piechart">
      <CanvasJSChart
        containerProps={containerProps}
        options={options}
      ></CanvasJSChart>
    </div>
  );
}

export default PieChartVPCS;
