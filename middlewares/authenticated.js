'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "norobesclavessecretaspls";

exports.ensureAuth = function(req, res, next){ //Req = data received, Res = the answer, 
                                               // Next = Funcionality to jump to another thing
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Error: The petition doesnt have the authorization header'});
    }
    const token = req.headers.authorization.replace(/['"]+/g, ''); //Eliminates the " and '

    try{
        var payload = jwt.decode(token, secret)
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'Error: The token has expired.'})
        }
    }catch(ex){ // Ex = exception
        return res.status(404).send({message: 'Error: The token is invalid.'})
    }

    req.user = payload;

    next();
}