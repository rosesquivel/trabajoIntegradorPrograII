var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Requiero session ANTES DE LAS RUTAS
var session = require('express-session');

//Requiero rutas
var indexRouter = require('./routes/index');
let productsRouter = require('./routes/products');
let profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Uso session 
app.use(session({
  secret:   'fabsBeauty',
  resave: false,
  saveUninitialized: true
}))


//Paso datos de session a las vistas (creo Middleware de la App)
app.use(function(req, res, next){ 
  if (req.session.user != undefined){
    res.locals.user = req.session.user
    return next();
  }
    return next(); //seguí procesando app js, independientemente de que se ejecute o no el if, 
})


//Uso rutas
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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