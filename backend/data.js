const fs = require('fs');
const path = require('path');
const process = require('process');
const { spawnSync } = require('child_process');

const FILE_PATH = path.join(__dirname, 'parsed_data');
const FILES_TO_LOAD = 1;

let JSONDATA = undefined;

try {
  console.log('checking if file exists');
  fs.accessSync(`${FILE_PATH}/data1.json`, fs.constants.R_OK);
} catch (err) {
  console.log('file does not exist, generating files...');
  spawnSync('python3', ['./functions/main.py']);
  // fail loudly if python code didn't generate parsed data
  fs.accessSync(`${FILE_PATH}/data1.json`, fs.constants.R_OK);
}

for (let i = 1; i < FILES_TO_LOAD + 1; i++) {
  console.log(`Loading file ${i}`);
  const contents = require(`${FILE_PATH}/data${i}.json`);
  if (JSONDATA) {
    JSONDATA = JSONDATA.concat(contents);
  } else {
    JSONDATA = contents;
  }
}

process.on('SIGINT', () => {
  console.log('Got kill signal. Backing up all data...');
  const EntriesPerFile = 1200000;

  for (
    let i = 0, files = 1;
    i < JSONDATA.length;
    i += EntriesPerFile, files++
  ) {
    if (i + EntriesPerFile < JSONDATA.length) {
      console.log(i);
      let data = JSON.stringify(JSONDATA.slice(i, i + EntriesPerFile), null, 4);
      fs.writeFileSync('../parsed_data/data' + files + '.json', data, (err) => {
        if (err) throw err;
        else console.log('wrote file data' + files + '.json');
      });
    } else {
      console.log('last');
      let data = JSON.stringify(JSONDATA.slice(i, JSONDATA.length), null, 4);
      fs.writeFileSync('../parsed_data/data' + files + '.json', data, (err) => {
        if (err) throw err;
        else console.log('wrote file data' + files + '.json');
      });
    }
  }

  console.log('Finished backing up data');
  process.exit();
});

module.exports = JSONDATA;
