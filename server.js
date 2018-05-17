'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cinema = require('./model/cinemas');
var Session = require('./model/sessions');
var Films = require('./model/films');
var secrets = require('./secrets');
var axios = require('axios');
var Films = require('./model/films');
var Img = require('./model/img')
var CinemaSession = require('./model/cinemaSessions')
var Halls = require('./model/halls')



var app = express();
var router = express.Router();

var port = process.env.PORT || 3001;

var mongoDB = secrets.requestSecret('db_uri');
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/build'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.route('/fetch-new-cinemas')
    .get(function(req, res) {
        axios.get(`http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=${process.env.API_KEY}&size=10&detalization=FULL`)
            .then(function(data) {
                console.log(data.data.cinemas);
                var cinemas = data.data.cinemas.map(function (item) {
                    return {
                        id: item.id,
                        city_id: item.city_id,
                        name: item.name,
                        address: item.address
                    };
                });

                Cinema.insertMany(cinemas, function (err, data) {
                    if (err) {res.status(402).end()};
                    res.send('success');
                });
            });
    });
  
    router.route('/fetch-new-films')
    .get(function(req, res) {
      Films.remove({}, function (err) {
        if (err) return handleError(err);
      });
      axios.get(`http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=${process.env.API_KEY}&size=2000&detalization=FULL`)
      .then(function(data) {
        data.data.films.map(function (item) {
          axios.get(`http://kino-teatr.ua:8081/services/api/film/${item.id}?apiKey=${process.env.API_KEY}`)
          .then(function(data){
            var result = {
              "id": data.data.id,
              "title": data.data.title,
              "title_orig": data.data.title_orig,
              "premiere_ukraine": data.data.premiere_ukraine,
              "premiere_world": data.data.premiere_world,
              "duration": data.data.duration,
              "year": data.data.year ,
              "age_limit": data.data.age_limit ,
              "rating": data.data.rating ,
              "votes": data.data.votes ,
              "tmdb_rating": data.data.tmdb_rating ,
              "tmdb_votes": data.data.tmdb_votes ,
              "imdb_id": data.data.imdb_id,
              "total_shows": data.data.total_shows ,
              "url": data.data.url,
              "description" : data.data.description,
              "studios": data.data.studios.map(item => item),
              "countries": data.data.countries.map(item => item),
              "genres": data.data.genres.map(item => item),
            };
            Films.insertMany(result);
          })
        });
      });
    })

    router.route('/fetch-new-img')
    .get(function(req, res) {
      Img.remove({}, function (err) {
        if (err) return handleError(err);
      });
      axios.get('https://popcorn-studio-17.herokuapp.com/api/films')
      .then(function(data) {
    data.data.map(item => {
        axios.get(`http://kino-teatr.ua:8081/services/api/film/${item.id}/poster?apiKey=${process.env.API_KEY}&width=600&height=800&ratio=1`, { responseType: 'arraybuffer' })
        .then(function(data) {
            let image = new Buffer(data.data, 'binary').toString('base64')
              let dataUrl = `data:${data.headers['content-type'].toLowerCase()};base64,${image}`;

            let base64 = {
                "id": item.id,
                "dataUrl": dataUrl
            };
            Img.insertMany(base64);
        })
    })  
      });
    });

router.route('/fetch-new-trailer')
    .get(function (req, res) {
        Trailer.remove({}, function (err) {
            if (err) return handleError(err);
        });
        axios.get('http://popcorn-studio-17.herokuapp.com/api/films')
            .then(function (data) {
                data.data.map(item => {
                    axios.get(`http://kino-teatr.ua:8081/services/api/film/${item.id}/trailers?apiKey=${process.env.API_KEY}&size=1`)
                        .then(function (data) {
                            var trailers = data.data.content.map(function (item) {
                                return {
                                    id: item.film_id,
                                    trailer: item.url
                                };
                            });

                            Trailer.insertMany(trailers)
                            });
                        })
                })
            });


    router.route('/fetch-cinemas-sessions')
    .get(function(req, res) {
      CinemaSession.remove({}, function (err) {
        if (err) return handleError(err);
      });
      axios.get('https://popcorn-studio-17.herokuapp.com/api/cinemas')
      .then(function(data) {
    data.data.map(item => {
        axios.get(`http://kino-teatr.ua:8081/services/api/cinema/${item.id}/shows?apiKey=${process.env.API_KEY}&size=2000&detalization=FULL`)
        .then(function(data) {
            console.log(data.data.content)
            var sessions = data.data.content.map(function(item) {
                return {
                    "id": item.id,
                    "begin": item.begin,
                    "end": item.end,
                    "film_id": item.film_id,
                    "hall_id": item.hall_id,
                    "times": item.times.map(item => {
                        return {
                          "id" : item.id ,
                          "time": item.time ,
                          "prices": item.prices ,
                          "purchase_allowed": item.purchase_allowed 
                        }
                      })
                }
            })
            CinemaSession.insertMany(sessions);
        })
    })  
      });
    });
    router.route('/cinema-sessions')
    .get(function(req, res) {
        CinemaSession.find({}, function(err, el) {
            if (err) { res.status(402).send(err); }
            res.json(el)
        });
    });

    router.route('/images')
    .get(function(req, res) {
        Img.find({}, function(err, el) {
            if (err) { res.status(402).send(err); }
            res.json(el)
        });
    });

    router.route('/fetch-new-session')
    .get(function(req, res) {
      Session.remove({}, function (err) {
        if (err) return handleError(err);
      });
      axios.get(`http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=${process.env.API_KEY}&size=2000&detalization=FULL`)
      .then(function(data) {
        var session = data.data.content.map(function (item) {
          return {
           "id": item.id ,
           "begin": item.begin ,
           "end": item.end ,
           "film_id": item.film_id ,
           "hall_id": item.hall_id ,
           "times": item.times.map(item => {
            return {
              "id" : item.id ,
              "time": item.time ,
              "prices": item.prices ,
              "purchase_allowed": item.purchase_allowed 
            }
          })
         };
       });
    
        Session.insertMany(session, function (err, data) {
          if (err) {res.status(402).end()};
          res.send('success');
        });
      });
    });

router.route('/fetch-new-halls')
.get(function(req, res) {
  Halls.remove({}, function (err) {
    if (err) return handleError(err);
  });
  Halls.remove({}, function (err) {
    if (err) return handleError(err);
  });
  axios.get(`http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=${process.env.API_KEY}&size=2000&detalization=FULL`)
  .then(function(data) {
    var halls = data.data.halls.map(function (item) {
      return {
       "id": item.id ,
       "name": item.name ,
       "cinema_id": item.cinema_id,
       "3d" : item['3d']
     };
   });

    Halls.insertMany(halls, function (err, data) {
      if (err) {res.status(402).end()};
      res.send('success');
    });
  });
});

router.route('/cinemas')
    .get(function(req, res) {
        Cinema.find({}, function(err, cinemas) {
            if (err) { res.status(402).send(err); }
            res.json(cinemas)
        });
    });

    router.route('/sessions')
    .get(function(req, res) {
        Session.find({}, function(err, sessions) {
            if (err) { res.status(402).send(err); }
            res.json(sessions)  
        });
    });

router.route('/films')
    .get(function (req, res) {
        Films.find({}, function (err, cinemas) {
            if (err) { res.status(402).send(err); }
            res.json(cinemas)
        });
    });
router.route('/halls')
    .get(function(req, res) {
      Halls.find({}, function(err, cinemas) {
        if (err) { res.status(402).send(err); }
        res.json(cinemas)
      });
    });

app.use('/api', router);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});


