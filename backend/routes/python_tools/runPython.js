let runPy = new Promise(function(success, nosuccess) {
    const {spawn} = require('child_process');

    // this.state = {
    //     data: ''
    // }

    let testObject = {
        first: "f",
        second: "s"
    }

    const pyprog = spawn('python3', ['../../functions/test.py'], testObject);

    pyprog.stdout.on('data', function(data) {
        console.log("one")
        // this.setState.data = data.toString();
        success(data.toString());
    }); 

    pyprog.stderr.on('data',(data) => {
        nosuccess(data);
    });
}).catch(err => console.log(err));

module.exports = {runPy};