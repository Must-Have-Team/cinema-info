'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HallsSchema = new Schema({
  "id": Number,
  "name": String,
  "cinema_id": Number,
  "3d": Boolean 
});

module.exports = mongoose.model('Halls', HallsSchema);