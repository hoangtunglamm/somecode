var express = require('express');
var session = require('express-session');
require('express-group-routes');
var app = express();
var body_parser = require('body-parser');

require('./apps/kernal')(express, app, body_parser, session);

//app.use('/', require('./routes/web'));
require('./routes/web')(app);


module.exports = app;