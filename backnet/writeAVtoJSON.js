const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, './jsonDB/AV');

const writeAV = (client, IP, av, bacnet) => {
    return new Promise((resolve, reject) => {

        const pointNumber = parseInt(av.title.substring(2));
        const valueToSave = av.value;
        const pass = jsonPath + pointNumber + '.json';
        const avJSON = JSON.stringify(av);

        fs.writeFile( pass, avJSON, function (err) {
            if(err) { 
                console.log('writePropertyError: ', err); 
                reject(err);
            } else {
                   
                resolve(av);  
            } 
            
          });
    });
};
module.exports = writeAV;