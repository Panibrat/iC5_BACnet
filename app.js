//BACnet
var bacnet = require('bacstack');
// Initialize BACStack
var client = new bacnet();
const IP = '192.168.0.222';

// const writeBV = (client, IP, pointNumber, valueToSave) => {
const readAV = require('./backnet/readAVpromise');
const writeBV = require('./backnet/writeBVpromise');
const readBV = require('./backnet/readBVpromise');
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


const state = [];

// APIs
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/iC5');


//BACnet LOOOP
var loopBACnet = setInterval(() => {
     readAV(client, IP, 0).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 1).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 2).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 3).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 4).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 5).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 6).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 7).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 8).then((result) => avToMongo(result, AVs));
    // readAV(client, IP, 9).then((result) => avToMongo(result, AVs));

    // readBV(client, IP, 0).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 1).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 2).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 3).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 4).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 5).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 6).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 7).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 8).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 9).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 10).then((result) => bvToMongo(result, BVs));
    // readBV(client, IP, 11).then((result) => bvToMongo(result, BVs));

}, 1000);

//readAV(client, IP, 1);

//----->>>> GET AVS <<<---------
app.get('/av', function(req, res) {
  console.log('GET AV');
  
    AVs.find(function(err, avs) {
        if (err) {
            throw err;
        }
        res.json(avs)
    })
});

//----->>>> GET BVS <<<---------
app.get('/bv', function(req, res) {
  console.log('GET BV');
    BVs.find(function(err, bvs) {
        if (err) {
            throw err;
        }
        res.json(bvs)
    })
});







//---->>> UPDATE BOOKS <<<------
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



//

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

// END APIs






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
module.exports = app;
