'use strict'
const nconf = require('nconf');

nconf.set('debug', true)
nconf.set('database:url',"mongodb://localhost:27017/telegrambot_dev")
nconf.set('port', 5000)
