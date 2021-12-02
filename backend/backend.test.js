const JSONDATA = require('./data');
const { searchAllArray } = require('./routes/search');
const { inserts } = require('./routes/insert');
const { updates } = require('./routes/update');
const { deletes } = require('./routes/delete');

// mocks
// res in a express.js (data, res) route handler
let server_resp;
const res_mock = {
  send: (msg) => server_resp = msg
}

// test to see if we can load our parsed data
test('data loaded', () => {
  console.log(`Loaded ${JSONDATA.length} entries.`);
  expect(JSONDATA.length).toBeGreaterThan(1);
});

// test to see if our search/filter endpoint works
test('filter', () => {
  const query = ['Registration State==NY', 'Violation Code>35'];
  const filtered = searchAllArray(query, JSONDATA);
  for (const row of filtered) {
    expect(row['Registration State']).toBe('NY');
    expect(row['Violation Code']).toBeGreaterThan(35);
  }
});

test('insert', () => {
  const data = {
    'Summons Number': 'TEST_SUMMS_NUM',
    'Plate ID': 'A',
    'Registration State': 'B',
    'Issue Date': 'C',
    'Violation Time': 'D',
    'Violation Code': 1,
    'Vehicle Make': 'E',
    'Vehicle Body Type': 'F',
    'Vehicle Year': 'G',
    'Street Name': 'H',
    'County County': 'I',
    'Violation County': 'J'
  };

  inserts(data, res_mock);
  expect(server_resp).toBe('Data added to database');
  expect(JSONDATA.at(-1)).toEqual(data);

  // now inserting the same value (duplicate Plate ID) should fail
  const oldLength = JSONDATA.length;
  inserts(data, res_mock);
  expect(server_resp).toBe('Summons Number already exist');
  expect(JSONDATA.length).toBe(oldLength);
});

// make sure tests are being run with '--runInBand' or '-i'
// to force them to be sequential (so we insert before doing any modifications)
test('update', () => {
  const req = {
    params: {
      sumNum: 'TEST_SUMMS_NUM',
      plateID: 'NEW_PLATE_ID',
      regState: 'NEW_REG_STATE',
      issDate: 'NEW_ISS_DATE',
      vioTime: 'NEW_VIOLATION_TIME',
      vioCode: 2,
      vehMake: 'NEW_VEH_MAKE',
      vehBody: 'NEW_VEH_BODY',
      vehYear: 'NEW_VEH_YEAR',
      street: 'NEW_STREET',
      cCounty: 'NEW_C_COUNTY',
      vCounty: 'NEW_V_COUNTY'
    }
  }

  const oldLength = JSONDATA.length;
  updates(req, res_mock);
  expect(server_resp).toBe('Data has been updated');
  expect(JSONDATA.length).toBe(oldLength);

  const updatedEntry = JSONDATA.find(x => x['Summons Number'] == req.params.sumNum);
  expect(updatedEntry['Plate ID']).toBe('NEW_PLATE_ID');
  expect(updatedEntry['Street Name']).toBe('NEW_STREET');

  const nonexistant_req = {
    params: {
      sumNum: 'NON_EXISTANT_ID'
    }
  };
  updates(nonexistant_req, res_mock);
  expect(server_resp).toBe('Summons Number does not exist');
  expect(JSONDATA.length).toBe(oldLength);
});

test('delete', () => {
  const req = {
    params: {
      sumNum: 'TEST_SUMMS_NUM'
    }
  };
  let oldLength = JSONDATA.length;
  deletes(req, res_mock);
  expect(server_resp).toBe(`${req.params.sumNum} has been deleted`);
  expect(JSONDATA.length).toBe(oldLength - 1);

  // duplicate deletes should not do anything
  oldLength = JSONDATA.length;
  deletes(req, res_mock);
  expect(server_resp).toBe(`${req.params.sumNum} does not exist`);
  expect(JSONDATA.length).toBe(oldLength);
})


