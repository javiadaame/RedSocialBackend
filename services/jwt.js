'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../config.json');

exports.createToken = function(user){
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        rank: user.rank,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret); // With the secret key assigned in config.json generate a token
};