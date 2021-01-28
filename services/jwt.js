'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "norobesclavessecretaspls";
const secretStaff = "norobesx2pls";

exports.createToken = function(user){
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        group: user.group,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret); // With the secret key assigned in config.json generate a token
};


exports.createAdminToken = function(user){
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        group: user.group,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secretStaff); // With the secret key assigned in config.json generate a token
};