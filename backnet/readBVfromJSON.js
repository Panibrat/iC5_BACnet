const fs = require('fs');

const readBVfromJSON = (client, IP, pointNumber) => {
    return new Promise((resolve, reject) => {
        const pass = '../jsonDB/BV' + pointNumber + '.json';        
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