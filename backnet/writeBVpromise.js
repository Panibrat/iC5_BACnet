const writeBV = (client, IP, pointNumber, valueToSave, bacnet) => {
    return new Promise((resolve, reject) => {
        client.writeProperty(
            IP, //IP device
            5,  //5 = Binary Value
            pointNumber, // BV number 10
            85, // propertyId???????????
            16, // priority 16
            [
                {
                    tag: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED,
                    value: valueToSave} ], // value to write!!!!
            function(err, value) { // NOTE: type changed to correct value
                console.log('writeProperty: ', value);
                if(err) { console.log('writePropertyError: ', err); }
            });

    });
};
module.exports = writeBV;