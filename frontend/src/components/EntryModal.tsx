import { Dispatch, useEffect } from 'react';
import './EntryModal.css';
import './DataTable';
import { DataTableState, DataTableStateAction } from './DataTable';
import axios from 'axios';

const ENDPOINT = 'localhost:5000';

// op is either 'insert' or 'update'
function insertOrEditEntry(
  op: string,
  dispatch: Dispatch<DataTableStateAction>
) {
  // could use useRef here instead of dom but oh well
  const fields = [
    'summonsNum',
    'plateID',
    'regState',
    'issDate',
    'vTime',
    'vCode',
    'vehMake',
    'vehBody',
    'vehYear',
    'street',
    'cCounty',
    'vCounty',
  ];

  let queryString = '';
  for (const field of fields) {
    const val = (document.getElementById(field) as HTMLInputElement).value;
    if (queryString === '') queryString += `${field}=${val}`;
    // no '?' ?
    else queryString += `&${field}=${val}`;
  }

  axios.get(`http://${ENDPOINT}/${op}/${queryString}`).then((resp) => {
    alert(resp.data);
    // TODO: maybe trigger a reload if we are fancy
    dispatch({ type: 'modalShown', data: undefined });
    // BIG HACK YEE HAW
    window.location.reload();
  });
}

function EntryModal({
  state,
  dispatch,
}: {
  state: DataTableState;
  dispatch: Dispatch<DataTableStateAction>;
}) {
  const title =
    state.modalType === 'insert'
      ? 'Add new entry'
      : `Modify entry ${state.modalData[0]}`;

  useEffect(() => {
    const modalElem = document.getElementById(
      'entrymodal-content'
    ) as HTMLDivElement;

    if (state.modalType === 'insert') {
      // empty all inputs
      for (const inputElem of Array.from(modalElem.querySelectorAll('input'))) {
        inputElem.value = '';
      }
    } else if (state.modalType === 'edit') {
      let i = 0;
      for (const inputElem of Array.from(modalElem.querySelectorAll('input'))) {
        if (i < state.modalData.length) {
          inputElem.value = state.modalData[i];
          i++;
        }
      }
    }
  }, [state.modalType, state.modalData]);

  return (
    <div
      className="entrymodal"
      style={{ display: state.modalShown ? 'block' : 'none' }}
      onClick={() => dispatch({ type: 'modalShown', data: undefined })}
    >
      <div
        className="entrymodal-content"
        id="entrymodal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <span>{title}</span>
        <br />
        <span>
          <label htmlFor="summonsNum">Summons Number: </label>
          <input type="text" id="summonsNum"></input>
        </span>
        <br />

        <span>
          <label htmlFor="plateID">Plate ID: </label>
          <input type="text" id="plateID"></input>
        </span>
        <br />

        <span>
          <label htmlFor="regState">Registration State: </label>
          <input type="text" id="regState"></input>
        </span>
        <br />

        <span>
          <label htmlFor="issDate">Issue Date: </label>
          <input type="text" id="issDate"></input>
        </span>
        <br />

        <span>
          <label htmlFor="vTime">Violation Time: </label>
          <input type="text" id="vTime"></input>
        </span>
        <br />

        <span>
          <label htmlFor="vCode">Violation Code: </label>
          <input type="text" id="vCode"></input>
        </span>
        <br />

        <span>
          <label htmlFor="vehMake">Vehicle Make: </label>
          <input type="text" id="vehMake"></input>
        </span>
        <br />

        <span>
          <label htmlFor="vehBody">Vehicle Body: </label>
          <input type="text" id="vehBody"></input>
        </span>
        <br />

        <span>
          <label htmlFor="vehYear">Vehicle Year: </label>
          <input type="text" id="vehYear"></input>
        </span>
        <br />

        <span>
          <label htmlFor="street">Street Name </label>
          <input type="text" id="street"></input>
        </span>
        <br />

        <span>
          <label htmlFor="cCounty">County County: </label>
          <input type="text" id="cCounty"></input>
        </span>
        <br />

        <span>
          <label htmlFor="vCounty">Violation County: </label>
          <input type="text" id="vCounty"></input>
        </span>
        <br />

        <span className="modal-actions">
          {state.modalType === 'insert' && (
            <button onClick={() => insertOrEditEntry('insert', dispatch)}>
              Insert
            </button>
          )}
          {state.modalType === 'edit' && (
            <button onClick={() => insertOrEditEntry('update', dispatch)}>
              Edit
            </button>
          )}
          <button
            onClick={() => dispatch({ type: 'modalShown', data: undefined })}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}

export default EntryModal;
