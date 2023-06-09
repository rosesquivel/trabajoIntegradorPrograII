var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const db = require('./database/models');

/* Requiero rutas */
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

/* Uso session antes de las rutas */
app.use(session({
  secret: 'fabsBeauty',
  resave: false,
  saveUninitialized: true
}));

/* Pongo los datos de session para que sea accesible en todas las vistas (creo el Middleware de la App) */
app.use(function(req, res, next){ 
  if (req.session.user != undefined){
    res.locals.user = req.session.user
    return next();
  }
  return next(); //seguí procesando app js, independientemente de que se ejecute o no el if
}); 

//Configuro las cookies
app.use(function(req, res, next){
  //Si la cookie existe en el nav del usuario y no existe en un usuario en session
  if(req.cookies.userId != undefined && req.session.user == undefined){
    let idUserCookie = req.cookies.userId; //lo definimos
    db.User.findByPk(idUserCookie)
    .then(function(user){
      req.session.user = user.dataValues; //carga el usuario en session (back end)
      res.locals.user = user.dataValues; // carga el usuario en locals (front end)
      return next();
    }).catch(function(error){
      console.log(error);
      return next();
    });
  } else{
    return next();
  }
});

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
