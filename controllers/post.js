'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Post = require('../models/post');
var User = require('../models/user');

exports.savePost = function(req, res){

    var post = new Post();

    var body = req.body;

    if(!body.text) return res.status(500).send({message: 'Error: Message field missing!'})

    post.text = body.text;
    post.file = 'null';
    post.created_at = moment().unix();
    post.user = req.user.sub;

    post.save((err, postSaved) => {
        if(err) return res.status(500).send({message: 'Error!' + err});

        if(!postSaved) return res.status(500).send({message: 'Error!'});

        return res.status(200).send({post: postSaved});
    });

}


exports.getPosts = function(req, res){
    
    var page = 1; // The default page is 1
    if(req.params.page){ 
        page = req.params.page; // Put the page of the request on url 
    }

    var items_per_page = 5; // The posts showed in 1 page

    Post.find().sort('_id').paginate(page, items_per_page, (err, posts, total) => {
        if(err) return res.status(500).send({message: 'Error: ' + err});

        if(!posts) return res.status(404).send({message: 'Error: There aren´t posts'});

        return res.status(200).send({
            posts, 
            total,
            pages: Math.ceil(total/items_per_page)
        });
    });
}

// Get specific post
exports.getPost = function(req, res){
    var postId = req.params.id; // Params for the data of url, body for the data of post and put

    Post.findById(postId, (err, post) => {
        if(err) return res.status(500).send({message: 'Error: ' + err});

        if(!post) return res.status(404).send({message: 'Error: The post doesn´t exist'});
       
        return res.status(200).send({post});
    });
}

// Remove post

exports.removePost = function(req, res){
    var postId = req.params.id; // Params for the data of url, body for the data of post and put

    Post.find({'user': req.user.sub, '_id': postId}).deleteOne((err, postRemoved) => {
        if(err) return res.status(500).send({message: 'Error: ' + err});

        if(!postRemoved) return res.status(404).send({message: 'Error: The post can´t be removed.'});

        return res.status(200).send({message: 'Post removed'});
    });
}