// APIs
const mongoose = require('mongoose');
const AVs = require('../models/AV');
mongoose.connect('mongodb://localhost:27017/iC5');

const getAVPointArray = function () {
    return new Promise((resolve, reject) => {
        AVs.find(function(err, avs) {
            if (err) {
                reject(err);
            }
            //console.log(avs);
            resolve(avs);
        });
    })
};


getAVPointArray()
    .then((avs) => {
        console.log('getted from db');
        return covertAVforLoop(avs);
    })
    .then((converted) => {
        console.log('CONVERTED: ',converted);
        let bac = new BACnetLoop(converted);
        bac.loop();
        setTimeout(() => {
            clearInterval(bac.interval);
            console.log('STOPPED!!!');
        }, 10000);
    })
    .catch((err) => {console.log(err)});

const covertAVforLoop = (dbResult) => {
    return dbResult.map((item) => {
        if(item.title.slice(0,2) == 'AV') {
            return Number(item.title.slice(2));
        }
        return;
    })
};


class BACnetLoop {
    constructor(array) {
        this.array = array;

    }
    loop() {
        console.log('LOOOOOOP');
        this.interval = setInterval(() => {
            this.array.forEach((pointNumber) => {
                console.log('try Read AV' + pointNumber);
            })
        }, 500)
    }
}

/*let bac = new BACnetLoop([1,2,33]);

bac.loop();*/

//loopBACnetAV();

/*
var loopBACnet = setInterval(() => {
    for(let i=0; i<10; i++) {
        readAV(client, IP, i)
            .then((result) => isChangedAV(result))
            .then((av) => {
                avToMongo(av, AVs, clientsIO);
            })
            .catch((e) => e );
    }
    for(let i=0; i<12; i++) {
        readBV(client, IP, i)
            .then((result) => isChangedBV(result))
            .then((bv) => {bvToMongo(bv, BVs, clientsIO)})
            .catch((e) => e );
    }
}, 50);
*/
