//start Timer
console.time('startRequest');
var bacnet = require('bacstack');

// Initialize BACStack
var client = new bacnet();

var sStart = true;




client.writeProperty(
    '192.168.0.222', //IP device
    5,  //5 = Binary Value
    10, // BV number 10
    85, // propertyId???????????
    12, // priority 12
    [
        {
            tag: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED,
            value: sStart} ], // value to write!!!!
    function(err, value) { // NOTE: type changed to correct value
    console.log('writeProperty: ', value);
    console.timeEnd('startRequest');
    if(err) { console.log('writePropertyError: ', err); }
});
//client.close();