'use strict';
const mongoose = require('mongoose');
const nconf = require('nconf')
const logger = require('winston');

module.exports = function(cb) {
  mongoose.connect(nconf.get('database:url'),function(error){
		if(error){
			logger.error(error)
		}else{
			logger.info("Database is succesfully connected to: "+nconf.get('database:url'))
		}
		return  cb(error);
	})
	//Set mongoose to debug, if app is in development mode
	mongoose.set('debug',nconf.get('debug'))

};
