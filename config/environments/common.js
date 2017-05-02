'use strict'

const nconf = require('nconf')

let status = {
	"badRequest" : 400,
	"unauthorized" : 401,
	"notFound" : 404,
	"serverError" : 500
}

let limits = {
}

nconf.set('status', status)

nconf.set('limits',limits)
