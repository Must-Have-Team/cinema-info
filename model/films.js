'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmsSchema = new Schema ({
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
  "description": String,
  "studio_ids": [
    Number
  ],
  "country_ids": [
    Number
  ],
  "genre_ids": [Number]

})

module.exports = mongoose.model('Films', FilmsSchema);