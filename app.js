var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
require('dotenv').config();
require('./services/db-connection');
var { getInfo } = require('./services/constructor');
var HOME_URL = process.env.HOME_URL;

var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/error', message: err.message, status: err.status });
  } else {
    res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/error', message: err.message, status: err.status });
  }
});

module.exports = app;
