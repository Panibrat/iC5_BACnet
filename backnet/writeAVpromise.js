const writeAV = (client, IP, av, bacnet) => {
    return new Promise((resolve, reject) => {

        const pointNumber = parseInt(av.title.substring(2));
        const valueToSave = av.value;
        client.writeProperty(
            '192.168.0.222', //IP device
            2, // 2 = Analog Value
            pointNumber, // AV number 10
            85, // propertyId???????????
            16, // priority 16
            [
                {
                   // type: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED,
                    type: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_REAL,
                    value: valueToSave} ], // value to write!!!!
            function(err, value) { // NOTE: type changed to correct value

                if(err) {
                    console.log('writePropertyError: ', err);
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);
                    resolve(av);
                }
            });

    });
};
module.exports = writeAV;
/*
const writeAV = (client, IP, av, bacnet) => {
    return new Promise((resolve, reject) => {

        const pointNumber = parseInt(av.title.substring(2));
        const valueToSave = av.value;
        client.writeProperty(
            IP, //IP device
            2, // 2 = Analog Value
            pointNumber, // AV number 10
            85, // propertyId???????????
            15, // priority 16
            [
                {
                    type: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED,
                    value: valueToSave} ], // value to write!!!!
            function(err, value) { // NOTE: type changed to correct value
               
                if(err) { 
                    console.log('writePropertyError: ', err); 
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);    
                    resolve(av);  
                }
            });

    });
};
module.exports = writeAV;*/