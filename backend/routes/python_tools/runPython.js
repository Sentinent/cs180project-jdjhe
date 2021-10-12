let runPy = new Promise(function(success, nosuccess) {
    const {spawn} = require('child_process');
    const pyprog = spawn('python3', ['../../pycode/test.py']);

    pyprog.stdout.on('data', function(data) {
        success(data);
    });

    pyprog.stderr.on('data',(data) => {
        nosuccess(data);
    });
    console.log("ran python caller code");
}).catch(err => console.log(err));

module.exports = {runPy};