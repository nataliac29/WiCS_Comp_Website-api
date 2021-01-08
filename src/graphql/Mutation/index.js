const { merge } = require('lodash')
const Auth = require('./Auth')
const Events = require('./Events')
const Admin = require('./Admin')

const resolvers = [Auth, Events, Admin]

module.exports = merge(...resolvers)
