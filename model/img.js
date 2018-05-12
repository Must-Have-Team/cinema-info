'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImgSchema = new Schema({
  "id": Number,
  "dataUrl": String
});

module.exports = mongoose.model('Img', ImgSchema);