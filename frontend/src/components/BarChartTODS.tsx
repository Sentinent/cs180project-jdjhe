import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';

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

function BarChartTODS() {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/featuretime/data/timeviolations')
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
        // exportEnabled: true,
        title: {
            text: 'Violations By Time of Date',
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints,
            },
        ],
    };
    const containerProps = {
        height: "700px",
        wight: "200px"
    };

    return (
        <div className="barchart">
            <CanvasJSChart containerProps = {containerProps} options={options}></CanvasJSChart>
        </div>
    );
}

export default BarChartTODS;