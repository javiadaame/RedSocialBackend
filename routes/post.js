'use strict'

const express = require('express');
const PostController = require('../controllers/post');
const api = express.Router();

//Middlewares
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/posts'});
const md_auth = require('../middlewares/authenticated');

api.post('/post', md_auth.ensureAuth, PostController.savePost); // Only works if they are logged
api.post('/get-posts', md_auth.ensureAuth, PostController.getPosts); // Only works if they are logged
api.post('/get-post/:id', md_auth.ensureAuth, PostController.getPost); // Only works if they are logged
api.post('/delete-post/:id', md_auth.ensureAuth, PostController.removePost); // Only works if they are logged


module.exports = api;