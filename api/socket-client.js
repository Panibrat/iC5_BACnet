import openSocket from 'socket.io-client';

const  socket = openSocket();

export function subscribeToData(cb) {
  socket.on('newAV', (data) => {
      //console.log('newAV:::', data);
      cb();
    });
  socket.on('newBV', () => {
      //console.log('newBV:::');
      cb();
    });
  socket.emit('subscribeToData');
}


  