'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var Cinema = require('./model/cinemas');
var secrets = require('./secrets');
var axios = require('axios');

var app = express();

var port = process.env.PORT || 3001;

var mongoDB = secrets.requestSecret('db_uri');
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.route('/api/comments')
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

app.route('/api/comments/:comment_id')
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

app.route('/api/fetch-new-films')
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

app.route('/api/cinemas')
    .get(function(req, res) {
        Cinema.find({}, function(err, cinemas) {
            if (err) { res.status(402).send(err); }
            res.json(cinemas)
        });
    });

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});