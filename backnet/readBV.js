//start Timer
console.time('startRequest');
var bacnet = require('bacstack');

// Initialize BACStack
var client = new bacnet();

client.readProperty(
    '192.168.0.222',//IP device
    5,//5 = Binary Value
    11,// BV number 11 means BO-2
    85,// propertyId???????????
    null,
    function(err, value) {
    console.log('readPropertyBV: ', value);
    console.timeEnd('startRequest');
});
//client.close();