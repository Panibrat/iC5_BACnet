var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iC5');

var AVs = require('../models/AV.js');
var BVs = require('../models/BV.js');

for (var i=0; i<10; i++) {
    const newAV = {
        title: 'AV' + i,
        description: '',
        status: 'norm',
        units: 'deg C',
        value: 99
    };
    AVs.create(newAV, function(err, av) {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE AV\n', av);
    });
}

for (var i=0; i<12; i++) {
    const newBV = {
        title: 'BV' + i,
        description: '',
        //value: undefined
        value: false
    };
    BVs.create(newBV, function(err, av) {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE BV\n', av);
    });
}
