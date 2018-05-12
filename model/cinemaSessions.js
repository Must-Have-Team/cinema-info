'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CinemaSessionSchema = new Schema({
  "id": Number,
  "begin": String,
  "end": String,
  "film_id": Number,
  "hall_id": Number,
  "times": [{
    "id": Number,
    "time": String,
    "prices": String,
    "3d": Boolean,
    "purchase_allowed": Boolean
  }]
});

module.exports = mongoose.model('CinemaSession', CinemaSessionSchema);