var readAV = (client, IP, pointNumber) => {
    return new Promise((resolve, reject) => {
        client.readProperty(
            IP,//IP device
            2, // 2 = Analog Value
            pointNumber,// AO number 0 mens AI-1
            85,// propertyId???????????
            null,
            function(err, value) {
                try {
                    const itemValue = value.valueList[0].value.toFixed(1);
                    const itemInstance = value.objectId.instance;
                    resolve({ 
                        title: 'AV' + pointNumber,
                        value: itemValue
                        }
                    );
                } catch (error) {
                    console.log('ERRRRROR CATCH: ', error);
                    itemValue = 99;
                    resolve({ 
                        title: 'AV' + pointNumber,
                        value: itemValue
                        });
                }
                reject(err);
            });
    } );
};

module.exports = readAV;