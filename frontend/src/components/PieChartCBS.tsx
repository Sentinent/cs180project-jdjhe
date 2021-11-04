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

  const options = {
    // exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Most Common Violations by Car Brand',
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

export default PieChartCBS;
