//---->>> UPDATE AVS <<<------
const avToMongo = function (av, model) {   
    var query = { title: av.title };
    var update = {
        '$set': {
            value: av.value
        }
    };
    // When true returns the updated document
    var options = {
        new: true
    };
    model.findOneAndUpdate(query, update, options, function(err,res) {
        if (err) {
            throw err;
        }
        //console.log(` ${query.title} updeted to value: ${av.itemValue}`)        
        console.log(` mongo Responce: ${res}`)
        console.log('AV update emmit for Socket IO !!!');
        
    })
};

module.exports = avToMongo;