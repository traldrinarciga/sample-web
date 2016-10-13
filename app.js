var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./connection');
var tokenChecker = require('./token-checker');
var session = require('express-session')
var secKey = require('./secret-key');
var app = express();

var PORT = process.env.port || 8081;

/* INIT APP SETUP */
app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(tokenChecker);
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: secKey,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

/* CLIENT ROUTERS */
var loginRouter = require('./routers/login-router');
var indexRouter = require('./routers/index-router');
var aboutRouter = require('./routers/about-router');
app.use('/index', indexRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);

/* API ROUTERS */
connection.init(function(conn){
  var userRouter = require('./routers/api-users-router')(conn);
  app.use('/api/users', userRouter);
});


app.listen(PORT, function(){
  console.log('app runs on port ' + PORT);
});
