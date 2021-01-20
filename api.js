'use strict'

var mongoose = require('mongoose');
var app = require('./api/app');

const { db_ip, db_port, db_name, project_name, web_port, web_ip} = require('./config.json');


// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db_ip}:${db_port}/${db_name}`, { useNewUrlParser: true, useUnifiedTopology: true},)
    .then(() => {
        console.log(`[${project_name}] The connection of ${db_name} is succesfull.`)
   
        // Create server
        app.listen(web_port, () => {
            console.log(`[${project_name}] Web server running in http://${web_ip}:${web_port}`)
        });
    })  
    .catch(err => console.log("[ERROR] " + err))