'use strict'

const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();

//Middlewares
const md_auth = require('../middlewares/authenticated');

api.get('/home', md_auth.ensureAuth, UserController.home); // Only works if they are logged
api.post('/register', UserController.registerUser);
api.get('/login', UserController.loginUser);
api.get('/getuser/:id', md_auth.ensureAuth, UserController.getUser); // :id is to get the param
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers); //The page is optional, if there arent nothing in the url put the default page (1)
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser); //Put is for update

module.exports = api;