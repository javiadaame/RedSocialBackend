'use strict'

const bcrypt = require('bcrypt-nodejs');
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

        user.name = params.name;
        user.surname = params.surname;
        user.nickname = params.nickname;
        user.email = params.email;
        user.rank = 'RANK_USER';
        user.image = null;

        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            
            user.save((err, userRegistered) => {
                if(err){ return res.status(500).send({message: 'Error to register the user.'})};

                if(userRegistered){
                    res.status(200).send({user: userRegistered});
                }else{
                    res.status(404).send({message: 'Error'})
                }
            });
        });
    }else{
        res.status(200).send({message: 'Error: Missing fields'});
    }
}

module.exports = { test, registerUser }