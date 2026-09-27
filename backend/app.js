var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./utils/db');
connectDB();

// Import your routes
var indexRouter = require('./routes/index');

var app = express();

// ============ Security Middleware ============
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ============ View Engine Setup ============
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ============ Middleware Setup ============
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static file serving: React frontend dist, public folder assets, and bootstrap
app.use(express.static(path.join(__dirname, 'public', 'react')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap/css', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js')));

// ============ Routes ============
app.use('/', indexRouter);

// ============ Error Handling ============
// 404 Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { layout: false });
});

module.exports = app;