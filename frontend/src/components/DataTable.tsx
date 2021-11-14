import React, {
  Dispatch,
  // FormEvent,
  ReactElement,
  useEffect,
  useReducer,
} from 'react';
import EntryModal from './EntryModal';
import './DataTable.css';

import PencilSvg from '../imgs/pencil-square.svg';
import TrashSvg from '../imgs/trash.svg';
import axios from 'axios';

const ENDPOINT = 'localhost:5000';
const cols = [
  'Summons Number',
  'Plate ID',
  'Registration State',
  'Issue Date',
  'Violation Time',
  'Violation Code',
  'Vehicle Make',
  'Vehicle Body Type',
  'Vehicle Year',
  'Street Name',
  'County County',
  'Violation County',
];
const RESULTS_PER_PAGE = 10; // make sure this is the same in the backend

let existingTimeout: NodeJS.Timeout;

export interface DataTableState {
  rows: ReactElement[];
  currentPage: Number;
  totalPages: Number;
  modalType: string;
  modalShown: boolean;
  modalData: string[];
}

export interface DataTableStateAction {
  type: string;
  data: any;
}

function reducer(state: DataTableState, action: DataTableStateAction) {
  switch (action.type) {
    case 'updateData':
      return { ...state, rows: action.data };
    case 'updateCurrPage':
      return { ...state, currentPage: action.data };
    case 'updateTotalPages':
      return { ...state, totalPages: action.data };
    case 'modalType':
      return { ...state, modalType: action.data };
    case 'modalShown':
      return { ...state, modalShown: !state.modalShown };
    case 'modalData':
      return { ...state, modalData: action.data };
    default:
      return state;
  }
}

function getCurrentSearchTerms() {
  let queryParts = [];
  for (const headerCell of Array.from(
    document.querySelectorAll('.datagrid-header')
  )) {
    const key: string = (headerCell as any).innerText.trim();
    let value: string = (headerCell as any).querySelector('input').value;
    if (value === '') value = '*'; // default is match all

    if (
      value.startsWith('<') ||
      value.startsWith('>') ||
      value.startsWith('==')
    )
      queryParts.push(key + value);
    else {
      // assume default operator is ~ (in)
      queryParts.push(key + '~' + value);
    }
  }
  let terms = queryParts.join(',');
  return terms;
}

function getCurrentDataQuery(currPage: Number): string {
  // returns the data query url for the current filters
  const terms = getCurrentSearchTerms();
  return `http://${ENDPOINT}/data/cols=_&page=${currPage}&terms=${terms}`;
}

function createHeader(
  colNames: String[],
  dispatch: Dispatch<DataTableStateAction>
): ReactElement[] {
  const onFilter = () => {
    // wait a second from the last input so we don't spam the backend
    if (existingTimeout) clearTimeout(existingTimeout);
    existingTimeout = setTimeout(() => {
      createTable(getCurrentDataQuery(1), dispatch);
    }, 1000);
  };

  const headerCells = colNames.map((col, i) =>
    React.createElement(
      'p',
      { key: `colheader${i}`, className: 'datagrid-cell datagrid-header' },
      [
        col,
        React.createElement('br', { key: `colheader${i}_br` }),
        React.createElement('input', {
          type: 'text',
          key: `colheader${i}_input`,
          onInput: onFilter,
        }),
      ]
    )
  );

  headerCells.push(
    React.createElement('p', { className: '', key: 'asd', style: {} }, [])
  );
  return headerCells;

  // TODO: Switch between AND and OR here vvv
  // React.createElement('p', { className: 'actions', key: 'colheader_actions' })
}

