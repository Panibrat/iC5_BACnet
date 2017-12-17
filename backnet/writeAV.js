//start Timer
console.time('startRequest');
var bacnet = require('bacstack');

// Initialize BACStack
var client = new bacnet();

var sHumFor = 77;

//AV WRITE
client.writeProperty(
    '192.168.0.222', //IP device
    2, // 2 = Analog Value
    8, // AO number 8
    85, // propertyId???????????
    16, // priority 16
    [
    {
        tag: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_REAL, // constant?????????
        value: sHumFor}                                                     // value to write!!!!
], function(err, value) { // NOTE: `type` changed to `tag`
    //console.log('writeProperty: ', value);
    if (err) {
        console.log('writePropertyError: ', err);
    } else {
        console.log('writed value success: ',value );
        console.timeEnd('startRequest');
    }
});
//client.close();