'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
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

router.route('/comments')
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            res.json(comments)
        });
    })
    .post(function(req, res) {
        var comment = new Comment();
        (req.body.author) ? comment.author = req.body.author : null;
        (req.body.text) ? comment.text = req.body.text : null;

        comment.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully added!' });
        });
    });

router.route('/comments/:comment_id')
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            (req.body.author) ? comment.author = req.body.author : null;
            (req.body.text) ? comment.text = req.body.text : null;
            comment.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    .delete(function(req, res) {
        Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' });
        })
    });

router.route('/fetch-new-cinemas')
    .get(function(req, res) {
        axios.get(`http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=${process.env.API_KEY}&size=10&date=2018-05-06&detalization=FULL`)
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
      axios.get('http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=pol1kh111&size=2000&detalization=FULL')
      .then(function(data) {
    
        var films = data.data.films.map(function (item) {
        
          return {
           "id": item.id,
           "title": item.title,
           "title_orig": item.title_orig,
           "premiere_ukraine": item.premiere_ukraine,
           "premiere_world": item.premiere_world,
           "duration": item.duration,
           "year": item.year ,
           "age_limit": item.age_limit ,
           "rating": item.rating ,
           "votes": item.votes ,
           "tmdb_rating": item.tmdb_rating ,
           "tmdb_votes": item.tmdb_votes ,
           "imdb_id": item.imdb_id,
           "total_shows": item.total_shows ,
           "url": item.url,
           "studio_ids": item.studio_ids.map(item => item),
           "country_ids": item.country_ids.map(item => item),
           "genre_ids": item.genre_ids.map(item => item),
         };
       });
    
        Films.insertMany(films, function (err, data) {
          if (err) {res.status(402).end()};
          res.send('success');
        });
      });
    });
    router.route('/films')
    .get(function(req, res) {
        Films.find({}, function(err, item) {
            if (err) { res.status(402).send(err); }
            res.json(item)
        });
    });

    router.route('/fetch-new-img')
    .get(function(req, res) {
      axios.get('http://localhost:3001/api/films')
      .then(function(data) {
    data.data.map(item => {
        axios.get(`http://kino-teatr.ua:8081/services/api/film/${item.id}/poster?apiKey=pol1kh111&width=600&height=800&ratio=1`, { responseType: 'arraybuffer' })
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
    router.route('/fetch-cinemas-sessions')
    .get(function(req, res) {
      axios.get('http://localhost:3001/api/cinemas')
      .then(function(data) {
    data.data.map(item => {
        axios.get(`http://kino-teatr.ua:8081/services/api/cinema/${item.id}/shows?apiKey=pol1kh111&size=2000&detalization=FULL`)
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
      axios.get('http://kino-teatr.ua:8081/services/api/city/9/shows?apiKey=pol1kh111&size=1000&detalization=FULL')
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

router.route('/cinemas')
    .get(function (req, res) {
        Cinema.find({}, function (err, cinemas) {
            if (err) { res.status(402).send(err); }
            res.json(cinemas)
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


