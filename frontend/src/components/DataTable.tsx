import React, {
  Dispatch,
  // FormEvent,
  ReactElement,
  useEffect,
  useReducer,
} from "react";
import EntryModal from "./EntryModal";
import "./DataTable.css";

import PencilSvg from "./assets/pencil.svg";
import TrashSvg from "./assets/trash.svg";
import LeftArrowSvg from "./assets/left-arrow.svg";
import PlusSvg from "./assets/plus.svg";
import axios from "axios";
// import { string } from "yargs";

const ENDPOINT = "localhost:5000";
const cols = [
  "Summons Number",
  "Plate ID",
  "Registration State",
  "Issue Date",
  "Violation Time",
  "Violation Code",
  "Vehicle Make",
  "Vehicle Body Type",
  "Vehicle Year",
  "Street Name",
  "County County",
  "Violation County",
];

let existingTimeout: NodeJS.Timeout;

export interface DataTableState {
  rows: ReactElement[];
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
    case "updateData":
      return { ...state, rows: action.data };
    case "modalType":
      return { ...state, modalType: action.data };
    case "modalShown":
      return { ...state, modalShown: !state.modalShown };
    case "modalData":
      return { ...state, modalData: action.data };
    default:
      return state;
  }
}

function getCurrentDataQuery(): string {
  // returns the data query url for the current filters
  let queryParts = [];
  for (const headerCell of Array.from(
    document.querySelectorAll(".datagrid-header")
  )) {
    const key: string = (headerCell as any).innerText.trim();
    let value: string = (headerCell as any).querySelector("input").value;
    if (value === "") value = "*"; // default is match all

    if (
      value.startsWith("<") ||
      value.startsWith(">") ||
      value.startsWith("==")
    )
      queryParts.push(key + value);
    else {
      // assume default operator is ~ (in)
      queryParts.push(key + "~" + value);
    }
  }
  let terms = queryParts.join(",");
  return `http://${ENDPOINT}/data/cols=_&page=1&terms=${terms}`;
}

function createHeader(
  colNames: String[],
  dispatch: Dispatch<DataTableStateAction>
): ReactElement {
  const onFilter = () => {
    // wait a second from the last input so we don't spam the backend
    if (existingTimeout) clearTimeout(existingTimeout);
    existingTimeout = setTimeout(() => {
      createTable(getCurrentDataQuery(), dispatch);
    }, 1000);
  };

  const headerRow = React.createElement("span", { key: `colheader` }, [
    colNames.map((col, i) =>
      React.createElement(
        "p",
        { key: `colheader${i}`, className: "datagrid-cell datagrid-header" },
        [
          col,
          React.createElement("br", { key: `colheader${i}_br` }),
          React.createElement("input", {
            type: "text",
            key: `colheader${i}_input`,
            onInput: onFilter,
          }),
        ]
      )
    ),
    // TODO: Switch between AND and OR here vvv
    // React.createElement('p', { className: 'actions', key: 'colheader_actions' })
  ]);

  return headerRow;
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
    dispatch({ type: "modalType", data: "edit" });
    const row: HTMLSpanElement = document.getElementById(
      summonsId
    ) as HTMLSpanElement;
    const cells: HTMLParagraphElement[] = Array.from(row.querySelectorAll("p"));
    const cellData = cells.map((x) => x.innerText);

    dispatch({ type: "modalData", data: cellData });
    dispatch({ type: "modalShown", data: undefined });
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
          createTable(getCurrentDataQuery(), dispatch);
        });
    }
  };

  let rows = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    // <span> </span>
    const summonsId = row[0]; // used as an id

    const cells = row.map((val, j) =>
      React.createElement(
        "p",
        { key: `row${i}_${j}`, className: `datagrid-cell` },
        val
      )
    );
    const actionElem = React.createElement(
      "p",
      { className: `action`, key: `row${i}_actions` },
      [
        React.createElement("img", {
          className: "icon",
          key: `row${i}_edit`,
          src: PencilSvg,
          style: { marginRight: "0.5rem" },
          onClick: () => onEdit(summonsId),
        }),
        React.createElement("img", {
          className: "icon",
          key: `row${i}_delete`,
          src: TrashSvg,
          onClick: () => onDelete(summonsId),
        }),
      ]
    );
    const rowElem = React.createElement(
      "span",
      { id: summonsId, key: `coldata${i}`, className: `datagrid-row` },
      [cells, actionElem]
    );
    rows.push(rowElem);
  }

  return rows;
}

function createFooter(dispatch: Dispatch<DataTableStateAction>) {
  const onInsertClicked = () => {
    dispatch({ type: "modalType", data: "insert" });
    dispatch({ type: "modalData", data: [] });
    dispatch({ type: "modalShown", data: undefined });
  };

  const footerRow = React.createElement("span", { key: "colfooter" }, [
    "Showing page 1 of 10",
    React.createElement("img", {
      className: "icon left-arrow",
      key: "colfooter_prevpage",
      src: LeftArrowSvg,
      style: { marginLeft: "0.5rem", marginRight: "0.5rem" },
    }),
    React.createElement("img", {
      className: "icon right-arrow",
      key: "colfooter_nextpage",
      src: LeftArrowSvg,
    }),
    React.createElement(
      "p",
      { className: "actions", key: "colfooter_actions" },
      [
        React.createElement("img", {
          className: "icon",
          key: "col_footer_insert",
          src: PlusSvg,
          onClick: onInsertClicked,
        }),
      ]
    ),
  ]);

  return footerRow;
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
    const data = resp.data.map((x: Object[]) => Object.values(x));

    let rows: React.ReactElement[] = [createHeader(cols, dispatch)];
    rows = rows.concat(createData(data, dispatch));
    rows.push(createFooter(dispatch));

    dispatch({ type: "updateData", data: rows });
  });
}

function DataTable() {
  const [state, dispatch] = useReducer(reducer, {
    rows: [],
    modalType: "insert",
    modalShown: false,
    modalData: [],
  });

  useEffect(() => {
    const terms = cols.map((col) => `${col}~*`).join(",");
    createTable(
      `http://${ENDPOINT}/data/cols=_&page=1&terms=${terms}`,
      dispatch
    );
  }, []);

  return (
    <div className="datagrid">
      <EntryModal state={state} dispatch={dispatch} />
      {state.rows}
    </div>

  );
}

export default DataTable;
