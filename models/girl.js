// TODO 1: import mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO 2: CREATE schema
var girlSchema = new Schema({
  name: String,
  image: String,
  yob: Number
});

// TODO 3: CREATE model

var GirlModel = mongoose.model('girl', girlSchema);

// TODO 4: Export

module.exports = GirlModel;
