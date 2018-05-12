'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CinemasSchema = new Schema({
    "id": Number,
    "city_id": Number,
    "name": String,
    "address": String
});

module.exports = mongoose.model('Cinema', CinemasSchema);
