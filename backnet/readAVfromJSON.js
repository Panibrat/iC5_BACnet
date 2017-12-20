const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, './jsonDB/AV');

const readAVfromJSON = (client, IP, pointNumber) => {   
    return new Promise((resolve, reject) => {
        const pass = jsonPath + pointNumber + '.json';         
        const item = JSON.parse(fs.readFileSync(pass, 'utf8'));       
        resolve(
            { 
                title: 'AV' + pointNumber,
                value: item.value
             }
            );
        reject(err);
    } );
};

module.exports = readAVfromJSON;