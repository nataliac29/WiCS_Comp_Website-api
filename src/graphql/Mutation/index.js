const { merge } = require('lodash')
const Auth = require('./Auth')
const Events = require('./Events')

const resolvers = [Auth, Events]

module.exports = merge(...resolvers)
