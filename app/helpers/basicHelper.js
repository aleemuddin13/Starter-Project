const jsonwebtoken = require('jsonwebtoken')
const emailValidator = require('email-validator')
const config = require('nconf').get()
const mongoose = require('mongoose')

module.exports = {
	createToken : createToken,
	createAdminPanelToken: createAdminPanelToken,
	getObjectIdWithAddHours : getObjectIdWithAddHours,

	verifyToken : (token) => {
		return jsonwebtoken.verify(token,config.secretKey)
	},

	verifyAdminPanelToken: (token) =>{
		return jsonwebtoken.verify(token,config.adminPanel.secretKey)
	},

	validateEmail : emailValidator.validate,


	generateBadRequestResponse : (response,options) => {
		if(!options){
			options = {}
		}
		options.status = false
		response.status(404).json(options)
	},

	generateUnauthorizedResponse : (response,options) => {
		if(!options){
			options = {}
		}
		options.status = false
		response.status(config.status.unauthorized).json(options)
	},

	generateServerErrorResponse : (response,options) => {
		if(!options){
			options = {}
		}
		options.status = false
		response.status(config.status.serverError).json(options)
	},

 	objectIdWithDelayHours : (hours) => {

		let timestamp = new Date()
		timestamp.setHours(timestamp.getHours() - hours)

	    // Convert date object to hex seconds since Unix epoch
	    var hexSeconds = Math.floor(timestamp/1000).toString(16);

	    // Create an ObjectId with that hex timestamp
	    var constructedObjectId = mongoose.Types.ObjectId(hexSeconds + "0000000000000000");

    	return constructedObjectId
	},

	getObjectIdWithTimestamp : (unixTime) => {
		unixTime = parseInt(unixTime/1000)
		return mongoose.Types.ObjectId(unixTime.toString(16) + "0000000000000000");
	},

	getRandomInt: (low, high) => {
	    return Math.floor(Math.random() * (high - low) + low);
	}
}

function createToken(data,options){
	if(!options){
		options = {}
	}

	let token = jsonwebtoken.sign(data,config.secretKey,options);
	return token;
}

function createAdminPanelToken(data,options){
	if(!options){
		options = {}
	}

	let token = jsonwebtoken.sign(data,config.adminPanel.secretKey,options);
	return token;
}

function getObjectIdWithAddHours(objectId,hours) {

	let timestamp = new Date()
	timestamp.setHours(timestamp.getHours() + hours)

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp/1000).toString(16);

    return hexSeconds + objectId.toString().substring(8);
}
