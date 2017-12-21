//BACnet
const bacnet = require('bacstack');
// Initialize BACStack
const client = new bacnet();
const IP = '192.168.0.222';

//const readAV = require('./backnet/readAVpromise'); // use with iC5
//const readBV = require('./backnet/readBVpromise'); // use with iC5
//const writeBV = require('./backnet/writeBVpromise'); // use with iC5

const readAV = require('./backnet/readAVfromJSON'); // use without iC5
const readBV = require('./backnet/readBVfromJSON'); // use without iC5
const writeBV = require('./backnet/writeBVtoJSON'); // use without iC5


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
const socketIO = require('socket.io');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// APIs
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/iC5');

///WWW
var debug = require('debug')('ic5:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);


//SOCKET IO
const io = socketIO(server);

const dataToSend = {title: 'AV101010', value: 777};

io.on('connection', (socketClient) => {
  //socketClient.emit('newAV', dataToSend);  
  //socketClient.emit('newBV');
  console.log('New User connected');
});

const clientsIO = io.sockets.clients();


server.listen(port);
console.log('Server is runnnning on port ', port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
///END WWW

//BACnet LOOOP
var buffer = [];

var loopBACnet = setInterval(() => {
    for(let i=0; i<10; i++) {
      readAV(client, IP, i)
      .then((result) => isChangedAV(result))
      .then((av) => {
          avToMongo(av, AVs, clientsIO);
      })
      .catch((e) => e );
  }
  for(let i=0; i<10; i++) {
      readBV(client, IP, i)
      .then((result) => isChangedBV(result))
      .then((bv) => {bvToMongo(bv, BVs, clientsIO)})
      .catch((e) => e );
  }    
  //console.log('buffer:\n', buffer);
}, 50);



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

//---->>> UPDATE BV <<<------
app.put('/bv/:_id', function(req, res) {
  var bv = req.body;  
  console.log("QUERY:\n", bv);
  // if the field doesn't exist $set will set  a new field
  writeBV(client, IP, bv, bacnet)
  .then((result) => {
    res.json(result);
  })
  .catch((e)=>{
    console.log('Error when writing BV to Controller', e);    
  }); 

})


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
      } else if (Math.abs(buffer[index].value - point.value ) > 0.05) {
          buffer[index].value = point.value;
          //console.log('AV update emmit for Socket IO !!!');
          
          resolve(point);
          }         
      //reject('AV data not changed!!!');
      reject();
  })    
};
//////////////////////////////
