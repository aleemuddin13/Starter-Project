'use strict';

const server = require('./config/initializers/server');
const nconf = require('nconf');
const async = require('async');
const logger = require('winston')


// Load Environment variables from .env file
require('dotenv').load();

// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();
// Load common environment variables
require('./config/environments/common');
// Load config file for the environment
require('./config/environments/' + nconf.get('NODE_ENV'));

//setup wintson logger
require('./config/initializers/logger')

logger.info('[APP] Starting server initialization');

// Initialize Modules
async.series([
  function initializeDBConnection(callback) {
    require('./config/initializers/database')(callback);
  },
  function startServer(callback) {
    server(callback);
  }], function(err) {
    if (err) {
      logger.error('[APP] initialization failed', err);
    } else {
      logger.info('[APP] initialized SUCCESSFULLY');
    }
  }
);
