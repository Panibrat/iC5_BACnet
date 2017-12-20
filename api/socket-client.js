import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:3000');

export function subscribeToData(cb) {
  socket.on('newAV', (data) => {
      console.log('newAV:::', data);
      cb();
    });
  socket.emit('subscribeToData');
}
//export { subscribeToData };

  