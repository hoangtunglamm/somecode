var express = require("express");
var session = require("express-session");
var app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use();


var server = app.listen(port, host, function(){
	console.log("Server is running port ", port);	
});









