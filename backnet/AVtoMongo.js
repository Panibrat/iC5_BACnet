//---->>> UPDATE AVS <<<------


const avToMongo = function (av, model) {
    var query = { title: 'AV' + av.itemInstance };
    var update = {
        '$set': {
            value: av.itemValue
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
        console.log(` ${query.title} updeted to value: ${av.itemValue}`)
    })
};

module.exports = avToMongo;