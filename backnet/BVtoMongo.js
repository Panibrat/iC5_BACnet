//---->>> UPDATE AVS <<<------
const bvToMongo = function (bv, model) {
    var query = { title: bv.title };
    var update = {
        '$set': {
            value: bv.value
        }
    };
    // When true returns the updated document
    var options = {
        new: true
    };
    model.findOneAndUpdate(query, update, options, function(err, res) {
        if (err) {
            throw err;
        }
       // console.log(` ${query.title} updeted to value: ${bv.itemValue}`)
        console.log(` mongo Responce: ${res}`)
        console.log('BV update emmit for Socket IO !!!');
    })
};

module.exports = bvToMongo;