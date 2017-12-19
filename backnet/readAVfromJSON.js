const fs = require('fs');

const readAVfromJSON = (client, IP, pointNumber) => {
    return new Promise((resolve, reject) => {
        const pass = '../jsonDB/AV' + pointNumber + '.json';        
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