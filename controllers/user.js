'use strict'

var User = require('../models/user');

function test(req, res){
    res.status(200).send({
        message: 'Aa'
    });
}

function registerUser(req, res){
    const params = req.body;
    const user = new User();

    if(params.name && params.surname && params.nickname && params.password && params.email){

    }
}

module.exports = { test }