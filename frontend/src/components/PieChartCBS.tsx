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
    <div>
      <CanvasJSChart options={options}></CanvasJSChart>
    </div>
  );
}

export default PieChartCBS;
