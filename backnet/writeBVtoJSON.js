const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, './jsonDB/BV');

const writeBV = (client, IP, bv, bacnet) => {
    return new Promise((resolve, reject) => {

        const pointNumber = parseInt(bv.title.substring(2));
        const valueToSave = bv.value;
        const pass = jsonPath + pointNumber + '.json';
        const bvJSON = JSON.stringify(bv);

        fs.writeFile( pass, bvJSON, function (err) {
            if(err) { 
                console.log('writePropertyError: ', err); 
                reject(err);
            } else {
                   
                resolve(bv);  
            } 
            
          });
    });
};
module.exports = writeBV;