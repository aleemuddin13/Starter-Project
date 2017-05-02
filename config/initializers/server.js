// config/initializers/server.js

var express = require('express');
var path = require('path');
// Local dependecies
var config = require('nconf');

// create the express app
// configure middlewares
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('winston');
const cors = require('cors')
var app;

var start =  function(cb) {
  'use strict';
  // Configure express
  app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({ type: 'application/*' }));
  app.use(bodyParserErrorChecker);
  app.use(cors())

  logger.info('[SERVER] Initializing routes');
  app.use(express.static(path.join(__dirname, '/../../public')));

  // Error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });

  logger.info('[SERVER] Listening on port ' + config.get('port'));

  if (cb) {
    return cb();
  }
};


function bodyParserErrorChecker(error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.status(400).json({status: false, error: "SyntaxError"})
  } else {
    next();
  }
}

module.exports = start;
