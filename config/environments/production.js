'use strict'
const nconf = require('nconf');

nconf.set('debug', false)
nconf.set('database:url',"mongodb://localhost:27017/telegrambot")
nconf.set('port', 8000)
