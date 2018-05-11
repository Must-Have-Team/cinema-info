'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmsSchema = new Schema({
  "id": Number,
  "title": String,
  "title_orig": String,
  "premiere_ukraine": String,
  "premiere_world": String,
  "duration": Number,
  "year": Number,
  "age_limit": Number,
  "rating": Number,
  "votes": Number,
  "tmdb_rating": Number,
  "tmdb_votes": Number,
  "imdb_id": String,
  "total_shows": Number,
  "url": String,
  "description" : String,
  "studios": [{
    "id": Number,
    "name": String
  }],
  "countries": [{
    "id": Number,
    "name": String
  }],
  "genres": [{
    "id": Number,
    "name": String
  }]
});

module.exports = mongoose.model('Films', FilmsSchema);
