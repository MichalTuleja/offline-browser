const TCP_PORT = process.env.PORT || 3000;
const PUBLIC_DIR = process.env.FRONTEND_DIR || 'public';

const express = require("express");
const bodyParser  = require("body-parser");
const cookieParser = require('cookie-parser');
// const helmet = require('helmet');

// const AuthMiddleware = require('./api/middleware/Authentication');
const Router = require('./api/routing');

const API_VERSION = 'v1';

var app = express();

// Express configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(PUBLIC_DIR));
app.use(cookieParser());
// app.use(helmet());
//app.use(databaseMiddleware);

//Auth middleware
//app.use(AuthMiddleware);

// Routing
app.use('/api/' + API_VERSION, Router);


// Start application
var server = app.listen(TCP_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

