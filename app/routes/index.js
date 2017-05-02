'use strict'
const changeCase = require('change-case');
const express = require('express');
const routes = require('require-dir')();
const logger = require('winston');
const api = express()

Object.keys(routes).forEach(function(routeName) {
    // Initialize the route to add its functionality to router
    let route = require('./' + routeName);

    // Add router to the speficied route name in the app
    api.use('/' + changeCase.paramCase(routeName), route);
});

module.exports = api
