import { Dispatch, useEffect } from 'react';
import './EntryModal.css';
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
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div
            className=""
            id="entrymodal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="summonsNum">Summons Number: </label>
              <input className="col-7" type="text" id="summonsNum"></input>
            </div>
          
            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="plateID">Plate ID: </label>
              <input className="col-7" type="text" id="plateID"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="regState">Registration State: </label>
              <input className="col-7" type="text" id="regState"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="issDate">Issue Date: </label>
              <input className="col-7" type="text" id="issDate"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="vTime">Violation Time: </label>
              <input className="col-7" type="text" id="vTime"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="vCode">Violation Code: </label>
              <input className="col-7" type="text" id="vCode"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="vehMake">Vehicle Make: </label>
              <input className="col-7" type="text" id="vehMake"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="vehBody">Vehicle Body: </label>
              <input className="col-7" type="text" id="vehBody"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="vehYear">Vehicle Year: </label>
              <input className="col-7" type="text" id="vehYear"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="street">Street Name: </label>
              <input className="col-7" type="text" id="street"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="cCounty">County County: </label>
              <input className="col-7" type="text" id="cCounty"></input>
            </div>

            <div className="container mt-3 mb-3">
              <label className="col-5" htmlFor="vCounty">Violation County: </label>
              <input className="col-7" type="text" id="vCounty"></input>
            </div>
          </div>
            <div className="modal-footer">
              <span className="modal-actions">
                {state.modalType === 'insert' && (
                  <button className="btn btn-info m-2 mb-0" onClick={() => insertOrEditEntry('insert', dispatch)}>
                    Insert
                  </button>
                )}
                {state.modalType === 'edit' && (
                  <button className="btn btn-info m-2 mb-0" onClick={() => insertOrEditEntry('update', dispatch)}>
                    Update
                  </button>
                )}
                <button type="button" className="btn btn-secondary m-2 me-0 mb-0" data-bs-dismiss="modal" aria-label="Close" >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryModal;
