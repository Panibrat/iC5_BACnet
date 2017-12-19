const readAV = require('../readAVfromJSON');
const readBV = require('../readBVfromJSON');
const AVs = require('../../models/AV')
const BVs = require('../../models/BV')
//var buffer = [{ title: 'AV1', value: 1.7 }, { title: 'BV1', value: false }];
const avToMongo = require('../AVtoMongo');
const bvToMongo = require('../BVtoMongo');
var buffer = [];

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iC5');


setInterval(() => {
    for(let i=0; i<5; i++) {
        readAV('client', 'IP', i)
        .then((result) => isChangedAV(result))
        .then((av) => {
            //console.log(av);
            avToMongo(av, AVs);
        })
        .catch((e) => e );
    }
    for(let i=0; i<5; i++) {
        readBV('client', 'IP', i)
        .then((result) => isChangedBV(result))
        .then((bv) => {bvToMongo(bv, BVs)})
        .catch((e) => e );
    }    
    //console.log('buffer:\n', buffer);
        
}, 2000);



function isChangedBV(point) {
    return new Promise((resolve, reject) => {
        const index = buffer.findIndex((stored) => {return stored.title == point.title});
        if(index === -1) {  
            buffer = [...buffer, {
                title: point.title,
                value: point.value
            }]
            //console.log('BV update emmit for Socket IO !!!');
            resolve(point);
        } else if (buffer[index].value !== point.value ) {
            buffer[index].value = point.value;
            //console.log('BV update emmit for Socket IO !!!');
            resolve(point);
            }         
        //reject('BV data not changed!!!');
        reject();
    })    
};

function isChangedAV(point) {
    return new Promise((resolve, reject) => {
        const index = buffer.findIndex((stored) => {return stored.title == point.title});
        if(index === -1) {  
            buffer = [...buffer, {
                title: point.title,
                value: point.value
            }]
            //console.log('AV update emmit for Socket IO !!!');
            resolve(point);
        } else if (Math.abs(buffer[index].value - point.value ) > 0.5) {
            buffer[index].value = point.value;
            //console.log('AV update emmit for Socket IO !!!');
            
            resolve(point);
            }         
        //reject('AV data not changed!!!');
        reject();
    })    
};
    
