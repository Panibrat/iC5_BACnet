var readBV = (client, IP, pointNumber) => {
    return new Promise((resolve, reject) => {
        client.readProperty(
            IP,//IP device
            5,//5 = Binary Value
            pointNumber,// AO number 0 mens AI-1
            85,// propertyId???????????
            null,
            function(err, value) {
                try {
                    const itemValue = value.valueList[0].value;
                    const itemInstance = value.objectId.instance;
                    resolve({ itemValue, itemInstance });
                } catch (error) {
                    console.log('ERRRRROR CATCH: ', error);
                    itemValue = undefined;
                    resolve(itemValue);
                }
                reject(err);
            });
    } );
};

module.exports = readBV;

