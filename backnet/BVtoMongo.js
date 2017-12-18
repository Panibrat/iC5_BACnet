//---->>> UPDATE AVS <<<------


const bvToMongo = function (bv, model) {
    var query = { title: 'BV' + bv.itemInstance };
    var update = {
        '$set': {
            value: bv.itemValue
        }
    };
    // When true returns the updated document
    var options = {
        new: true
    };
    model.findOneAndUpdate(query, update, options, function(err) {
        if (err) {
            throw err;
        }
       // console.log(` ${query.title} updeted to value: ${bv.itemValue}`)
    })
};

module.exports = bvToMongo;