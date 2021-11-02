const router = require('express').Router();
const JSONDATA = require('../data.js');

router.route('/data/violationspercounty').get((req, res) => {
    const allCounty = new Map();
    const result = [];
    let total = 0;
    for(let i = 0; i < JSONDATA.length; i++){
        let county = JSONDATA[i]['Violation County'];
        if(county.length != 0){
            if(allCounty.has(county)) {
                allCounty.set(county,allCounty.get(county)+1);
            } else {
                allCounty.set(county, 1);
            }
            total += 1;
        }
    }

    const iterator1 = allCounty[Symbol.iterator]();
    let other = {County: 'other', Violations: 0, Percentage: 0.0};
    for(const item of iterator1){
        if((parseFloat(item[1])/total).toFixed(2) <= 0.01){
            other.Violations += item[1];
        } else {
            let line = {County : item[0], Violations: item[1], Percentage: (item[1]/total).toFixed(2)};
            result.push(line);
        }
    }
    other.Percentage = (other.Violations/total).toFixed(2);
    result.push(other);
    
    res.send(result);
});

module.exports = router;