'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Load routes
var user_routes = require('../routes/user');
var post_routes = require('../routes/post');

// Middlewares
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

// Cors

// Routes
app.get('/', (req, res) => {
    res.status(200).send({message: 'Abc'});
});

app.use('/user', user_routes);
app.use('/post', post_routes);

// Export

module.exports = app;