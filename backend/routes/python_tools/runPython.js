let response = "No Response";

let runPy = new Promise(function(success, nosuccess) {
    const {spawn} = require('child_process');

    let testObject = {
        first: "f",
        second: "s"
    }

    let pyprog = spawn('python3', ['../../functions/test.py']);

    let jjjson;
    pyprog.stdout.on('data', function(data) {
        console.log("one")
        const msg = String.fromCharCode.apply(null,data);
        jjjson = JSON.parse(msg);
        console.log(jjjson);
        response = jjjson;
        success(data);
    }); 

    pyprog.on('close', (msg) => {
        console.log("closing py: ${code}");
        console.log("jjjson: " + jjjson);
    });

    pyprog.stderr.on('data',(data) => {
        nosuccess(data);
    });
}).catch(err => console.log(err));

module.exports = {runPy, response};