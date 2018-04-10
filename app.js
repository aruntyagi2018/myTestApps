var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);


var index = require('./routes/index');
var testroutes = require('./routes/testroutes');
var users = require('./routes/users');
var api = require('./routes/api');
var products = require('./routes/product');
var mtunes = require('./routes/mtunes');

var app = express();

// view engine setup
var exphbs = require('express-handlebars');
app.engine('hbs', exphbs({defaultLayout: 'default',extname: '.hbs'})); 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'ssshhh'}));
app.use(express.static(path.join(__dirname, 'public')));
/*
var sessionOptions = {
  secret: "secret",
  resave : true,
  saveUninitialized : false,
  cookie:{maxAge:6000},
  store: new MongoStore({
    url:"mongodb://localhost/testdb",
    maxAge: 365 * 60 * 60 * 1000
    //other advanced options
  })
};

app.use(session(sessionOptions));
*/
// function checkAuth (req, res, next) {
// 	console.log('checkAuth ' + req.url);

// 	// don't serve /secure to those not logged in
// 	// you should add to this list, for each and every secure url
// 	if (req.url != '/api/users/login' && (!req.session || !req.session.authenticated)) {
//     console.log('secure url' + req.url);
// 		res.redirect('/api/users/login');
// 		return;
// 	}

// 	next();
// }
//app.use(checkAuth);
app.use('/', index);
app.use('/testroutes',testroutes);
app.use('/users', users);
app.use('/api',api);
app.use('/products',products);
app.use('/mtunes',mtunes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
 // next(err);
 res.render('error',{errSource:err});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
