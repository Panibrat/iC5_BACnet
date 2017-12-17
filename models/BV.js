var mongoose = require('mongoose');

var BVSchema = mongoose.Schema({
  title: String,
  description: String,
  value: Boolean
});

var BVs = mongoose.model('Binary_Values', BVSchema);
module.exports = BVs;