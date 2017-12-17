var readAV = (client, IP, pointNumber) => {
    console.time('startRequest');
    var itemValue = 99;
    client.readProperty(
        IP,//IP device
        2, // 2 = Analog Value
        pointNumber,// AO number 0 mens AI-1
        85,// propertyId???????????
        null,
        function(err, value) {
            try {
                itemValue = value.valueList[0].value;
                console.log('itemValue', itemValue);
                console.timeEnd('startRequest');
            } catch (error) {
                console.log('ERRRRROR CATCH: ', error);
                }
        });

    return itemValue;
};

module.exports = readAV;

