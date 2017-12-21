const writeBV = (client, IP, bv, bacnet) => {
    return new Promise((resolve, reject) => {

        const pointNumber = parseInt(bv.title.substring(2));
        const valueToSave = bv.value;
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
               
                if(err) { 
                    console.log('writePropertyError: ', err); 
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);    
                    resolve(bv);  
                }
            });

    });
};
module.exports = writeBV;