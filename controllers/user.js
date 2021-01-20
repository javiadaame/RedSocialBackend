'use strict'

var User = require('../models/user');

function test(req, res){
    res.status(200).send({
        message: 'Aa'
    });
}

module.exports = { test }