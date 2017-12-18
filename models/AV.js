var mongoose = require('mongoose');

var AVSchema = mongoose.Schema({
  title: String,
  description: String,
  status: String,
  units: String,
  value: Number,
  readOnly: Boolean
});

var AVs = mongoose.model('Analog_Values', AVSchema);
module.exports = AVs;

