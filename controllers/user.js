'use strict'

const bcrypt = require('bcrypt-nodejs');
const { reset } = require('nodemon');
var User = require('../models/user');
const jwt = require('../services/jwt'); 

const mongoosePaginate = require('mongoose-pagination');


exports.home = function(req, res){
    return res.status(200).send({message: 'Home page'});
}

exports.registerUser = function(req, res){
    const params = req.body;
    const user = new User();

    if(params.name && params.surname && params.nickname && params.password && params.email){

        user.name = params.name;
        user.surname = params.surname;
        user.nickname = params.nickname;
        user.email = params.email;
        user.group = 'USER';

        // Duplicated users
        User.find({ $or: [
                {email: user.email.toLowerCase()},
                {nickname: user.nickname.toLowerCase()}
                ]}).exec((err, users) => {
                    if(err) res.status(404).send({message: 'Error'});
                
                    if(users && users.length >= 1) {
                        return res.status(200).send({message: 'The nickname or email is taked.'});
                    }else{

                        // Save data
                        bcrypt.hash(params.password, null, null, (err, hash) => {
                            user.password = hash;
                            
                            user.save((err, userRegistered) => {
                                if(err){ return res.status(500).send({message: 'Error to register the user.'})};
                
                                if(userRegistered){
                                    res.status(200).send({user: userRegistered});
                                }else{
                                    res.status(404).send({message: 'Error'});
                                }
                            });
                        });
                    }
                });

    }else{
        res.status(200).send({message: 'Error: Missing fields'});
    }
}

exports.loginUser = function(req, res){

    var params = req.body;
    
    const password = params.password;
    const email = params.email;

    User.findOne({email: email}, (err, user) => {
        if(err){ return res.status(500).send({message: 'Error'})};

        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(err){ return res.status(500).send({message: 'Error'})};

                if(check){ 
                    if(params.gettoken){
                        // Generate and Return token
                        
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        user.password = undefined; // Remove property cause is encripted
                        return res.status(200).send({user})
                    }
                };
            });
        }else{
            return res.status(500).send({message: 'Error'})
        };
    });
}

// Get specific user
exports.getUser = function(req, res){
    var userId = req.params.id; // Params for the data of url, body for the data of post and put

    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: 'Error: ' + err});

        if(!user) return res.status(404).send({message: 'Error: The user doesn´t exist'});
       
        return res.status(200).send({user});
    });
}

// Get pagination of users
exports.getUsers = function(req, res){
    var identity_user_id = req.user.sub; // Take the id of the payload function
    
    var page = 1; // The default page is 1
    if(req.params.page){ 
        page = req.params.page; // Put the page of the request on url 
    }

    var items_per_page = 5; // The users showed in 1 page

    User.find().sort('_id').paginate(page, items_per_page, (err,users, total) => {
        if(err) return res.status(500).send({message: 'Error: ' + err});

        if(!users) return res.status(404).send({message: 'Error: There aren´t users'});

        return res.status(200).send({
            users, 
            total,
            pages: Math.ceil(total/items_per_page)
        });
    });

}

exports.updateUser = function(req, res){
    var userId = req.params.id;
    var update = req.body;

    delete update.password;

    if(userId != req.user.sub){ //The user that is sended in URL must be the same that is in the authentication code
        return res.status(500).send({message: 'Error: You don´t have permission to change the user data.'});
    }

    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => { //With new:True send the user updated
        if(err) return res.status(500).send({message: 'Error: ' + err});

        if(!userUpdated) return res.status(404).send({message: 'Error: Could not update the user.'});

        return res.status(200).send({user: userUpdated});

    });
}
