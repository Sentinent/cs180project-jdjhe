import React from 'react';
import './DataTable.css';

import PencilSvg from './assets/pencil.svg';
import TrashSvg from './assets/trash.svg';
import LeftArrowSvg from './assets/left-arrow.svg';
import PlusSvg from './assets/plus.svg';

const onFilter = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e);
}

function createHeader(colNames: String[]): React.ReactElement {
    const widthPercent = Math.floor(90 / colNames.length);

    const headerRow = React.createElement('span', {}, [
        colNames.map(col =>
            React.createElement('p', { style: { width: `${widthPercent}%` } }, [
                col,
                React.createElement('br'),
                React.createElement('input', { type: 'text', onInput: onFilter }),
            ])),
        React.createElement('p', { className: 'actions' })
    ]);

    return headerRow;
}

function createData(data: Number[][]): React.ReactElement[] {
    if (data.length === 0) {
        return [];
    }

    const widthPercent = Math.floor(90 / data[0].length); // 90% available to the data cells
    let rows = [];

    for (const row of data) {
        // <span> </span>
        const cells = row.map(val => React.createElement('p', { style: { width: `${widthPercent}%` } }, val));
        const actionElem = React.createElement('p', { className: 'action' }, [
            React.createElement('img', { className: 'icon', src: PencilSvg, style: { marginRight: '0.5rem' } }),
            React.createElement('img', { className: 'icon', src: TrashSvg })
        ]);
        const rowElem = React.createElement('span', {}, [cells, actionElem]);

        /*
                const rowElem = React.createElement('span', {},
                    row.map(val => React.createElement('p', {
                        style: ''
                    }, val))
                        .concat(React.createElement('p', { className: 'actions' }, [
                            React.createElement('img', { className: 'icon', src: PencilSvg, style: { marginRight: '0.5rem' } }),
                            React.createElement('img', { className: 'icon', src: TrashSvg })
                        ]))
                        
                );
                */
        rows.push(rowElem);
    }

    return rows;
}

function createFooter() {
    const footerRow = React.createElement('span', {}, [
        'Showing page 1 of 10',
        React.createElement('img', { className: 'icon left-arrow', src: LeftArrowSvg, style: { marginLeft: '0.5rem', marginRight: '0.5rem' } }),
        React.createElement('img', { className: 'icon right-arrow', src: LeftArrowSvg }),
        React.createElement('p', { className: 'actions' }, [
            React.createElement('img', { className: 'icon', src: PlusSvg })
        ])
    ]);

    return footerRow;
}

function createTable(): React.ReactElement[] {
    /*
    header
    [data]
    footer
    */

    // TODO: from backend
    const cols = ['Col1', 'Col2', 'Col3'];

    const data = [
        [1, 2, 3],
        [1, 1, 1],
        [3, 3, 3],
        [4, 4, 4],
        [5, 5, 5]
    ];


    let rows: React.ReactElement[] = [createHeader(cols)];
    rows = rows.concat(createData(data));
    rows.push(createFooter());

    return rows;
}

function DataTable() {
    return (
        <div className="datagrid">
            {createTable()}
        </div>
    )
}

export default DataTable;