'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    name: String,
    surname: String,
    nickname: String,
    email: String,
    password: String,
    rank: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema);