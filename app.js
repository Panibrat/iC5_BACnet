//BACnet
const bacnet = require('bacstack');
// Initialize BACStack
const client = new bacnet();
const IP = '192.168.0.222';

const readAV = require('./backnet/readAVpromise'); // use with iC5
const readBV = require('./backnet/readBVpromise'); // use with iC5
const writeBV = require('./backnet/writeBVpromise'); // use with iC5
const writeAV = require('./backnet/writeAVpromise'); // use with iC5

//const readAV = require('./backnet/readAVfromJSON'); // use without iC5
//const readBV = require('./backnet/readBVfromJSON'); // use without iC5
//const writeBV = require('./backnet/writeBVtoJSON'); // use without iC5
//const writeAV = require('./backnet/writeAVtoJSON'); // use without iC5


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

    socketClient.on('pointsUpdate', () => {
        //UPDATE BUFFER!!!
        console.log('UPDATE BUFFER!!!');
        getAVPointArray().then((avs) => covertAVforLoop(avs)).then((converted) => pointsAV = converted)
            .catch((err) => {console.log(err)});

        getBVPointArray().then((bvs) => covertBVforLoop(bvs)).then((converted) => pointsBV = converted)
            .catch((err) => {console.log(err)});

        buffer = [];    
        });        

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


//////GET AV + BV POINTS
var pointsAV = [];
var pointsBV = [];

const getAVPointArray = function () {
    return new Promise((resolve, reject) => {
        AVs.find(function(err, avs) {
            if (err) {
                reject(err);
            }
            resolve(avs);
        });
    })
};
const getBVPointArray = function () {
    return new Promise((resolve, reject) => {
        BVs.find(function(err, bvs) {
            if (err) {
                reject(err);
            }
            resolve(bvs);
        });
    })
};
getAVPointArray().then((avs) => covertAVforLoop(avs)).then((converted) => pointsAV = converted)
    .catch((err) => {console.log(err)});

getBVPointArray().then((bvs) => covertBVforLoop(bvs)).then((converted) => pointsBV = converted)
    .catch((err) => {console.log(err)});    

const covertAVforLoop = (dbResult) => {
  const hasTitleArray = dbResult.filter((item) => {return item.title});
  const pointsAVArray = hasTitleArray.map((item) => {
      if(item.title.slice(0,2) == 'AV') {
          return Number(item.title.slice(2));
      }
      return;
  });    
  const uniquePointsArray = pointsAVArray.filter((number, index, array) => {
      return array.indexOf(number) === index;
  });
  return uniquePointsArray;
};

const covertBVforLoop = (dbResult) => {
  const hasTitleArray = dbResult.filter((item) => {return item.title});
  const pointsBVArray = hasTitleArray.map((item) => {
      if(item.title.slice(0,2) == 'BV') {
          return Number(item.title.slice(2));
      }
      return;
  });    
  const uniquePointsArray = pointsBVArray.filter((number, index, array) => {
      return array.indexOf(number) === index;
  });
  return uniquePointsArray;
};

//////END GET AV POINTS



var loopBACnet = setInterval(() => {
    pointsAV.forEach((pointNumber) => {
        readAV(client, IP, pointNumber)
            .then((result) => isChangedAV(result))
            .then((av) => {
                avToMongo(av, AVs, clientsIO);
            })
            .catch((e) => e );
    });
    pointsBV.forEach((pointNumber) => {
        readBV(client, IP, pointNumber)
            .then((result) => isChangedBV(result))
            .then((bv) => {
                bvToMongo(bv, BVs, clientsIO);
            })
            .catch((e) => e );
    });

  //console.log('buffer:\n', buffer);
  //console.log('pointsBV:\n', pointsBV);
 //console.log('pointsAV:\n', pointsAV);
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
  console.log("BV QUERY:\n", bv);
  
  writeBV(client, IP, bv, bacnet)
  .then((result) => {
    res.json(result);
  })
  .catch((e)=>{
    console.log('Error when writing BV to Controller', e);    
  }); 

})

//---->>> UPDATE AV <<<------
app.put('/av/:_id', function(req, res) {
  var av = req.body;  
  console.log("AV QUERY:\n", av);
  
  writeAV(client, IP, av, bacnet)
  .then((result) => {
    res.json(result);
  })
  .catch((e)=>{
    console.log('Error when writing AV to Controller', e);    
  }); 

});
app.post('/postav', function(req, res) {
    var av = req.body;
    AVs.create(av, function(err,avs) {
        if (err) {
            throw err;
        }
        res.json(avs);
        //console.log('\nPOST book\n');
    })
});
app.post('/postbv', function(req, res) {
  var bv = req.body;
  BVs.create(bv, function(err,bvs) {
      if (err) {
          throw err;
      }
      res.json(bvs);
      //console.log('\nPOST book\n');
  })
});
app.delete('/av/:title', function(req, res) {
    console.log('\nDELETE AV\n');
    var query = {title: req.params.title};
    AVs.remove(query, function(err, deletedAV) {
      if (err) {
        throw err;
      }
      res.json(deletedAV)
    })
});

app.delete('/bv/:title', function(req, res) {
    console.log('\nDELETE BV\n');
    var query = {title: req.params.title};
    BVs.remove(query, function(err, deletedBV) {
      if (err) {
        throw err;
      }
      res.json(deletedBV)
    })
});


// END APIs


app.get('/cast', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'chromecast', 'chromehellotext.html'))
});

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