function createData(
  data: string[][],
  dispatch: Dispatch<DataTableStateAction>
): React.ReactElement[] {
  if (data.length === 0) {
    return [];
  }

  const onEdit = (summonsId: string) => {
    // create modal with existing data
    dispatch({ type: 'modalType', data: 'edit' });
    const cells: HTMLParagraphElement[] = Array.from(
      document.querySelectorAll(`p[data-id='${summonsId}']`)
    );
    console.log(cells);
    const cellData = cells.map((x) => x.innerText);

    dispatch({ type: 'modalData', data: cellData });
    dispatch({ type: 'modalShown', data: undefined });
  };
  const onDelete = (summonsId: string) => {
    const confirm = window.confirm(
      `Are you sure you want to delete summons number ${summonsId}?`
    );
    if (confirm) {
      // DELETE action with GET lol
      axios
        .get(`http://${ENDPOINT}/delete/summonsNum=${summonsId}`)
        .then((resp) => {
          alert(resp.data);
          createTable(getCurrentDataQuery(1), dispatch);
        });
    }
  };

  let rows: ReactElement[] = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const summonsId = row[0]; // used as an id

    const style: React.CSSProperties = {};
    if (i % 2 === 0) style['backgroundColor'] = '#aaa';
    else style['backgroundColor'] = 'white';

    const cells = row.map((val, j) =>
      React.createElement(
        'p',
        {
          key: `row${i}_${j}`,
          className: `datagrid-cell`,
          style: style,
          'data-id': summonsId,
        },
        val
      )
    );
    const actionElem = React.createElement(
      'p',
      {
        className: `action`,
        key: `row${i}_actions`,
        style: style,
        'data-id': summonsId,
      },
      [
        React.createElement('img', {
          className: 'icon',
          key: `row${i}_edit`,
          src: PencilSvg,
          style: { marginRight: '0.5rem' },
          onClick: () => onEdit(summonsId),
        }),
        React.createElement('img', {
          className: 'icon',
          key: `row${i}_delete`,
          src: TrashSvg,
          onClick: () => onDelete(summonsId),
        }),
      ]
    );

    cells.push(actionElem);
    rows = rows.concat(cells);
  }
  return rows;
}

function createTable(
  dataQueryURL: string,
  dispatch: Dispatch<DataTableStateAction>
) {
  /*
    header
    [data]
    footer
  */

  axios.get(dataQueryURL).then((resp) => {
    // result from backend is a list of objects { colName: colVal }
    const data = resp.data['results'].map((x: Object[]) => Object.values(x));

    let rows: React.ReactElement[] = createHeader(cols, dispatch);
    rows = rows.concat(createData(data, dispatch));
    // rows.push(createFooter(dispatch));

    dispatch({ type: 'updateData', data: rows });
    dispatch({ type: 'updateCurrPage', data: Number(resp.data['currPage']) });
    dispatch({
      type: 'updateTotalPages',
      data: Number(resp.data['totalPages']),
    });
  });
}

function DataTable() {
  const [state, dispatch] = useReducer(reducer, {
    rows: [],
    currentPage: 1,
    totalPages: 1,
    modalType: 'insert',
    modalShown: false,
    modalData: [],
  });

  const onInsertClicked = () => {
    dispatch({ type: 'modalType', data: 'insert' });
    dispatch({ type: 'modalData', data: [] });
    dispatch({ type: 'modalShown', data: undefined });
  };

  const onAnalyzeClicked = () => {
    window.location.href = `/analytics?terms=${getCurrentSearchTerms()}`;
  };

  const onPrevPage = () => {
    if (state.currentPage > 1) {
      createTable(getCurrentDataQuery(state.currentPage - 1), dispatch);
    }
  };

  const onNextPage = () => {
    if (state.currentPage < state.totalPages) {
      createTable(getCurrentDataQuery(state.currentPage + 1), dispatch);
    }
  };

  useEffect(() => {
    const terms = cols.map((col) => `${col}~*`).join(',');
    createTable(
      `http://${ENDPOINT}/data/cols=_&page=1&terms=${terms}`,
      dispatch
    );
  }, []);

  const style = {
    gridTemplateColumns: Array(cols.length + 1)
      .fill('1fr')
      .join(' '),
    gridTemplateRows: Array(RESULTS_PER_PAGE - 1)
      .fill('1fr')
      .join(' '),
  };

  return (
    <>
      <div className="container text-center">
        <section className="datagrid-actions">
          <div className="data-actions m-2 ms-0">
            <button
              type="button"
              className="btn btn-info p-2" 
              data-bs-toggle="modal" 
              data-bs-target="#EntryModal"
              onClick={onInsertClicked}
            >
              Insert Row
            </button>
            <button
              type="button"
              className="btn btn-info p-2"
              onClick={onAnalyzeClicked}
            >
              Analyze Current Query
            </button>
          </div>
        </section>
        <section className="datagrid mt-3" style={style}>
          {state.rows}
        </section>
        <section className="container col-10 md-auto">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center m-3">
              <li className="page-item">
                <button className="page-link" onClick={onPrevPage}>Previous</button>
              </li>
              <li className="page-item disabled"><p className="page-link">Page {state.currentPage} of {state.totalPages}</p></li>
              <li className="page-item">
                <button className="page-link" onClick={onNextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </section>
        <EntryModal state={state} dispatch={dispatch} />
      </div>
    </>
  );
}

export default DataTable;
