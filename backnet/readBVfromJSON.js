const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, './jsonDB/BV');

const readBVfromJSON = (client, IP, pointNumber) => {
    return new Promise((resolve, reject) => {
        const pass = jsonPath + pointNumber + '.json';        
        const item = JSON.parse(fs.readFileSync(pass, 'utf8'));
        resolve(
            { 
                title: 'BV' + pointNumber,
                value: item.value
             }
            );
        reject(err);
    } );
};

module.exports = readBVfromJSON;