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

// function sort(data: ViolationCount[]) {
//     return data.sort((a: any, b: any) => {
//         const aField = a['Time'];
//         const bField = b['Time'];

//         let timeA = Number.parseInt(aField.substr(0, 2));
//         const modA = aField.substr(2, 2);
//         let timeB = Number.parseInt(bField.substr(0, 2));
//         const modB = bField.substr(2, 2);

//         if (modA === 'PM') timeA += 12;
//         if (modB === 'PM') timeB += 12;

//         // datetimes suck
//         if (aField === '12AM') timeA = 0;
//         if (aField === '12PM') timeA = 12;
//         if (bField === '12AM') timeB = 0;
//         if (bField === '12PM') timeB = 12;

//         return timeA - timeB;
//     });
// }

function PieChartVC() {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/feature1/data/violationcount')
            .then((resp) => {
                const data = resp.data;

                const mappedData = data.map((x: ViolationCount) => ({
                    label: "Violation " + x['ViolationCode'],
                    y: x['Percentage'],
                }));
                setDataPoints(mappedData);
            });
    }, []);

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: 'Most Common Types of Violations',
        },
        data: [
            {
                type: 'pie',
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
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

export default PieChartVC;