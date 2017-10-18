"use strict";

function AuthMiddleware(req, res, next) {
  console.log('Time:', Date.now());
  console.log(req.headers);
  console.log(tokens);
  
  if(req.path === '/api/login' && req.method === 'POST') {
    console.log('Login attempt');
    next();
  }
  else {
    var authToken = req.headers.authorization;
  
    if(typeof authToken === 'string') {
//    console.log(typeof authToken);
//    console.log(typeof tokens[authToken]);
      if(typeof tokens[authToken] !== 'undefined') {
        next();
      }
      else {
        res.status(401).send('Unauthorized, invalid token');
      }
    }
    else {
      res.status(401).send('Unauthorized, no token provided');
    }
  }
}

module.exports = AuthMiddleware;