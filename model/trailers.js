'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrailerSchema = new Schema({
  "id": Number,
  "trailer": String
});

module.exports = mongoose.model('Trailer', TrailerSchema);