//BACnet
const bacnet = require('bacstack');
// Initialize BACStack
const client = new bacnet();// use with iC5
const IP = '192.168.0.222';// use with iC5

//const readAV = require('./backnet/readAVpromise'); // use with iC5
//const readBV = require('./backnet/readBVpromise'); // use with iC5
const readAV = require('./backnet/readAVfromJSON'); // use without iC5
const readBV = require('./backnet/readBVfromJSON'); // use without iC5

const writeBV = require('./backnet/writeBVpromise');
const avToMongo = require('./backnet/AVtoMongo');
const bvToMongo = require('./backnet/BVtoMongo');
const AVs = require('./models/AV.js');
const BVs = require('./models/BV.js');



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// APIs
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/iC5');


//BACnet LOOOP
var buffer = [];

var loopBACnet = setInterval(() => {
    for(let i=0; i<5; i++) {
      readAV(client, IP, i)
      .then((result) => isChangedAV(result))
      .then((av) => {
          //console.log(av);
          avToMongo(av, AVs);
      })
      .catch((e) => e );
  }
  for(let i=0; i<5; i++) {
      readBV(client, IP, i)
      .then((result) => isChangedBV(result))
      .then((bv) => {bvToMongo(bv, BVs)})
      .catch((e) => e );
  }    
  //console.log('buffer:\n', buffer);
}, 1000);



//----->>>> GET AVS <<<---------
app.get('/av', function(req, res) {
  //console.log('GET AV');  
    AVs.find(function(err, avs) {
        if (err) {
            throw err;
        }
        res.json(avs)
    })
});

//----->>>> GET BVS <<<---------
app.get('/bv', function(req, res) {
  //console.log('GET BV');
    BVs.find(function(err, bvs) {
        if (err) {
            throw err;
        }
        res.json(bvs)
    })
});

/*
//---->>> UPDATE BVS <<<------
app.put('/bv/:_id', function(req, res) {
  var bv = req.body;
  var query = {_id: req.params._id};
  bv._id = req.params._id;
  //console.log("QUERY:\n",query);
  // if the field doesn't exist $set will set  a new field
    const pointNumber = 10;
    const valueToSave = bv.value;


//NEED TO CONVERT BACnet API save value
writeBV(client, IP, pointNumber, valueToSave, bacnet)
    .then((res) => {
        console.log('writeBV(client, IP, pointNumber, valueToSave, bacnet)\n',  res);
    })
    .catch((e) => {
        console.log('writeBV() ERROR\n', e);
    });

  var update = {
    '$set': {
      value: bv.value,
    }
  };
  // When true returns the updated document
  var options = {
    new: true
  };
  BVs.findOneAndUpdate(query, update, options, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(bv);
  })
});


*/




// END APIs


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/



//BUFFER FUNCTIONS
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
//////////////////////////////












module.exports = app;
